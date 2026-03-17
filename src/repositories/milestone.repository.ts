import { eq, desc } from "drizzle-orm";
import { db } from "../config/database.js";
import { milestones } from "../db/schema.js";
import type { MilestoneRow } from "../db/schema.js";
import type {
  Milestone,
  CreateMilestoneDto,
  UpdateMilestoneDto,
} from "../common/types.js";
import { NotFoundError } from "../common/errors.js";

function mapRow(row: MilestoneRow): Milestone {
  return {
    id: row.id,
    assignmentId: row.assignmentId,
    name: row.name,
    responsibleEmployeeId: row.responsibleEmployeeId,
    dueDate: row.dueDate?.toISOString() ?? null,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function listMilestonesByAssignment(
  assignmentId: string
): Promise<Milestone[]> {
  const rows = await db
    .select()
    .from(milestones)
    .where(eq(milestones.assignmentId, assignmentId))
    .orderBy(desc(milestones.createdAt));
  return rows.map(mapRow);
}

export async function getMilestoneById(id: string): Promise<Milestone | null> {
  const rows = await db
    .select()
    .from(milestones)
    .where(eq(milestones.id, id))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  return mapRow(row);
}

export async function createMilestone(
  dto: CreateMilestoneDto
): Promise<Milestone> {
  const [row] = await db
    .insert(milestones)
    .values({
      assignmentId: dto.assignmentId,
      name: dto.name,
      responsibleEmployeeId: dto.responsibleEmployeeId ?? null,
      dueDate: dto.dueDate != null ? new Date(dto.dueDate) : null,
      status: dto.status ?? null,
    })
    .returning();
  if (!row) throw new Error("Insert milestone failed");
  return mapRow(row);
}

export async function updateMilestone(
  id: string,
  dto: UpdateMilestoneDto
): Promise<Milestone> {
  const existing = await getMilestoneById(id);
  if (!existing) throw new NotFoundError("Milestone not found");

  const [row] = await db
    .update(milestones)
    .set({
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.responsibleEmployeeId !== undefined && {
        responsibleEmployeeId: dto.responsibleEmployeeId,
      }),
      ...(dto.dueDate !== undefined && {
        dueDate: dto.dueDate != null ? new Date(dto.dueDate) : null,
      }),
      ...(dto.status !== undefined && { status: dto.status }),
      updatedAt: new Date(),
    })
    .where(eq(milestones.id, id))
    .returning();
  if (!row) throw new Error("Update milestone failed");
  return mapRow(row);
}

export async function deleteMilestone(id: string): Promise<void> {
  const deleted = await db
    .delete(milestones)
    .where(eq(milestones.id, id))
    .returning({ id: milestones.id });
  if (deleted.length === 0) throw new NotFoundError("Milestone not found");
}
