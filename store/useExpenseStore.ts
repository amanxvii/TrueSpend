import { create } from 'zustand'
import { IExpenseInput, IExpenseStore } from './useExpenseStore.types'
import { convertKeysToCamelCase } from '@/lib/app.helpers';

export const useExpenseStore = create<IExpenseStore>((set,get) => ({
userExpenses: [],


fetchExpenses: async () => {
    try {

        const response = await fetch("/api/expense");
        const data = await response.json();
        const parsedData = convertKeysToCamelCase(data.expenses);

        set({userExpenses: parsedData})
    }catch (error) {
        console.log("Failed To Fetch Expenses:", error)
    }
},

addExpense: async (input: IExpenseInput) => {
    try {
        const { title, category, amount, expenseDate} = input || {};
        const response = await fetch("/api/expense", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                title,
                category,
                amount,
                expense_dates: expenseDate,
            }),
        });

        const data = await response.json();

        set((state) => ({
            userExpenses: [data.createdExpense, ...state.userExpenses],
        }));
    } catch (error) {
        console.log("Failed To add expense:", error)
    }
},

updateExpense: async (id:string, input: IExpenseInput) => {
    try {
        const { title, category, amount, expenseDate} = input || {};
        
        const response = await fetch(`/api/expense.${id}`, {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({title, category, amount, expenseDate}),
        });

        const data = await response.json();
        set((state) => ({
            userExpenses: state.userExpenses.map((item) => 
            item.id === id ? data.updatedExpenseItem: item,
        ),
        }));
    } catch (error) {
        console.log("Failed to update the expense", error);
    }
},

deleteExpense: async (id: string) => {
 try {
    await fetch (`/api/expense/${id}`, {method:"DELETE"});
 } catch (error) {
    console.log("Failed to delete the expense", error);
 }
},

}) )