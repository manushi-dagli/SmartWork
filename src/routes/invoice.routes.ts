import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as ctrl from "../controllers/invoice.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get("/invoices", requireAbility("read", "Report"), asyncHandler(ctrl.list));
router.get("/invoices/:id", requireAbility("read", "Report"), asyncHandler(ctrl.getOne));
router.post("/invoices", requireAbility("read", "Report"), asyncHandler(ctrl.create));
router.patch("/invoices/:id", requireAbility("read", "Report"), asyncHandler(ctrl.update));

export const invoiceRoutes = router;
