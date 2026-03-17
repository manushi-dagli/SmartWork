import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as milestoneController from "../controllers/milestone.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/milestones/:id",
  requireAbility("read", "Assignment"),
  asyncHandler(milestoneController.getMilestone)
);
router.post(
  "/milestones",
  requireAbility("create", "Assignment"),
  asyncHandler(milestoneController.createMilestone)
);
router.patch(
  "/milestones/:id",
  requireAbility("update", "Assignment"),
  asyncHandler(milestoneController.updateMilestone)
);
router.delete(
  "/milestones/:id",
  requireAbility("delete", "Assignment"),
  asyncHandler(milestoneController.deleteMilestone)
);

export const milestoneRoutes = router;
