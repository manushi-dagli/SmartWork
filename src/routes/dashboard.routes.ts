import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as ctrl from "../controllers/dashboard.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/dashboard",
  requireAbility("read", "Report"),
  asyncHandler(ctrl.getDashboard)
);

export const dashboardRoutes = router;
