CREATE TYPE "public"."assignment_status" AS ENUM('IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assignments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "client_id" uuid NOT NULL,
  "task_id" uuid NOT NULL,
  "financial_year" text,
  "start_date" timestamp with time zone,
  "due_date" timestamp with time zone,
  "manager_id" uuid,
  "estimated_fees" text,
  "task_request_id" uuid,
  "status" "assignment_status" DEFAULT 'IN_PROGRESS',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_client_id_clients_id_fk"
  FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_task_id_tasks_id_fk"
  FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_manager_id_employees_id_fk"
  FOREIGN KEY ("manager_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_task_request_id_task_requests_id_fk"
  FOREIGN KEY ("task_request_id") REFERENCES "public"."task_requests"("id") ON DELETE set null ON UPDATE no action;
