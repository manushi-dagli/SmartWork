-- Drop FKs that reference inquiry_types (so we can rename it to tasks)
ALTER TABLE "inquiries" DROP CONSTRAINT IF EXISTS "inquiries_assignment_type_id_inquiry_types_id_fk";
ALTER TABLE "inquiries" DROP CONSTRAINT IF EXISTS "inquiries_assignment_type_id_assignment_types_id_fk";
ALTER TABLE "document_master" DROP CONSTRAINT IF EXISTS "document_master_assignment_type_id_inquiry_types_id_fk";
ALTER TABLE "document_master" DROP CONSTRAINT IF EXISTS "document_master_assignment_type_id_assignment_types_id_fk";
ALTER TABLE "assignment_term_templates" DROP CONSTRAINT IF EXISTS "assignment_term_templates_assignment_type_id_inquiry_types_id_fk";
ALTER TABLE "assignment_term_templates" DROP CONSTRAINT IF EXISTS "assignment_term_templates_assignment_type_id_assignment_types_id_fk";
ALTER TABLE "payment_term_templates" DROP CONSTRAINT IF EXISTS "payment_term_templates_assignment_type_id_inquiry_types_id_fk";
ALTER TABLE "payment_term_templates" DROP CONSTRAINT IF EXISTS "payment_term_templates_assignment_type_id_assignment_types_id_fk";

-- Rename inquiry_types to tasks
ALTER TABLE "inquiry_types" RENAME TO "tasks";

-- Create subtasks table
CREATE TABLE IF NOT EXISTS "subtasks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "task_id" uuid NOT NULL REFERENCES "tasks"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "description" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Re-add FKs to tasks for tables that had assignment_type_id
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assignment_type_id_tasks_id_fk"
  FOREIGN KEY ("assignment_type_id") REFERENCES "tasks"("id") ON DELETE RESTRICT;
ALTER TABLE "document_master" ADD CONSTRAINT "document_master_assignment_type_id_tasks_id_fk"
  FOREIGN KEY ("assignment_type_id") REFERENCES "tasks"("id") ON DELETE SET NULL;
ALTER TABLE "assignment_term_templates" ADD CONSTRAINT "assignment_term_templates_assignment_type_id_tasks_id_fk"
  FOREIGN KEY ("assignment_type_id") REFERENCES "tasks"("id") ON DELETE SET NULL;
ALTER TABLE "payment_term_templates" ADD CONSTRAINT "payment_term_templates_assignment_type_id_tasks_id_fk"
  FOREIGN KEY ("assignment_type_id") REFERENCES "tasks"("id") ON DELETE SET NULL;

-- Rename inquiries table and column (drop FK we just added, then rename)
ALTER TABLE "inquiries" DROP CONSTRAINT IF EXISTS "inquiries_assignment_type_id_tasks_id_fk";
ALTER TABLE "inquiries" DROP CONSTRAINT IF EXISTS "inquiries_assignment_type_id_inquiry_types_id_fk";
ALTER TABLE "inquiries" RENAME TO "task_requests";
ALTER TABLE "task_requests" RENAME COLUMN "assignment_type_id" TO "task_id";
ALTER TABLE "task_requests" ADD CONSTRAINT "task_requests_task_id_tasks_id_fk"
  FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT;

-- Rename inquiry_status enum
ALTER TYPE "inquiry_status" RENAME TO "task_request_status";

-- Rename inquiry_documents to task_request_documents
ALTER TABLE "inquiry_documents" RENAME TO "task_request_documents";
ALTER TABLE "task_request_documents" RENAME COLUMN "inquiry_id" TO "task_request_id";
ALTER TABLE "task_request_documents" DROP CONSTRAINT IF EXISTS "inquiry_documents_inquiry_id_inquiries_id_fk";
ALTER TABLE "task_request_documents" DROP CONSTRAINT IF EXISTS "inquiry_documents_inquiry_id_task_requests_id_fk";
ALTER TABLE "task_request_documents" ADD CONSTRAINT "task_request_documents_task_request_id_fk"
  FOREIGN KEY ("task_request_id") REFERENCES "task_requests"("id") ON DELETE CASCADE;

-- document_master: rename column assignment_type_id to task_id, add subtask_id
ALTER TABLE "document_master" DROP CONSTRAINT IF EXISTS "document_master_assignment_type_id_tasks_id_fk";
ALTER TABLE "document_master" RENAME COLUMN "assignment_type_id" TO "task_id";
ALTER TABLE "document_master" ADD CONSTRAINT "document_master_task_id_tasks_id_fk"
  FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL;
ALTER TABLE "document_master" ADD COLUMN IF NOT EXISTS "subtask_id" uuid REFERENCES "subtasks"("id") ON DELETE SET NULL;

-- assignment_term_templates, payment_term_templates: rename column to task_id
ALTER TABLE "assignment_term_templates" DROP CONSTRAINT IF EXISTS "assignment_term_templates_assignment_type_id_tasks_id_fk";
ALTER TABLE "assignment_term_templates" RENAME COLUMN "assignment_type_id" TO "task_id";
ALTER TABLE "assignment_term_templates" ADD CONSTRAINT "assignment_term_templates_task_id_tasks_id_fk"
  FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL;

ALTER TABLE "payment_term_templates" DROP CONSTRAINT IF EXISTS "payment_term_templates_assignment_type_id_tasks_id_fk";
ALTER TABLE "payment_term_templates" RENAME COLUMN "assignment_type_id" TO "task_id";
ALTER TABLE "payment_term_templates" ADD CONSTRAINT "payment_term_templates_task_id_tasks_id_fk"
  FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL;

-- task_requests: update enum type name for status column (type is already renamed)
-- No need - column type references the enum by name, so task_request_status is now the type

-- Clients: add task/subtask and due dates
ALTER TABLE "clients" ADD COLUMN IF NOT EXISTS "task_id" uuid REFERENCES "tasks"("id") ON DELETE SET NULL;
ALTER TABLE "clients" ADD COLUMN IF NOT EXISTS "subtask_id" uuid REFERENCES "subtasks"("id") ON DELETE SET NULL;
ALTER TABLE "clients" ADD COLUMN IF NOT EXISTS "task_due_date" timestamp with time zone;
ALTER TABLE "clients" ADD COLUMN IF NOT EXISTS "subtask_due_date" timestamp with time zone;

-- Client selected subtasks (when linked to task)
CREATE TABLE IF NOT EXISTS "client_subtask_selection" (
  "client_id" uuid NOT NULL REFERENCES "clients"("id") ON DELETE CASCADE,
  "subtask_id" uuid NOT NULL REFERENCES "subtasks"("id") ON DELETE CASCADE,
  "due_date" timestamp with time zone,
  PRIMARY KEY ("client_id", "subtask_id")
);
