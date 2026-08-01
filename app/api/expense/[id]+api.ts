import { deleteExpenseItem, updateExpenseItem } from "@/lib/server/db-actions";

export async function PATCH(request: Request, { id }: { id: string }) {
  try {
    const body = await request.json();
    const { title, category, amount, expense_date } = body || {};

    const updatedExpenseItem = await updateExpenseItem(id, {
      title,
      category,
      amount: Number(amount),
      expense_date,
    });

    if (!updatedExpenseItem) {
      return Response.json({ error: "Item Not Found", status: 404 });
    }

    return Response.json({ updatedExpenseItem, status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update the expense item";

    return Response.json({ error, errorMessage });
  }
}

export async function DELETE(_request: Request, { id }: { id: string }) {
  try {
    await deleteExpenseItem(id);

    return Response.json({ ok: true, status: 204 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete expense";

    return Response.json({ error, message });
  }
}
