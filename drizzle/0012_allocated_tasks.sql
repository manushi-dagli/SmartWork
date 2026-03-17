CREATE TYPE "public"."allocated_task_priority" AS ENUM('HIGH', 'MEDIUM', 'LOW');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allocated_tasks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "assignment_id" uuid NOT NULL,
  "description" text,
  "assigned_to_id" uuid,
  "assigned_by_id" uuid,
  "start_date" timestamp with time zone,
  "due_date" timestamp with time zone,
  "priority" "allocated_task_priority" DEFAULT 'MEDIUM',
  "checking_required" boolean DEFAULT false,
  "checker_id" uuid,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD CONSTRAINT "allocated_tasks_assignment_id_assignments_id_fk"
  FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD CONSTRAINT "allocated_tasks_assigned_to_id_employees_id_fk"
  FOREIGN KEY ("assigned_to_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD CONSTRAINT "allocated_tasks_assigned_by_id_employees_id_fk"
  FOREIGN KEY ("assigned_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD CONSTRAINT "allocated_tasks_checker_id_employees_id_fk"
  FOREIGN KEY ("checker_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
