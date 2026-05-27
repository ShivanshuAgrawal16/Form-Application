import { db, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import {
  createFormInput,
  CreateFormInputType,
  getFormByIdInput,
  GetFormByIdInputType,
} from "./model";

class FormService {
  public async createForm(payload: CreateFormInputType) {
    const { title, description, createdBy } = await createFormInput.parseAsync(payload);

    const insertResult = await db
      .insert(formsTable)
      .values({ title, description, createdBy })
      .returning({ id: formsTable.id });

    if (!insertResult || insertResult.length === 0 || !insertResult[0]?.id) {
      throw new Error(`Something went wrong while creating the form`);
    }

    return { id: insertResult[0].id };
  }

  public async getFormById(payload: GetFormByIdInputType) {
    const { id } = await getFormByIdInput.parseAsync(payload);
    const result = await db.select().from(formsTable).where(eq(formsTable.id, id));
    if (!result || result.length === 0) throw new Error(`Form with ID ${id} does not exists`);
    return result[0];
  }
}

export default FormService;
