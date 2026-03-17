import { z } from "zod";

const EMAIL_MAX = 255;
const PHONE_COUNTRY_CODE_MAX = 3;
const PHONE_NUMBER_LEN = 10;
const PHONE_NUMBER_REGEX = /^\d{10}$/;

function emptyToNull(s: string | undefined | null): string | null {
  const t = typeof s === "string" ? s.trim() : "";
  return t === "" ? null : t;
}

/** Optional text: empty or undefined → null; no format/length check */
function optionalText() {
  return z.union([z.string(), z.undefined(), z.null()]).transform((v) => emptyToNull(v ?? undefined));
}

/** Optional email; empty or undefined → null; valid email, max 255 when present */
export function optionalEmailSchema() {
  return z
    .union([z.string(), z.undefined(), z.null()])
    .transform((v) => emptyToNull(v ?? undefined))
    .refine((v) => v === null || (v.length <= EMAIL_MAX && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)), {
      message: "Invalid email address",
    });
}

/** Optional country code: optional leading +, max 3 digits when present. Stored as digits only. */
export function optionalPhoneCountryCodeSchema() {
  return z
    .union([z.string(), z.undefined(), z.null()])
    .transform((v) => {
      const s = typeof v === "string" ? v.trim() : "";
      if (s === "") return null as string | null;
      const digits = s.replace(/^\++/, ""); // strip leading +
      return digits === "" ? null : digits;
    })
    .refine(
      (v) =>
        v === null ||
        (v.length >= 1 &&
          v.length <= PHONE_COUNTRY_CODE_MAX &&
          /^\d+$/.test(v)),
      {
        message: `Country code must be 1–${PHONE_COUNTRY_CODE_MAX} digits (optional + prefix)`,
      }
    );
}

/** Optional phone number: exactly 10 digits when present */
export function optionalPhoneNumberSchema() {
  return z
    .union([z.string(), z.undefined(), z.null()])
    .transform((v) => emptyToNull(v ?? undefined))
    .refine(
      (v) => v === null || (v.length === PHONE_NUMBER_LEN && PHONE_NUMBER_REGEX.test(v)),
      { message: `Phone number must be exactly ${PHONE_NUMBER_LEN} digits` }
    );
}

export const uuidSchema = z.string().uuid("Invalid ID format");

/** Create task request body — taskId; optional subtaskId (taskId must match subtask's task); only email/phone validated */
export const createTaskRequestSchema = z.object({
  taskId: uuidSchema,
  subtaskId: z.union([uuidSchema, z.null()]).optional(),
  contactName: optionalText().optional(),
  contactEmail: optionalEmailSchema().optional(),
  contactPhoneCountryCode: optionalPhoneCountryCodeSchema().optional(),
  contactPhoneNumber: optionalPhoneNumberSchema().optional(),
  contactPhone2CountryCode: optionalPhoneCountryCodeSchema().optional(),
  contactPhone2Number: optionalPhoneNumberSchema().optional(),
  assignmentTerms: z.union([z.string(), z.null()]).optional(),
  paymentTerms: z.union([z.string(), z.null()]).optional(),
  paymentCost: z.union([z.string(), z.null()]).optional(),
});

/** Update task request body (all optional) */
export const updateTaskRequestSchema = z.object({
  taskId: uuidSchema.optional(),
  subtaskId: z.union([uuidSchema, z.null()]).optional(),
  contactName: optionalText().optional(),
  contactEmail: optionalEmailSchema().optional(),
  contactPhoneCountryCode: optionalPhoneCountryCodeSchema().optional(),
  contactPhoneNumber: optionalPhoneNumberSchema().optional(),
  contactPhone2CountryCode: optionalPhoneCountryCodeSchema().optional(),
  contactPhone2Number: optionalPhoneNumberSchema().optional(),
  assignmentTerms: z.union([z.string(), z.null()]).optional(),
  paymentTerms: z.union([z.string(), z.null()]).optional(),
  paymentCost: z.union([z.string(), z.null()]).optional(),
  emailedAt: z.union([z.coerce.date(), z.null()]).optional(),
  whatsappSentAt: z.union([z.coerce.date(), z.null()]).optional(),
});

/** Set task request documents body */
export const setTaskRequestDocumentsSchema = z.object({
  documentMasterIds: z.array(uuidSchema),
});

const ALLOWED_ATTACHMENT_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

