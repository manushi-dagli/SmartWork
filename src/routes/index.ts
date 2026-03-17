import { Router } from "express";
import { superAdminRoutes } from "./superAdmin.routes.js";
import { taskConfigRoutes } from "./taskConfig.routes.js";
import { taskRequestRoutes } from "./taskRequest.routes.js";
import { firmRoutes } from "./firm.routes.js";
import { roleRoutes } from "./role.routes.js";
import { familyRoutes } from "./family.routes.js";
import { clientRoutes } from "./client.routes.js";
import { employeeRoutes } from "./employee.routes.js";
import { profileRoutes } from "./profile.routes.js";
import { assignmentRoutes } from "./assignment.routes.js";
import { allocatedTaskRoutes } from "./allocatedTask.routes.js";
import { milestoneRoutes } from "./milestone.routes.js";
import { assignmentDocumentRoutes } from "./assignmentDocument.routes.js";
import { queryRoutes } from "./query.routes.js";
import { invoiceRoutes } from "./invoice.routes.js";
import { paymentRoutes } from "./payment.routes.js";
import { dashboardRoutes } from "./dashboard.routes.js";
import { analyticsRoutes } from "./analytics.routes.js";

const apiRouter = Router();

// Profile and dashboard first so they are never matched by other routes. No requireAbility — all authenticated users can access.
apiRouter.use(profileRoutes);
apiRouter.use(dashboardRoutes);
apiRouter.use(analyticsRoutes);
apiRouter.use(superAdminRoutes);
apiRouter.use(taskConfigRoutes);
apiRouter.use(taskRequestRoutes);
apiRouter.use(assignmentRoutes);
apiRouter.use(allocatedTaskRoutes);
apiRouter.use(milestoneRoutes);
apiRouter.use(assignmentDocumentRoutes);
apiRouter.use(queryRoutes);
apiRouter.use(paymentRoutes);
apiRouter.use(invoiceRoutes);
apiRouter.use(firmRoutes);
apiRouter.use(roleRoutes);
apiRouter.use(familyRoutes);
apiRouter.use(clientRoutes);
apiRouter.use(employeeRoutes);

export { apiRouter };
