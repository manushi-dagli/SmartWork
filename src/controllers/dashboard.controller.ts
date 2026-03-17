import type { Response } from "express";
import type { EmployeeAuthRequest } from "../middleware/employeeAuth.js";
import * as repo from "../repositories/dashboard.repository.js";
import { sendSuccess } from "../common/response.js";

export async function getDashboard(
  _req: EmployeeAuthRequest,
  res: Response
): Promise<void> {
  const stats = await repo.getDashboardStats();
  sendSuccess(res, stats);
}
