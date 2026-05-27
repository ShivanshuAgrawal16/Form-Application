"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useCreateForm } from "~/hooks/api/form";

type FormValues = {
  title: string;
  description?: string;
};

export default function NewFormDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { createFormAsync, isIdle, isError, error, isSuccess } = useCreateForm();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { title: "", description: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { id } = await createFormAsync({ title: values.title, description: values.description });
    setOpen(false);
    reset();
    if (id) router.push(`/dashboard/forms/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>Enter form details to create a new form.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" {...register("title", { required: true })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input id="description" {...register("description")} />
            </Field>

            <DialogFooter>
              <DialogClose>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
