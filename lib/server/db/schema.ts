import { pgTable, text, bigint} from "drizzle-orm/pg-core"

export const expenseTransactions = pgTable("expense_transaction", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    amount: bigint("amount", {mode: "number"}).notNull(),
    expense_date: text("expense_date").notNull(),
    created_at: bigint("created_at", {mode:"number"}).notNull(),
});
