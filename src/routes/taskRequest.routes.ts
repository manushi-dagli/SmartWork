import { Router } from "express";
import { requireEmployeeAuth, requireAbility, requireCanCreateTaskRequest } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as ctrl from "../controllers/taskRequest.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

// Staff read-only config (must be before /:id to avoid matching "task-types" as id)
router.get(
  "/task-requests/task-types",
  requireAbility("read", "Client"),
  asyncHandler(ctrl.listTasksForStaff)
);
router.get(
  "/task-requests/subtasks-with-task",
  requireAbility("read", "Client"),
  asyncHandler(ctrl.listSubtasksWithTaskForStaff)
);
router.get(
  "/task-requests/documents",
  requireAbility("read", "Client"),
  asyncHandler(ctrl.listDocumentsForStaff)
);

// Task request CRUD and actions
router.get("/task-requests", requireAbility("read", "Client"), asyncHandler(ctrl.listTaskRequests));
router.post("/task-requests", requireCanCreateTaskRequest, asyncHandler(ctrl.createTaskRequest));
router.get("/task-requests/:id", requireAbility("read", "Client"), asyncHandler(ctrl.getTaskRequest));
router.patch("/task-requests/:id", requireAbility("update", "Client"), asyncHandler(ctrl.updateTaskRequest));
router.post(
  "/task-requests/:id/documents",
  requireAbility("update", "Client"),
  asyncHandler(ctrl.setTaskRequestDocuments)
);
router.get(
  "/task-requests/:id/documents",
  requireAbility("read", "Client"),
  asyncHandler(ctrl.getTaskRequestDocuments)
);
router.post("/task-requests/:id/attachments", requireAbility("update", "Client"), asyncHandler(ctrl.uploadTaskRequestAttachment));
router.get("/task-requests/:id/attachments/:attId/file", requireAbility("read", "Client"), asyncHandler(ctrl.getTaskRequestAttachmentFile));
router.delete("/task-requests/:id/attachments/:attId", requireAbility("update", "Client"), asyncHandler(ctrl.deleteTaskRequestAttachment));
router.post("/task-requests/:id/send", requireAbility("update", "Client"), asyncHandler(ctrl.markTaskRequestSent));
router.post("/task-requests/:id/accept", requireAbility("create", "Client"), asyncHandler(ctrl.acceptTaskRequest));
router.post("/task-requests/:id/reject", requireAbility("update", "Client"), asyncHandler(ctrl.rejectTaskRequest));

export const taskRequestRoutes = router;
