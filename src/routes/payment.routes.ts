import { Router } from "express";
import { requireEmployeeAuth, requireAbility } from "../middleware/employeeAuth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as ctrl from "../controllers/payment.controller.js";

const router = Router();

router.use(requireEmployeeAuth);

router.get(
  "/invoices/:invoiceId/payments",
  requireAbility("read", "Report"),
  asyncHandler(ctrl.listByInvoice)
);
router.get("/payments/:id", requireAbility("read", "Report"), asyncHandler(ctrl.getOne));
router.post("/payments", requireAbility("read", "Report"), asyncHandler(ctrl.create));
router.patch("/payments/:id", requireAbility("read", "Report"), asyncHandler(ctrl.update));

export const paymentRoutes = router;
