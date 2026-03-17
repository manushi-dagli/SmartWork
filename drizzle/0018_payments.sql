CREATE TYPE "public"."payment_mode" AS ENUM('CASH', 'BANK', 'UPI');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "invoice_id" uuid NOT NULL,
  "payment_date" timestamp with time zone DEFAULT now(),
  "amount_received" text,
  "mode" "payment_mode",
  "bank_name" text,
  "remarks" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk"
  FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;
