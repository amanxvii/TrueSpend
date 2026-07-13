import { createExpenseItem, getAllExpenses } from "@/lib/server/db-actions";

export async function GET(_request: Request) {
    try{
        const expenses= await getAllExpenses();

        return Response.json({ expenses });
    } catch (error) {
        const message =
        error instanceof Error ? error.message : "Failed to get all expenses"

        return Response.json({error, message});
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {title, category, amount, expense_date} = body || {};

        if (
            !title ||
            !category ||
            expense_date === undefined ||
            expense_date === undefined
        ) {
            return Response.json({
                error:"Please provide all  required fields",
                status: 400,
            });
        }
        const createdExpense = await createExpenseItem({
            title,
            category,
            amount,
            expense_date: expense_date,
        });

        return Response.json({ createdExpense, status:201});
    } catch (error) {
        const message =
        error instanceof Error ? error.message: "Failed to add expense";

        return Response.json({error, message});
    }   
}