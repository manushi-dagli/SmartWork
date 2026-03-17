CREATE TABLE IF NOT EXISTS "task_request_attachments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "task_request_id" uuid NOT NULL,
  "file_name" text NOT NULL,
  "mime_type" text NOT NULL,
  "content" bytea NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task_request_attachments" ADD CONSTRAINT "task_request_attachments_task_request_id_task_requests_id_fk"
  FOREIGN KEY ("task_request_id") REFERENCES "public"."task_requests"("id") ON DELETE cascade ON UPDATE no action;