/** Upload task request attachment — base64 content; max decoded size 5MB */
export const uploadTaskRequestAttachmentSchema = z.object({
  fileName: z.string().min(1, "File name is required").max(255),
  mimeType: z.enum(ALLOWED_ATTACHMENT_MIME, {
    errorMap: () => ({ message: "Allowed types: image/jpeg, image/png, image/webp, application/pdf" }),
  }),
  content: z.string().min(1, "Content is required"), // base64
});

export type CreateTaskRequestValidated = z.infer<typeof createTaskRequestSchema>;
export type UpdateTaskRequestValidated = z.infer<typeof updateTaskRequestSchema>;
export type SetTaskRequestDocumentsValidated = z.infer<typeof setTaskRequestDocumentsSchema>;

// --- Client — only email/phone validated ---
export const createClientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.union([z.string(), z.null()]).optional(),
  lastName: z.string().min(1, "Last name is required"),
  address: z.union([z.string(), z.null()]).optional(),
  phone1CountryCode: optionalPhoneCountryCodeSchema().optional(),
  phone1Number: optionalPhoneNumberSchema().optional(),
  phone2CountryCode: optionalPhoneCountryCodeSchema().optional(),
  phone2Number: optionalPhoneNumberSchema().optional(),
  email1: optionalEmailSchema().optional(),
  email2: optionalEmailSchema().optional(),
  pan: z.union([z.string(), z.null()]).optional(),
  gst: z.union([z.string(), z.null()]).optional(),
  bankDetails: z.unknown().optional(),
  dsc: z.union([z.string(), z.null()]).optional(),
  otp: z.union([z.string(), z.null()]).optional(),
  familyId: z.union([uuidSchema, z.null()]).optional(),
  taskId: z.union([uuidSchema, z.null()]).optional(),
  subtaskId: z.union([uuidSchema, z.null()]).optional(),
  taskDueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  subtaskDueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  assignmentTerms: z.union([z.string(), z.null()]).optional(),
  paymentTerms: z.union([z.string(), z.null()]).optional(),
  paymentCost: z.union([z.string(), z.null()]).optional(),
});

export const updateClientSchema = z.object({
  firstName: z.string().min(1).optional(),
  middleName: z.union([z.string(), z.null()]).optional(),
  lastName: z.string().min(1).optional(),
  address: z.union([z.string(), z.null()]).optional(),
  phone1CountryCode: optionalPhoneCountryCodeSchema().optional(),
  phone1Number: optionalPhoneNumberSchema().optional(),
  phone2CountryCode: optionalPhoneCountryCodeSchema().optional(),
  phone2Number: optionalPhoneNumberSchema().optional(),
  email1: optionalEmailSchema().optional(),
  email2: optionalEmailSchema().optional(),
  pan: z.union([z.string(), z.null()]).optional(),
  gst: z.union([z.string(), z.null()]).optional(),
  bankDetails: z.unknown().optional(),
  dsc: z.union([z.string(), z.null()]).optional(),
  otp: z.union([z.string(), z.null()]).optional(),
  familyId: z.union([uuidSchema, z.null()]).optional(),
  taskId: z.union([uuidSchema, z.null()]).optional(),
  subtaskId: z.union([uuidSchema, z.null()]).optional(),
  taskDueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  subtaskDueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  assignmentTerms: z.union([z.string(), z.null()]).optional(),
  paymentTerms: z.union([z.string(), z.null()]).optional(),
  paymentCost: z.union([z.string(), z.null()]).optional(),
});

// --- Firm — only email/phone validated ---
export const createFirmSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.union([z.string(), z.null()]).optional(),
  address: z.union([z.string(), z.null()]).optional(),
  phoneCountryCode: optionalPhoneCountryCodeSchema().optional(),
  phoneNumber: optionalPhoneNumberSchema().optional(),
  email: optionalEmailSchema().optional(),
  pan: z.union([z.string(), z.null()]).optional(),
  gst: z.union([z.string(), z.null()]).optional(),
  bankDetails: z.unknown().optional(),
  upiId: z.union([z.string(), z.null()]).optional(),
  qrCode: z.union([z.string(), z.null()]).optional(),
});

export const updateFirmSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.union([z.string(), z.null()]).optional(),
  address: z.union([z.string(), z.null()]).optional(),
  phoneCountryCode: optionalPhoneCountryCodeSchema().optional(),
  phoneNumber: optionalPhoneNumberSchema().optional(),
  email: optionalEmailSchema().optional(),
  pan: z.union([z.string(), z.null()]).optional(),
  gst: z.union([z.string(), z.null()]).optional(),
  bankDetails: z.unknown().optional(),
  upiId: z.union([z.string(), z.null()]).optional(),
  qrCode: z.union([z.string(), z.null()]).optional(),
});

