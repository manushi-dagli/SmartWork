import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as analyticsController from "../controllers/analytics.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/analytics/summary",
  requireAbility("read", "Report"),
  asyncHandler(analyticsController.getSummary)
);

export const analyticsRoutes = router;
