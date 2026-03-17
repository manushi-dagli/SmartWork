import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as ctrl from "../controllers/query.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/queries/:id",
  requireAbility("read", "Assignment"),
  asyncHandler(ctrl.getOne)
);
router.post(
  "/queries",
  requireAbility("create", "Assignment"),
  asyncHandler(ctrl.create)
);
router.patch(
  "/queries/:id",
  requireAbility("update", "Assignment"),
  asyncHandler(ctrl.update)
);
router.delete(
  "/queries/:id",
  requireAbility("delete", "Assignment"),
  asyncHandler(ctrl.deleteOne)
);

export const queryRoutes = router;
