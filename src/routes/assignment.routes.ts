import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as assignmentController from "../controllers/assignment.controller.js";
import * as allocatedTaskController from "../controllers/allocatedTask.controller.js";
import * as milestoneController from "../controllers/milestone.controller.js";
import * as assignmentDocumentController from "../controllers/assignmentDocument.controller.js";
import * as queryController from "../controllers/query.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/assignments",
  requireAbility("read", "Assignment"),
  asyncHandler(assignmentController.listAssignments)
);
router.get(
  "/assignments/:assignmentId/tasks",
  requireAbility("read", "Assignment"),
  asyncHandler(allocatedTaskController.listByAssignment)
);
router.get(
  "/assignments/:assignmentId/milestones",
  requireAbility("read", "Assignment"),
  asyncHandler(milestoneController.listByAssignment)
);
router.get(
  "/assignments/:assignmentId/documents",
  requireAbility("read", "Assignment"),
  asyncHandler(assignmentDocumentController.listByAssignment)
);
router.get(
  "/assignments/:assignmentId/queries",
  requireAbility("read", "Assignment"),
  asyncHandler(queryController.listByAssignment)
);
router.get(
  "/assignments/:id",
  requireAbility("read", "Assignment"),
  asyncHandler(assignmentController.getAssignment)
);
router.post(
  "/assignments",
  requireAbility("create", "Assignment"),
  asyncHandler(assignmentController.createAssignment)
);
router.patch(
  "/assignments/:id",
  requireAbility("update", "Assignment"),
  asyncHandler(assignmentController.updateAssignment)
);
router.delete(
  "/assignments/:id",
  requireAbility("delete", "Assignment"),
  asyncHandler(assignmentController.deleteAssignment)
);

export const assignmentRoutes = router;
