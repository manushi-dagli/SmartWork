import { Router } from "express";
import { requireEmployeeAuth, requireSuperAdminOrAdmin } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as ctrl from "../controllers/taskConfig.controller.js";

const router = Router();

router.use(requireEmployeeAuth, requireSuperAdminOrAdmin);

// Subtasks
router.get("/task-config/subtasks", asyncHandler(ctrl.listSubtasks));
router.get("/task-config/subtasks/:id", asyncHandler(ctrl.getSubtask));
router.post("/task-config/subtasks", asyncHandler(ctrl.createSubtask));
router.patch("/task-config/subtasks/:id", asyncHandler(ctrl.updateSubtask));
router.delete("/task-config/subtasks/:id", asyncHandler(ctrl.deleteSubtask));

// Tasks
router.get("/task-config/tasks", asyncHandler(ctrl.listTasks));
router.get("/task-config/tasks/:id", asyncHandler(ctrl.getTask));
router.post("/task-config/tasks", asyncHandler(ctrl.createTask));
router.patch("/task-config/tasks/:id", asyncHandler(ctrl.updateTask));
router.delete("/task-config/tasks/:id", asyncHandler(ctrl.deleteTask));

// Document master
router.get("/task-config/documents", asyncHandler(ctrl.listDocuments));
router.get("/task-config/documents/:id", asyncHandler(ctrl.getDocument));
router.post("/task-config/documents", asyncHandler(ctrl.createDocument));
router.patch("/task-config/documents/:id", asyncHandler(ctrl.updateDocument));
router.delete("/task-config/documents/:id", asyncHandler(ctrl.deleteDocument));

export const taskConfigRoutes = router;
