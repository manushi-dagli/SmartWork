CREATE TYPE "public"."invoice_status" AS ENUM('PAID', 'UNPAID');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "client_id" uuid NOT NULL,
  "assignment_id" uuid NOT NULL,
  "invoice_date" timestamp with time zone DEFAULT now(),
  "amount" text,
  "gst" text,
  "total_amount" text,
  "status" "invoice_status" DEFAULT 'UNPAID',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_id_clients_id_fk"
  FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_assignment_id_assignments_id_fk"
  FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE restrict ON UPDATE no action;
