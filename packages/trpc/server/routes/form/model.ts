import { z } from "zod";

export const createFormInputModel = z.object({
  title: z.string().min(1).max(55).describe("Title of the form"),
  description: z.string().max(300).optional().describe("Description of the form"),
});

export const createFormOutputModel = z.object({
  id: z.string().describe("id of the created form"),
});

export const listFormsOutputModel = z.array(
  z.object({
    id: z.string().describe("Id of the form"),
    title: z.string().describe("Title of the Form"),
    description: z.string().optional().nullable().describe("Description of the forn"),
    createdAt: z.string().nullable().describe("Creation timestamp"),
    updatedAt: z.string().nullable().describe("Last updated timestamp"),
  }),
);
