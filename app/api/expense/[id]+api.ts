import { deleteExpenseItem, updateExpenseItem } from "@/lib/server/db-actions";

export async function PATCH(request:Request,{ id }:{ id: string}) {
  try {
    const body = await request.json();
    const {title, category, amount, expense_date} = body || {};

    const updatedExpenseItem = await updateExpenseItem(id, {
        title,
        category,
        amount,
        expense_date,
    });

    if (!updateExpenseItem) {
        return Response.json({error:"Item Not Found", status:404});
    }

    return Response.json({updateExpenseItem})
  }  catch (error) {
    const errorMessage =
        error instanceof Error 
        ? error.message 
        : "Failed to update the expense item";

        return Response.json({error, errorMessage})
    }     
}

export async function Delete(_request: Request, { id }: {id:string}) {
    try {
        await deleteExpenseItem(id);

        return Response.json({ok:true, status:204});
    } catch (error) {
        const message = 
        error instanceof Error ? error.message : "Failed to delete expense";

        return Response.json({error, message})
    } 
}