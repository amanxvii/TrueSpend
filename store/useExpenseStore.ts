import { convertKeysToCamelCase } from "@/lib/app.helpers";
import { create } from "zustand";
import { IExpenseInput, IExpenseStore } from "./useExpenseStore.types";

export const useExpenseStore = create<IExpenseStore>((set, get) => ({
  userExpenses: [],
  selectedExpenseId: null,

  fetchExpenses: async () => {
    try {
      const response = await fetch("/api/expense");
      const data = await response.json();
      const parsedData = convertKeysToCamelCase(data.expenses);

      set({ userExpenses: parsedData });
    } catch (error) {
      console.log("Failed To Fetch Expenses:", error);
    }
  },

  addExpense: async (input: IExpenseInput) => {
    try {
      const { title, category, amount, expenseDate } = input || {};
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          amount: Number(amount),
          expense_date: expenseDate,
        }),
      });

      const data = await response.json();
      const createdExpense = data.createdExpense
        ? convertKeysToCamelCase(data.createdExpense)
        : null;

      set((state) => ({
        userExpenses: createdExpense
          ? [createdExpense, ...state.userExpenses]
          : state.userExpenses,
      }));
    } catch (error) {
      console.log("Failed To add expense:", error);
    }
  },

  updateExpense: async (id: string, input: IExpenseInput) => {
    try {
      const { title, category, amount, expenseDate } = input || {};

      const response = await fetch(`/api/expense/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          amount: Number(amount),
          expense_date: expenseDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      const data = await response.json();
      const updatedExpense = data.updatedExpenseItem
        ? convertKeysToCamelCase(data.updatedExpenseItem)
        : null;

      set((state) => ({
        userExpenses: state.userExpenses.map((item) =>
          item.id === id ? { ...item, ...(updatedExpense ?? {}) } : item,
        ),
      }));
    } catch (error) {
      console.log("Failed to update the expense", error);
    }
  },

  deleteExpense: async (id: string) => {
    try {
      const response = await fetch(`/api/expense/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      set((state) => ({
        userExpenses: state.userExpenses.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log("Failed to delete the expense", error);
    }
  },

  setSelectedExpenseId: (id: string | null) => {
    set({ selectedExpenseId: id });
  },
}));
