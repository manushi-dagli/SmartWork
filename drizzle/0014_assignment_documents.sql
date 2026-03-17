CREATE TABLE IF NOT EXISTS "assignment_documents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "assignment_id" uuid NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "tag" text,
  "version" text DEFAULT '1',
  "file_key" text,
  "uploaded_by_id" uuid,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "assignment_documents" ADD CONSTRAINT "assignment_documents_assignment_id_assignments_id_fk"
  FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment_documents" ADD CONSTRAINT "assignment_documents_uploaded_by_id_employees_id_fk"
  FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
