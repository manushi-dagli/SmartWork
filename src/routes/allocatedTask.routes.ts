import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as allocatedTaskController from "../controllers/allocatedTask.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/allocated-tasks/:id",
  requireAbility("read", "Assignment"),
  asyncHandler(allocatedTaskController.getAllocatedTask)
);
router.post(
  "/allocated-tasks",
  requireAbility("create", "Assignment"),
  asyncHandler(allocatedTaskController.createAllocatedTask)
);
router.patch(
  "/allocated-tasks/:id",
  requireAbility("update", "Assignment"),
  asyncHandler(allocatedTaskController.updateAllocatedTask)
);
router.delete(
  "/allocated-tasks/:id",
  requireAbility("delete", "Assignment"),
  asyncHandler(allocatedTaskController.deleteAllocatedTask)
);

export const allocatedTaskRoutes = router;
