CREATE TYPE "public"."query_status" AS ENUM('OPEN', 'RESOLVED');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "queries" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "assignment_id" uuid NOT NULL,
  "raised_by_id" uuid,
  "query_description" text,
  "assigned_to_id" uuid,
  "status" "query_status" DEFAULT 'OPEN',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "queries" ADD CONSTRAINT "queries_assignment_id_assignments_id_fk"
  FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queries" ADD CONSTRAINT "queries_raised_by_id_employees_id_fk"
  FOREIGN KEY ("raised_by_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queries" ADD CONSTRAINT "queries_assigned_to_id_employees_id_fk"
  FOREIGN KEY ("assigned_to_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
