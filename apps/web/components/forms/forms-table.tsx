"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "~/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { useListForms } from "~/hooks/api/form";

export default function FormsTable() {
  const { forms, isLoading, isError, error, isFetched } = useListForms();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Forms</CardTitle>
          <CardDescription>Loading your forms...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-sm text-muted-foreground">Loading forms…</div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Forms</CardTitle>
          <CardDescription>Unable to load forms.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-sm text-destructive">
            {error?.message ?? "Something went wrong."}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>My Forms</CardTitle>
          <CardDescription>Manage the forms you have created.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isFetched && forms?.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No forms found. Create one to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms?.map((form) => (
                <TableRow key={form.id}>
                  <TableCell>{form.title}</TableCell>
                  <TableCell>{form.description ?? "—"}</TableCell>
                  <TableCell>
                    {form.createdAt ? new Date(form.createdAt).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell>
                    {form.updatedAt ? new Date(form.updatedAt).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/forms/${form.id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
