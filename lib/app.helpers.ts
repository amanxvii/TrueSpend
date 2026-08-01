import {
  IExpenseItem,
  IGenericStringMap,
  IToCamelCase,
  MonthData,
} from "@/store/useExpenseStore.types";

const getCategoryWiseData = (data: IExpenseItem[]) => {
  const categoryData: Record<string, IExpenseItem[]> = {};

  data.forEach((item) => {
    if (!categoryData[item.category]) {
      categoryData[item.category] = [];
    }

    categoryData[item.category].push(item);
  });

  const chartData = Object.entries(categoryData).map(([category, expenses]) => {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);

    return {
      label: category,
      value: total,
    };
  });

  return chartData;
};

const getMonthWiseChartData = (data: IExpenseItem[]) => {
  const monthlyMap: any = {};

  data.forEach((item) => {
    const date = new Date(item.expenseDate);

    const monthIndex = date.getMonth(); // 2, 3, 4
    const monthLabel = date.toLocaleString("en-IN", { month: "short" });

    if (!monthlyMap[monthIndex]) {
      monthlyMap[monthIndex] = {
        label: monthLabel,
        value: 0,
        monthIndex,
      };
    }

    monthlyMap[monthIndex].value += Number(item.amount);
  });

  const chartData = Object.values(monthlyMap as MonthData[])
    .sort((a, b) => a.monthIndex - b.monthIndex)
    .map(({ label, value }) => ({ label, value }));

  return chartData;
};

const toCamelCase: IToCamelCase = (str) => {
  return str.replace(/([-_][a-z])/gi, (match) =>
    match.toUpperCase().replace("-", "").replace("_", ""),
  );
};

const convertKeysToCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    const mappedArray = obj.map(convertKeysToCamelCase) as unknown as T;

    return mappedArray;
  }

  if (obj !== null && typeof obj === "object") {
    const keys = Object.keys(obj);

    return keys.reduce((result: T, key: string) => {
      const camelKey = toCamelCase(key);
      (result as IGenericStringMap)[camelKey] = convertKeysToCamelCase(
        (obj as IGenericStringMap)[key],
      );
      return result;
    }, {} as T);
  }

  return obj;
};

const getTotalExpense = (data: IExpenseItem[]) => {
  let totalExpense = 0;

  data.forEach((expense) => {
    totalExpense += Number(expense.amount);
  });

  return totalExpense;
};

const getCurrentMonthExpense = (data: IExpenseItem[]) => {
  let currentMonthExpense = 0;
  const currentMonthName = new Date().toLocaleString("default", {
    month: "short",
  });

  data.forEach((expense: IExpenseItem) => {
    const date = new Date(expense.expenseDate);

    const monthName = date.toLocaleString("en-IN", { month: "short" });

    if (monthName === currentMonthName) {
      currentMonthExpense += expense.amount;
    }
  });

  return currentMonthExpense;
};

const getTopCategory = (chartData: IExpenseItem[]) => {
  const categoryData = getCategoryWiseData(chartData);
  const topCategory = {
    label: "",
    amount: 0,
    percentage: 0,
  };
  let totalSum = 0;

  categoryData.forEach((category) => {
    totalSum += category.value;
    if (category.value > topCategory.amount) {
      topCategory.amount = category.value;
      topCategory.label = category.label;
    }
  });

  topCategory.percentage = (topCategory.amount / totalSum) * 100;

  return topCategory;
};

export {
  convertKeysToCamelCase,
  getCategoryWiseData,
  getCurrentMonthExpense,
  getMonthWiseChartData,
  getTopCategory,
  getTotalExpense,
};
