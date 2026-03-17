CREATE TYPE "public"."milestone_status" AS ENUM('PENDING', 'COMPLETED');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "milestones" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "assignment_id" uuid NOT NULL,
  "name" text NOT NULL,
  "responsible_employee_id" uuid,
  "due_date" timestamp with time zone,
  "status" "milestone_status" DEFAULT 'PENDING',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_assignment_id_assignments_id_fk"
  FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_responsible_employee_id_employees_id_fk"
  FOREIGN KEY ("responsible_employee_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
