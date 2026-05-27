import { router, publicProcedure, authenticatedProcedure } from "../../trpc";
import { formService } from "../../services";
import { generatePath } from "../../utils/path-generator";
import { createFormInputModel, createFormOutputModel, listFormsOutputModel } from "./model";
import { z } from "zod";

const TAGS = ["Forms"];
const getPath = generatePath("/form");

export const formRouter = router({
  createForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { title, description } = input;
      const createdBy = ctx.user.id;

      const { id } = await formService.createForm({ title, description, createdBy });

      return { id };
    }),
  listForms: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/list"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(z.undefined())
    .output(listFormsOutputModel)
    .query(async ({ ctx }) => {
      const userId = ctx.user.id;
      const forms = await formService.listFormsByUserId({ userId });

      return forms.map((form) => ({
        id: form.id,
        title: form.title,
        description: form.description ?? null,
        createdAt: form.createdAt ? form.createdAt.toISOString() : null,
        updatedAt: form.updatedAt ? form.updatedAt.toISOString() : null,
      }));
    }),
});
