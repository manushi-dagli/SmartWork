ALTER TABLE "task_requests" ADD COLUMN "firm_id" uuid;
--> statement-breakpoint
ALTER TABLE "task_requests" ADD CONSTRAINT "task_requests_firm_id_firms_id_fk"
  FOREIGN KEY ("firm_id") REFERENCES "public"."firms"("id") ON DELETE set null ON UPDATE no action;
