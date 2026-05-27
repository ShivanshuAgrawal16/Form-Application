import { db, eq } from "@repo/database";
import { formFieldsTable } from "@repo/database/models/form-field"; // Adjust this import path to wherever your table is exported
import {
  createFieldInput,
  CreateFieldInputType,
  updateFieldInput,
  UpdateFieldInputType,
  deleteFieldInput,
  DeleteFieldInputType,
} from "./model";

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

class FormFieldService {
  public async createField(payload: CreateFieldInputType) {
    const data = await createFieldInput.parseAsync(payload);

    const labelKey = data.labelKey || generateSlug(data.label);

    const insertResult = await db
      .insert(formFieldsTable)
      .values({
        formId: data.formId,
        label: data.label,
        labelKey,
        description: data.description,
        placeholder: data.placeholder,
        isRequired: data.isRequired,
        index: data.index,
        type: data.type,
      })
      .returning({ id: formFieldsTable.id });

    if (!insertResult || insertResult.length === 0 || !insertResult[0]?.id) {
      throw new Error(`Something went wrong while creating the form field`);
    }

    return { id: insertResult[0].id };
  }

  public async updateField(payload: UpdateFieldInputType) {
    const { id, ...updateData } = await updateFieldInput.parseAsync(payload);

    if (Object.keys(updateData).length === 0) {
      throw new Error("No data provided for update");
    }

    const updateResult = await db
      .update(formFieldsTable)
      .set(updateData)
      .where(eq(formFieldsTable.id, id))
      .returning({ id: formFieldsTable.id });

    if (!updateResult || updateResult.length === 0 || !updateResult[0]?.id) {
      throw new Error(`Field not found or could not be updated`);
    }

    return { id: updateResult[0].id };
  }

  public async deleteField(payload: DeleteFieldInputType) {
    const { id } = await deleteFieldInput.parseAsync(payload);

    const deleteResult = await db
      .delete(formFieldsTable)
      .where(eq(formFieldsTable.id, id))
      .returning({ id: formFieldsTable.id });

    if (!deleteResult || deleteResult.length === 0 || !deleteResult[0]?.id) {
      throw new Error(`Field not found or could not be deleted`);
    }

    return { success: true, id: deleteResult[0].id };
  }
}

export default FormFieldService;