// --- Employee (create/update) — only email/phone validated ---
export const createEmployeeSchema = z.object({
  username: z.union([z.string(), z.null()]).optional(),
  password: z.union([z.string(), z.null()]).optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.union([z.string(), z.null()]).optional(),
  lastName: z.string().min(1, "Last name is required"),
  address: z.union([z.string(), z.null()]).optional(),
  phoneCountryCode: optionalPhoneCountryCodeSchema().optional(),
  phoneNumber: optionalPhoneNumberSchema().optional(),
  email: optionalEmailSchema().optional(),
  ref: z.union([z.string(), z.null()]).optional(),
  bankDetails: z.unknown().optional(),
  pan: z.union([z.string(), z.null()]).optional(),
  aadhaarDetails: z.unknown().optional(),
  upiId: z.union([z.string(), z.null()]).optional(),
  qrCode: z.union([z.string(), z.null()]).optional(),
  joiningDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  leavingDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  roleId: z.union([uuidSchema, z.null()]).optional(),
  profilePicture: z.union([z.string(), z.null()]).optional(),
  isActive: z.boolean().optional(),
});

export const updateEmployeeSchema = z.object({
  username: z.union([z.string(), z.null()]).optional(),
  password: z.union([z.string(), z.null()]).optional(),
  firstName: z.string().min(1).optional(),
  middleName: z.union([z.string(), z.null()]).optional(),
  lastName: z.string().min(1).optional(),
  address: z.union([z.string(), z.null()]).optional(),
  phoneCountryCode: optionalPhoneCountryCodeSchema().optional(),
  phoneNumber: optionalPhoneNumberSchema().optional(),
  email: optionalEmailSchema().optional(),
  ref: z.union([z.string(), z.null()]).optional(),
  bankDetails: z.unknown().optional(),
  pan: z.union([z.string(), z.null()]).optional(),
  aadhaarDetails: z.unknown().optional(),
  upiId: z.union([z.string(), z.null()]).optional(),
  qrCode: z.union([z.string(), z.null()]).optional(),
  joiningDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  leavingDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  roleId: z.union([uuidSchema, z.null()]).optional(),
  profilePicture: z.union([z.string(), z.null()]).optional(),
  isActive: z.boolean().optional(),
});

// --- Profile (PATCH) — only firstName, lastName, profilePicture allowed (email and username not editable) ---
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  profilePicture: z.union([z.string(), z.null()]).optional(),
});

// --- Assignment (create/update) ---
export const createAssignmentSchema = z.object({
  clientId: uuidSchema,
  taskId: uuidSchema,
  financialYear: z.union([z.string(), z.null()]).optional(),
  startDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  dueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  managerId: z.union([uuidSchema, z.null()]).optional(),
  estimatedFees: z.union([z.string(), z.null()]).optional(),
  taskRequestId: z.union([uuidSchema, z.null()]).optional(),
});

export const updateAssignmentSchema = z.object({
  clientId: uuidSchema.optional(),
  taskId: uuidSchema.optional(),
  financialYear: z.union([z.string(), z.null()]).optional(),
  startDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  dueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  managerId: z.union([uuidSchema, z.null()]).optional(),
  estimatedFees: z.union([z.string(), z.null()]).optional(),
  taskRequestId: z.union([uuidSchema, z.null()]).optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED"]).optional(),
});

export type CreateAssignmentValidated = z.infer<typeof createAssignmentSchema>;
export type UpdateAssignmentValidated = z.infer<typeof updateAssignmentSchema>;

// --- Allocated task (task allocation per assignment) ---
export const createAllocatedTaskSchema = z.object({
  assignmentId: uuidSchema,
  description: z.union([z.string(), z.null()]).optional(),
  assignedToId: z.union([uuidSchema, z.null()]).optional(),
  assignedById: z.union([uuidSchema, z.null()]).optional(),
  startDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  dueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  checkingRequired: z.boolean().optional(),
  checkerId: z.union([uuidSchema, z.null()]).optional(),
});

export const updateAllocatedTaskSchema = z.object({
  assignmentId: uuidSchema.optional(),
  description: z.union([z.string(), z.null()]).optional(),
  assignedToId: z.union([uuidSchema, z.null()]).optional(),
  assignedById: z.union([uuidSchema, z.null()]).optional(),
  startDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  dueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  checkingRequired: z.boolean().optional(),
  checkerId: z.union([uuidSchema, z.null()]).optional(),
  reviewStatus: z.enum(["APPROVED", "REWORK"]).optional(),
  checkedById: z.union([uuidSchema, z.null()]).optional(),
  checkedAt: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  remarks: z.union([z.string(), z.null()]).optional(),
});

