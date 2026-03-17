-- Add subtask_id and terms/cost to task_requests; add terms/cost to clients; drop template FKs from task_requests

-- task_requests: drop template FKs and columns
ALTER TABLE "task_requests" DROP CONSTRAINT IF EXISTS "task_requests_assignment_term_template_id_assignment_term_templates_id_fk";
ALTER TABLE "task_requests" DROP CONSTRAINT IF EXISTS "task_requests_payment_term_template_id_payment_term_templates_id_fk";
ALTER TABLE "task_requests" DROP COLUMN IF EXISTS "assignment_term_template_id";
ALTER TABLE "task_requests" DROP COLUMN IF EXISTS "payment_term_template_id";

-- task_requests: drop snapshot columns (replaced by text fields)
ALTER TABLE "task_requests" DROP COLUMN IF EXISTS "assignment_terms_snapshot";
ALTER TABLE "task_requests" DROP COLUMN IF EXISTS "payment_terms_snapshot";

-- task_requests: add subtask_id and new text columns
ALTER TABLE "task_requests" ADD COLUMN IF NOT EXISTS "subtask_id" uuid REFERENCES "subtasks"("id") ON DELETE SET NULL;
ALTER TABLE "task_requests" ADD COLUMN IF NOT EXISTS "assignment_terms" text;
ALTER TABLE "task_requests" ADD COLUMN IF NOT EXISTS "payment_terms" text;
ALTER TABLE "task_requests" ADD COLUMN IF NOT EXISTS "payment_cost" text;

-- clients: add terms and cost columns
ALTER TABLE "clients" ADD COLUMN IF NOT EXISTS "assignment_terms" text;
ALTER TABLE "clients" ADD COLUMN IF NOT EXISTS "payment_terms" text;
ALTER TABLE "clients" ADD COLUMN IF NOT EXISTS "payment_cost" text;
