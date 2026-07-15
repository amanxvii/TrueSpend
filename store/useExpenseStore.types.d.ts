export type IExpenseCategory =
| "Food"
| "Transport"
| "Groceries"
| "Entertainment"
| "Bills"

export type IExpenseItem = {
    id: string;
    title: string;
    category: string;
    amount: number;
    expenseDate: string;
};

export type IExpenseResponse = {expenses: IExpenseCategory};

export type IExpenseInput = {
    title: string;
    category: IExpenseCategory;
    amount: string;
    expenseDate: string;
};

export type IExpenseStore = {
    userExpenses: IExpenseItem[];
    fetchExpenses: () => Promise<void>;
    addExpense: (input: IExpenseInput) => Promise<void>;
    updateExpense: (id: string, input: IExpenseInput) => Promise<void>;
    deleteExpense:(id: string) => Promise<void>;
};

export type MonthData = {
    label: string;
    value: number;
    monthIndex: number;
};

export type IGenericStringMap = {
    [key: string] : string;
};

type IToCamelCase = (key: string) => string