export type CreateAllocatedTaskValidated = z.infer<typeof createAllocatedTaskSchema>;
export type UpdateAllocatedTaskValidated = z.infer<typeof updateAllocatedTaskSchema>;

// --- Milestone ---
export const createMilestoneSchema = z.object({
  assignmentId: uuidSchema,
  name: z.string().min(1, "Name is required"),
  responsibleEmployeeId: z.union([uuidSchema, z.null()]).optional(),
  dueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
});

export const updateMilestoneSchema = z.object({
  name: z.string().min(1).optional(),
  responsibleEmployeeId: z.union([uuidSchema, z.null()]).optional(),
  dueDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
});

export type CreateMilestoneValidated = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneValidated = z.infer<typeof updateMilestoneSchema>;

// --- Assignment document ---
export const createAssignmentDocumentSchema = z.object({
  assignmentId: uuidSchema,
  name: z.string().min(1, "Name is required"),
  description: z.union([z.string(), z.null()]).optional(),
  tag: z.union([z.string(), z.null()]).optional(),
  version: z.union([z.string(), z.null()]).optional(),
  fileKey: z.union([z.string(), z.null()]).optional(),
  uploadedById: z.union([uuidSchema, z.null()]).optional(),
});

export const updateAssignmentDocumentSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.union([z.string(), z.null()]).optional(),
  tag: z.union([z.string(), z.null()]).optional(),
  version: z.union([z.string(), z.null()]).optional(),
  fileKey: z.union([z.string(), z.null()]).optional(),
});

export type CreateAssignmentDocumentValidated = z.infer<typeof createAssignmentDocumentSchema>;
export type UpdateAssignmentDocumentValidated = z.infer<typeof updateAssignmentDocumentSchema>;

// --- Query ---
export const createQuerySchema = z.object({
  assignmentId: uuidSchema,
  raisedById: z.union([uuidSchema, z.null()]).optional(),
  queryDescription: z.union([z.string(), z.null()]).optional(),
  assignedToId: z.union([uuidSchema, z.null()]).optional(),
});

export const updateQuerySchema = z.object({
  queryDescription: z.union([z.string(), z.null()]).optional(),
  assignedToId: z.union([uuidSchema, z.null()]).optional(),
  status: z.enum(["OPEN", "RESOLVED"]).optional(),
});

export type CreateQueryValidated = z.infer<typeof createQuerySchema>;
export type UpdateQueryValidated = z.infer<typeof updateQuerySchema>;

// --- Invoice ---
export const createInvoiceSchema = z.object({
  clientId: uuidSchema,
  assignmentId: uuidSchema,
  invoiceDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  amount: z.union([z.string(), z.null()]).optional(),
  gst: z.union([z.string(), z.null()]).optional(),
  totalAmount: z.union([z.string(), z.null()]).optional(),
  status: z.enum(["PAID", "UNPAID"]).optional(),
});

export const updateInvoiceSchema = z.object({
  invoiceDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  amount: z.union([z.string(), z.null()]).optional(),
  gst: z.union([z.string(), z.null()]).optional(),
  totalAmount: z.union([z.string(), z.null()]).optional(),
  status: z.enum(["PAID", "UNPAID"]).optional(),
});

// --- Payment ---
export const createPaymentSchema = z.object({
  invoiceId: uuidSchema,
  paymentDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  amountReceived: z.union([z.string(), z.null()]).optional(),
  mode: z.enum(["CASH", "BANK", "UPI"]).optional(),
  bankName: z.union([z.string(), z.null()]).optional(),
  remarks: z.union([z.string(), z.null()]).optional(),
});

export const updatePaymentSchema = z.object({
  paymentDate: z.union([z.string(), z.coerce.date(), z.null()]).optional(),
  amountReceived: z.union([z.string(), z.null()]).optional(),
  mode: z.enum(["CASH", "BANK", "UPI"]).optional(),
  bankName: z.union([z.string(), z.null()]).optional(),
  remarks: z.union([z.string(), z.null()]).optional(),
});

// --- Super admin create — only email validated ---
const requiredEmail = z.string().min(1, "Email is required").email("Invalid email address").max(EMAIL_MAX);
export const createSuperAdminSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: requiredEmail,
  password: z.string().min(1, "Password is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.union([z.string(), z.null()]).optional(),
});
