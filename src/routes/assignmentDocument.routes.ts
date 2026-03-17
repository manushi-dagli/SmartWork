import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as ctrl from "../controllers/assignmentDocument.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/assignment-documents/:id",
  requireAbility("read", "Assignment"),
  asyncHandler(ctrl.getOne)
);
router.post(
  "/assignment-documents",
  requireAbility("create", "Assignment"),
  asyncHandler(ctrl.create)
);
router.patch(
  "/assignment-documents/:id",
  requireAbility("update", "Assignment"),
  asyncHandler(ctrl.update)
);
router.delete(
  "/assignment-documents/:id",
  requireAbility("delete", "Assignment"),
  asyncHandler(ctrl.deleteOne)
);

export const assignmentDocumentRoutes = router;
