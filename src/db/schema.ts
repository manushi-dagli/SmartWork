import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  jsonb,
  boolean,
  primaryKey,
  customType,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
  toDriver(value: Buffer) {
    return value;
  },
  fromDriver(value: unknown) {
    return value as Buffer;
  },
});

export const firms = pgTable("firms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address"),
  phoneCountryCode: text("phone_country_code"),
  phoneNumber: text("phone_number"),
  email: text("email"),
  pan: text("pan"),
  gst: text("gst"),
  bankDetails: jsonb("bank_details"),
  upiId: text("upi_id"),
  qrCode: text("qr_code"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const rolesEnum = pgEnum("role_value", [
  "SUPER_ADMIN",
  "ADMIN",
  "MANAGER",
  "EMPLOYEE",
  "ARTICLE",
]);

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  value: rolesEnum("value").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const permissionScopeEnum = pgEnum("permission_scope", [
  "all",
  "below",
  "same_or_below",
]);

export const permissions = pgTable("permissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  action: text("action").notNull(),
  subject: text("subject").notNull(),
  scope: permissionScopeEnum("scope"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })]
);

export const roleHierarchy = pgTable("role_hierarchy", {
  roleId: uuid("role_id")
    .primaryKey()
    .references(() => roles.id, { onDelete: "cascade" }),
  parentRoleId: uuid("parent_role_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
});

export const superAdmins = pgTable("super_admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const family = pgTable("family", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  address: text("address"),
  phone1CountryCode: text("phone_1_country_code"),
  phone1Number: text("phone_1_number"),
  phone2CountryCode: text("phone_2_country_code"),
  phone2Number: text("phone_2_number"),
  email1: text("email_1"),
  email2: text("email_2"),
  pan: text("pan"),
  gst: text("gst"),
  bankDetails: jsonb("bank_details"),
  dsc: text("dsc"),
  otp: text("otp"),
  firmId: uuid("firm_id").references(() => firms.id, { onDelete: "set null" }),
  familyId: uuid("family_id").references(() => family.id, {
    onDelete: "set null",
  }),
  taskId: uuid("task_id").references(() => tasks.id, { onDelete: "set null" }),
  subtaskId: uuid("subtask_id").references(() => subtasks.id, { onDelete: "set null" }),
  taskDueDate: timestamp("task_due_date", { withTimezone: true }),
  subtaskDueDate: timestamp("subtask_due_date", { withTimezone: true }),
  assignmentTerms: text("assignment_terms"),
  paymentTerms: text("payment_terms"),
  paymentCost: text("payment_cost"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const clientSubtaskSelection = pgTable(
  "client_subtask_selection",
  {
    clientId: uuid("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    subtaskId: uuid("subtask_id")
      .notNull()
      .references(() => subtasks.id, { onDelete: "cascade" }),
    dueDate: timestamp("due_date", { withTimezone: true }),
  },
  (t) => [primaryKey({ columns: [t.clientId, t.subtaskId] })]
);

export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique(),
  passwordHash: text("password_hash"),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  address: text("address"),
  phoneCountryCode: text("phone_country_code"),
  phoneNumber: text("phone_number"),
  email: text("email"),
  ref: text("ref"),
  bankDetails: jsonb("bank_details"),
  pan: text("pan"),
  aadhaarDetails: jsonb("aadhaar_details"),
  upiId: text("upi_id"),
  qrCode: text("qr_code"),
  joiningDate: timestamp("joining_date", { withTimezone: true }),
  leavingDate: timestamp("leaving_date", { withTimezone: true }),
  roleId: uuid("role_id").references(() => roles.id, {
    onDelete: "set null",
  }),
  profilePicture: text("profile_picture"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type FirmRow = typeof firms.$inferSelect;
export type FirmInsert = typeof firms.$inferInsert;
export type RoleRow = typeof roles.$inferSelect;
export type RoleInsert = typeof roles.$inferInsert;
export type PermissionRow = typeof permissions.$inferSelect;
export type RolePermissionRow = typeof rolePermissions.$inferSelect;
export type RoleHierarchyRow = typeof roleHierarchy.$inferSelect;
export type SuperAdminRow = typeof superAdmins.$inferSelect;
export type SuperAdminInsert = typeof superAdmins.$inferInsert;
export type ClientRow = typeof clients.$inferSelect;
export type ClientInsert = typeof clients.$inferInsert;
export type FamilyRow = typeof family.$inferSelect;
export type FamilyInsert = typeof family.$inferInsert;
export type EmployeeRow = typeof employees.$inferSelect;
export type EmployeeInsert = typeof employees.$inferInsert;

export const taskRequestStatusEnum = pgEnum("task_request_status", [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
]);

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const subtasks = pgTable("subtasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskId: uuid("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const documentMaster = pgTable("document_master", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const taskRequests = pgTable("task_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  status: taskRequestStatusEnum("status").notNull().default("PENDING"),
  firmId: uuid("firm_id").references(() => firms.id, { onDelete: "set null" }),
  taskId: uuid("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "restrict" }),
  subtaskId: uuid("subtask_id").references(() => subtasks.id, { onDelete: "set null" }),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactPhoneCountryCode: text("contact_phone_country_code"),
  contactPhoneNumber: text("contact_phone_number"),
  contactPhone2CountryCode: text("contact_phone_2_country_code"),
  contactPhone2Number: text("contact_phone_2_number"),
  clientId: uuid("client_id").references(() => clients.id, {
    onDelete: "set null",
  }),
  assignmentTerms: text("assignment_terms"),
  paymentTerms: text("payment_terms"),
  paymentCost: text("payment_cost"),
  emailedAt: timestamp("emailed_at", { withTimezone: true }),
  whatsappSentAt: timestamp("whatsapp_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const taskRequestDocuments = pgTable(
  "task_request_documents",
  {
    taskRequestId: uuid("task_request_id")
      .notNull()
      .references(() => taskRequests.id, { onDelete: "cascade" }),
    documentMasterId: uuid("document_master_id")
      .notNull()
      .references(() => documentMaster.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.taskRequestId, t.documentMasterId] })]
);

export const taskRequestAttachments = pgTable("task_request_attachments", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskRequestId: uuid("task_request_id")
    .notNull()
    .references(() => taskRequests.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  content: bytea("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const assignmentStatusEnum = pgEnum("assignment_status", [
  "IN_PROGRESS",
  "COMPLETED",
]);

export const assignments = pgTable("assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "restrict" }),
  taskId: uuid("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "restrict" }),
  financialYear: text("financial_year"),
  startDate: timestamp("start_date", { withTimezone: true }),
  dueDate: timestamp("due_date", { withTimezone: true }),
  managerId: uuid("manager_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  estimatedFees: text("estimated_fees"),
  taskRequestId: uuid("task_request_id").references(() => taskRequests.id, {
    onDelete: "set null",
  }),
  status: assignmentStatusEnum("status").default("IN_PROGRESS"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const allocatedTaskPriorityEnum = pgEnum("allocated_task_priority", [
  "HIGH",
  "MEDIUM",
  "LOW",
]);

export const reviewStatusEnum = pgEnum("review_status", ["APPROVED", "REWORK"]);

export const allocatedTasks = pgTable("allocated_tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id")
    .notNull()
    .references(() => assignments.id, { onDelete: "cascade" }),
  description: text("description"),
  assignedToId: uuid("assigned_to_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  assignedById: uuid("assigned_by_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  startDate: timestamp("start_date", { withTimezone: true }),
  dueDate: timestamp("due_date", { withTimezone: true }),
  priority: allocatedTaskPriorityEnum("priority").default("MEDIUM"),
  checkingRequired: boolean("checking_required").default(false),
  checkerId: uuid("checker_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  reviewStatus: reviewStatusEnum("review_status"),
  checkedById: uuid("checked_by_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  checkedAt: timestamp("checked_at", { withTimezone: true }),
  remarks: text("remarks"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type TaskRow = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;
export type SubtaskRow = typeof subtasks.$inferSelect;
export type SubtaskInsert = typeof subtasks.$inferInsert;
export type DocumentMasterRow = typeof documentMaster.$inferSelect;
export type DocumentMasterInsert = typeof documentMaster.$inferInsert;
export type TaskRequestRow = typeof taskRequests.$inferSelect;
export type TaskRequestInsert = typeof taskRequests.$inferInsert;
export type TaskRequestDocumentRow = typeof taskRequestDocuments.$inferSelect;
export type TaskRequestDocumentInsert = typeof taskRequestDocuments.$inferInsert;
export type TaskRequestAttachmentRow = typeof taskRequestAttachments.$inferSelect;
export type TaskRequestAttachmentInsert = typeof taskRequestAttachments.$inferInsert;
export type AssignmentRow = typeof assignments.$inferSelect;
export type AssignmentInsert = typeof assignments.$inferInsert;
export const milestoneStatusEnum = pgEnum("milestone_status", [
  "PENDING",
  "COMPLETED",
]);

export const milestones = pgTable("milestones", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id")
    .notNull()
    .references(() => assignments.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  responsibleEmployeeId: uuid("responsible_employee_id").references(
    () => employees.id,
    { onDelete: "set null" }
  ),
  dueDate: timestamp("due_date", { withTimezone: true }),
  status: milestoneStatusEnum("status").default("PENDING"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type AllocatedTaskRow = typeof allocatedTasks.$inferSelect;
export type AllocatedTaskInsert = typeof allocatedTasks.$inferInsert;
export const assignmentDocuments = pgTable("assignment_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id")
    .notNull()
    .references(() => assignments.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  tag: text("tag"),
  version: text("version").default("1"),
  fileKey: text("file_key"),
  uploadedById: uuid("uploaded_by_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type MilestoneRow = typeof milestones.$inferSelect;
export type MilestoneInsert = typeof milestones.$inferInsert;
export const queryStatusEnum = pgEnum("query_status", ["OPEN", "RESOLVED"]);

export const queries = pgTable("queries", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id")
    .notNull()
    .references(() => assignments.id, { onDelete: "cascade" }),
  raisedById: uuid("raised_by_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  queryDescription: text("query_description"),
  assignedToId: uuid("assigned_to_id").references(() => employees.id, {
    onDelete: "set null",
  }),
  status: queryStatusEnum("status").default("OPEN"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type AssignmentDocumentRow = typeof assignmentDocuments.$inferSelect;
export type AssignmentDocumentInsert = typeof assignmentDocuments.$inferInsert;
export const invoiceStatusEnum = pgEnum("invoice_status", ["PAID", "UNPAID"]);

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "restrict" }),
  assignmentId: uuid("assignment_id")
    .notNull()
    .references(() => assignments.id, { onDelete: "restrict" }),
  invoiceDate: timestamp("invoice_date", { withTimezone: true }).defaultNow(),
  amount: text("amount"),
  gst: text("gst"),
  totalAmount: text("total_amount"),
  status: invoiceStatusEnum("status").default("UNPAID"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const paymentModeEnum = pgEnum("payment_mode", ["CASH", "BANK", "UPI"]);

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  invoiceId: uuid("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),
  paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow(),
  amountReceived: text("amount_received"),
  mode: paymentModeEnum("mode"),
  bankName: text("bank_name"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type QueryRow = typeof queries.$inferSelect;
export type QueryInsert = typeof queries.$inferInsert;
export type InvoiceRow = typeof invoices.$inferSelect;
export type InvoiceInsert = typeof invoices.$inferInsert;
export type PaymentRow = typeof payments.$inferSelect;
export type PaymentInsert = typeof payments.$inferInsert;
export type ClientSubtaskSelectionRow = typeof clientSubtaskSelection.$inferSelect;
export type ClientSubtaskSelectionInsert = typeof clientSubtaskSelection.$inferInsert;
