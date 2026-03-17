import type { Response } from "express";
import type { EmployeeAuthRequest } from "../middleware/employeeAuth.js";
import * as analyticsRepo from "../repositories/analytics.repository.js";
import { sendSuccess } from "../common/response.js";

export async function getSummary(req: EmployeeAuthRequest, res: Response): Promise<void> {
  const summary = await analyticsRepo.getAnalyticsSummary();
  sendSuccess(res, summary);
}
