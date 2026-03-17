CREATE TYPE "public"."review_status" AS ENUM('APPROVED', 'REWORK');--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD COLUMN IF NOT EXISTS "review_status" "review_status";--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD COLUMN IF NOT EXISTS "checked_by_id" uuid REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD COLUMN IF NOT EXISTS "checked_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "allocated_tasks" ADD COLUMN IF NOT EXISTS "remarks" text;
