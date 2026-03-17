-- Remove task_id and subtask_id from document_master (no longer "document per task")

ALTER TABLE "document_master" DROP CONSTRAINT IF EXISTS "document_master_task_id_tasks_id_fk";
ALTER TABLE "document_master" DROP CONSTRAINT IF EXISTS "document_master_subtask_id_subtasks_id_fk";
ALTER TABLE "document_master" DROP COLUMN IF EXISTS "task_id";
ALTER TABLE "document_master" DROP COLUMN IF EXISTS "subtask_id";
