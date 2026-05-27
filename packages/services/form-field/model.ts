import { z } from "zod";

export const FieldTypeZodEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const createFieldInput = z.object({
  formId: z.string().uuid().describe("UUID of the form this field belongs to"),
  label: z.string().min(1).max(100).describe("Label of the form field"),
  labelKey: z
    .string()
    .max(100)
    .optional()
    .describe("Slugified label. Auto-generated if not provided"),
  description: z.string().optional().describe("Optional description/helper text"),
  placeholder: z.string().optional().describe("Optional input placeholder"),
  isRequired: z.boolean().default(false).describe("Whether the field is mandatory"),

  index: z.string().describe("Fractional index for sorting (e.g., '1.50')"),

  type: FieldTypeZodEnum.describe("Type of the field"),
});

export type CreateFieldInputType = z.infer<typeof createFieldInput>;

export const updateFieldInput = z.object({
  id: z.string().uuid().describe("UUID of the field to update"),
  label: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  isRequired: z.boolean().optional(),
  index: z.string().optional(),
  type: FieldTypeZodEnum.optional(),
});

export type UpdateFieldInputType = z.infer<typeof updateFieldInput>;

export const deleteFieldInput = z.object({
  id: z.string().uuid().describe("UUID of the field to delete"),
});

export type DeleteFieldInputType = z.infer<typeof deleteFieldInput>;
