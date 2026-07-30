import TransactionCard from "@/components/ExpenseScreen/TransactionCard";
import SafeAreaView from "@/components/SafeAreaView";
import { getCategoryWiseData, getTopCategory } from "@/lib/app.helpers";
import { useExpenseStore } from "@/store/useExpenseStore";
import { IExpenseItem } from "@/store/useExpenseStore.types";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const ExpenseScreen = () => {
  const { userExpenses, deleteExpense, fetchExpenses, setSelectedExpenseId } =
    useExpenseStore();
  const router = useRouter();

  const handleUpdate = (expense: IExpenseItem) => {
    const { id, title, amount, category, expenseDate } = expense || {};

    setSelectedExpenseId(id);

    router.push({
      pathname: "/add",
      params: {
        id,
        title,
        amount: String(amount),
        category,
        expenseDate,
      },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    await fetchExpenses();
  };

  const renderCategoryWiseSpending = () => {
    const categoryWiseData = getCategoryWiseData(userExpenses);
    const total = categoryWiseData.reduce((sum, item) => sum + item.value, 0);

    return (
      <View className="rounded-xl bg-white dark:bg-shark2 px-6 py-6 gap-6 mt-8">
        <Text className="dark:text-gray-suit text-shark text-xl font-bold">
          Cateogory
        </Text>

        {categoryWiseData?.map((item, index) => {
          const percentage = (item.value / total) * 100;

          return (
            <View key={index} className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold dark:text-white w-46">
                  {item.label}
                </Text>

                <Text className="text-base font-semibold dark:text-melrose text-gun-powder">
                  ${item.value} {percentage.toFixed(0)}%
                </Text>
              </View>

              <View
                className="w-full h-4.5 bg-gray-200 dark:bg-gray-700 rounded-full
              overflow-hidden"
              >
                <View
                  style={{ width: `${percentage}%` }}
                  className="h-full bg-royal-blue rounded-full"
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-cinder bg-magnolia">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View className="rounded-xl bg-melrose/70 dark:bg-shark2 px-6 py-6">
          <View className="self-start">
            <Text
              className="text-white px-3 bg-royal-blue text-base font-medium rounded-full
          py-1"
            >
              Top Category
            </Text>
          </View>
          <View className="mt-4">
            <Text className="dark:text-white text-black text-3xl font-semibold mt-1">
              {getTopCategory(userExpenses).label}
            </Text>
            <Text className="mt-3 dark:text-white text-black">
              Contributes to{" "}
              {getTopCategory(userExpenses).percentage.toFixed(2)}% of your
              total outflow.
            </Text>
            <Text className="text-4xl text-persian-blue dark:text-melrose mt-6 font-bold">
              ${getTopCategory(userExpenses).amount.toFixed(2)}
            </Text>
          </View>
        </View>

        {renderCategoryWiseSpending()}

        <View className="rounded-xl bg-white dark:bg-shark2 px-6 py-6 gap-6 mt-8">
          <Text className="dark:text-gray-suit text-shark text-xl font-bold">
            All Transaction
          </Text>
          <View className="gap-10">
            {userExpenses?.map((expense) => {
              return (
                <TransactionCard
                  key={expense.id}
                  expense={expense}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseScreen;
