import { desc, eq } from "drizzle-orm"
import { db } from "./db/client"
import { expenseTransactions } from "./db/schema"

export const getAllExpenses = async () => {
    const rows = await db
    .select()
    .from(expenseTransactions)
    .orderBy(desc(expenseTransactions.created_at));

    return rows;
};

    export const createExpenseItem = async (input:{
        title: string;
        category: string;
        amount: number;
        expense_date: string;
    }) => {
        const { title, category, amount, expense_date } = input || {};

        const rows = await db
        .insert(expenseTransactions)
        .values ({
            id:crypto.randomUUID(),
            title,
            category,
            amount,
            expense_date,
            created_at: Date.now(),
        })
        .returning();

        return rows[0]
    };

    export const updateExpenseItem = async (
        id: string,
        input: {
            title: string;
            category: string;
            amount: number;
            expense_date: string;
        },
    ) => {
        const { title, category, amount, expense_date } = input || {};

        const rows = await db 
        .update(expenseTransactions)
        .set({title, category, amount, expense_date})
        .where(eq(expenseTransactions.id, id))
        .returning();

        if(!rows.length) {
            return null;
        }
        return rows[0];
    };

    export const deleteExpenseItem = async (id: string) => {
        await db.delete(expenseTransactions).where(eq(expenseTransactions.id, id));
    };