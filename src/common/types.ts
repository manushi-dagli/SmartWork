/**
 * Shared domain types and DTOs.
 */

export type AuthRole = "super_admin" | "admin" | "manager" | "staff" | "viewer";

export type RoleValue = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "EMPLOYEE" | "ARTICLE";

export interface Firm {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  phoneCountryCode: string | null;
  phoneNumber: string | null;
  email: string | null;
  pan: string | null;
  gst: string | null;
  bankDetails: unknown;
  upiId: string | null;
  qrCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFirmDto {
  name: string;
  description?: string | null;
  address?: string | null;
  phoneCountryCode?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  pan?: string | null;
  gst?: string | null;
  bankDetails?: unknown;
  upiId?: string | null;
  qrCode?: string | null;
}

export interface UpdateFirmDto {
  name?: string;
  description?: string | null;
  address?: string | null;
  phoneCountryCode?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  pan?: string | null;
  gst?: string | null;
  bankDetails?: unknown;
  upiId?: string | null;
  qrCode?: string | null;
}

export interface Role {
  id: string;
  name: string;
  value: RoleValue;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDto {
  name: string;
  value: RoleValue;
  description?: string | null;
}

export interface UpdateRoleDto {
  name?: string;
  value?: RoleValue;
  description?: string | null;
}

export type PermissionScope = "all" | "below" | "same_or_below";

export interface Permission {
  id: string;
  code: string;
  action: string;
  subject: string;
  scope: PermissionScope | null;
  createdAt: string;
}

export interface Family {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFamilyDto {
  name: string;
}

export interface UpdateFamilyDto {
  name?: string;
}

export interface Client {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  address: string | null;
  phone1CountryCode: string | null;
  phone1Number: string | null;
  phone2CountryCode: string | null;
  phone2Number: string | null;
  email1: string | null;
  email2: string | null;
  pan: string | null;
  gst: string | null;
  bankDetails: unknown;
  dsc: string | null;
  otp: string | null;
  firmId: string | null;
  familyId: string | null;
  taskId: string | null;
  subtaskId: string | null;
  taskDueDate: string | null;
  subtaskDueDate: string | null;
  assignmentTerms: string | null;
  paymentTerms: string | null;
  paymentCost: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientDto {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  address?: string | null;
  phone1CountryCode?: string | null;
  phone1Number?: string | null;
  phone2CountryCode?: string | null;
  phone2Number?: string | null;
  email1?: string | null;
  email2?: string | null;
  pan?: string | null;
  gst?: string | null;
  bankDetails?: unknown;
  dsc?: string | null;
  otp?: string | null;
  firmId?: string | null;
  familyId?: string | null;
  taskId?: string | null;
  subtaskId?: string | null;
  taskDueDate?: string | Date | null;
  subtaskDueDate?: string | Date | null;
  assignmentTerms?: string | null;
  paymentTerms?: string | null;
  paymentCost?: string | null;
}

export interface UpdateClientDto {
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  address?: string | null;
  phone1CountryCode?: string | null;
  phone1Number?: string | null;
  phone2CountryCode?: string | null;
  phone2Number?: string | null;
  email1?: string | null;
  email2?: string | null;
  pan?: string | null;
  gst?: string | null;
  bankDetails?: unknown;
  dsc?: string | null;
  otp?: string | null;
  firmId?: string | null;
  familyId?: string | null;
  taskId?: string | null;
  subtaskId?: string | null;
  taskDueDate?: string | Date | null;
  subtaskDueDate?: string | Date | null;
  assignmentTerms?: string | null;
  paymentTerms?: string | null;
  paymentCost?: string | null;
}

export interface Employee {
  id: string;
  username: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  address: string | null;
  phoneCountryCode: string | null;
  phoneNumber: string | null;
  email: string | null;
  ref: string | null;
  bankDetails: unknown;
  pan: string | null;
  aadhaarDetails: unknown;
  upiId: string | null;
  qrCode: string | null;
  joiningDate: string | null;
  leavingDate: string | null;
  roleId: string | null;
  profilePicture: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Minimal fields returned by GET /employees list (full name, email, role, profile picture). */
export interface EmployeeListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  roleId: string | null;
  profilePicture: string | null;
}

export interface CreateEmployeeDto {
  username?: string | null;
  password?: string | null;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  address?: string | null;
  phoneCountryCode?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  ref?: string | null;
  bankDetails?: unknown;
  pan?: string | null;
  aadhaarDetails?: unknown;
  upiId?: string | null;
  qrCode?: string | null;
  joiningDate?: string | null;
  leavingDate?: string | null;
  roleId?: string | null;
  profilePicture?: string | null;
  isActive?: boolean;
}

export interface UpdateEmployeeDto {
  username?: string | null;
  password?: string | null;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  address?: string | null;
  phoneCountryCode?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  ref?: string | null;
  bankDetails?: unknown;
  pan?: string | null;
  aadhaarDetails?: unknown;
  upiId?: string | null;
  qrCode?: string | null;
  joiningDate?: string | null;
  leavingDate?: string | null;
  roleId?: string | null;
  profilePicture?: string | null;
  isActive?: boolean;
}

export type AssignmentStatus = "IN_PROGRESS" | "COMPLETED";

export interface Assignment {
  id: string;
  clientId: string;
  taskId: string;
  financialYear: string | null;
  startDate: string | null;
  dueDate: string | null;
  managerId: string | null;
  estimatedFees: string | null;
  taskRequestId: string | null;
  status: AssignmentStatus | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssignmentDto {
  clientId: string;
  taskId: string;
  financialYear?: string | null;
  startDate?: string | Date | null;
  dueDate?: string | Date | null;
  managerId?: string | null;
  estimatedFees?: string | null;
  taskRequestId?: string | null;
}

export interface UpdateAssignmentDto {
  clientId?: string;
  taskId?: string;
  financialYear?: string | null;
  startDate?: string | Date | null;
  dueDate?: string | Date | null;
  managerId?: string | null;
  estimatedFees?: string | null;
  taskRequestId?: string | null;
  status?: AssignmentStatus | null;
}

export type AllocatedTaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type ReviewStatus = "APPROVED" | "REWORK";

export interface AllocatedTask {
  id: string;
  assignmentId: string;
  description: string | null;
  assignedToId: string | null;
  assignedById: string | null;
  startDate: string | null;
  dueDate: string | null;
  priority: AllocatedTaskPriority | null;
  checkingRequired: boolean | null;
  checkerId: string | null;
  reviewStatus: ReviewStatus | null;
  checkedById: string | null;
  checkedAt: string | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAllocatedTaskDto {
  assignmentId: string;
  description?: string | null;
  assignedToId?: string | null;
  assignedById?: string | null;
  startDate?: string | Date | null;
  dueDate?: string | Date | null;
  priority?: AllocatedTaskPriority | null;
  checkingRequired?: boolean | null;
  checkerId?: string | null;
}

export interface UpdateAllocatedTaskDto {
  assignmentId?: string;
  description?: string | null;
  assignedToId?: string | null;
  assignedById?: string | null;
  startDate?: string | Date | null;
  dueDate?: string | Date | null;
  priority?: AllocatedTaskPriority | null;
  checkingRequired?: boolean | null;
  checkerId?: string | null;
  reviewStatus?: ReviewStatus | null;
  checkedById?: string | null;
  checkedAt?: string | Date | null;
  remarks?: string | null;
}

export type MilestoneStatus = "PENDING" | "COMPLETED";

export interface Milestone {
  id: string;
  assignmentId: string;
  name: string;
  responsibleEmployeeId: string | null;
  dueDate: string | null;
  status: MilestoneStatus | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMilestoneDto {
  assignmentId: string;
  name: string;
  responsibleEmployeeId?: string | null;
  dueDate?: string | Date | null;
  status?: MilestoneStatus | null;
}

export interface UpdateMilestoneDto {
  name?: string;
  responsibleEmployeeId?: string | null;
  dueDate?: string | Date | null;
  status?: MilestoneStatus | null;
}

export interface AssignmentDocument {
  id: string;
  assignmentId: string;
  name: string;
  description: string | null;
  tag: string | null;
  version: string | null;
  fileKey: string | null;
  uploadedById: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssignmentDocumentDto {
  assignmentId: string;
  name: string;
  description?: string | null;
  tag?: string | null;
  version?: string | null;
  fileKey?: string | null;
  uploadedById?: string | null;
}

export interface UpdateAssignmentDocumentDto {
  name?: string;
  description?: string | null;
  tag?: string | null;
  version?: string | null;
  fileKey?: string | null;
}

export type QueryStatus = "OPEN" | "RESOLVED";

export interface Query {
  id: string;
  assignmentId: string;
  raisedById: string | null;
  queryDescription: string | null;
  assignedToId: string | null;
  status: QueryStatus | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQueryDto {
  assignmentId: string;
  raisedById?: string | null;
  queryDescription?: string | null;
  assignedToId?: string | null;
}

export interface UpdateQueryDto {
  queryDescription?: string | null;
  assignedToId?: string | null;
  status?: QueryStatus | null;
}

export type InvoiceStatus = "PAID" | "UNPAID";

export interface Invoice {
  id: string;
  clientId: string;
  assignmentId: string;
  invoiceDate: string | null;
  amount: string | null;
  gst: string | null;
  totalAmount: string | null;
  status: InvoiceStatus | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceDto {
  clientId: string;
  assignmentId: string;
  invoiceDate?: string | Date | null;
  amount?: string | null;
  gst?: string | null;
  totalAmount?: string | null;
  status?: InvoiceStatus | null;
}

export interface UpdateInvoiceDto {
  invoiceDate?: string | Date | null;
  amount?: string | null;
  gst?: string | null;
  totalAmount?: string | null;
  status?: InvoiceStatus | null;
}

export type PaymentMode = "CASH" | "BANK" | "UPI";

export interface Payment {
  id: string;
  invoiceId: string;
  paymentDate: string | null;
  amountReceived: string | null;
  mode: PaymentMode | null;
  bankName: string | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentDto {
  invoiceId: string;
  paymentDate?: string | Date | null;
  amountReceived?: string | null;
  mode?: PaymentMode | null;
  bankName?: string | null;
  remarks?: string | null;
}

export interface UpdatePaymentDto {
  paymentDate?: string | Date | null;
  amountReceived?: string | null;
  mode?: PaymentMode | null;
  bankName?: string | null;
  remarks?: string | null;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ListQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  roleId?: string;
}
