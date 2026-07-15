import SafeAreaView from "@/components/SafeAreaView";
import { useExpenseStore } from "@/store/useExpenseStore";
import React, { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import "@/global.css"
import { getTotalExpense, getCurrentMonthExpense, getMonthWiseChartData } from "@/lib/app.helpers";
import {BarChart} from "react-native-gifted-charts"
import { useState } from "react";
import { useRouter } from "expo-router";
import ExpenseCard from "@/components/StatsScreen/TempExpenseCard";
const HomeScreen = () => {
  const { userExpenses } = useExpenseStore();
  const [chartData, setChartData] = useState<{label:string; value:number}[]>([]);
  const router = useRouter();

  useEffect(() => {
    const monthData = getMonthWiseChartData(userExpenses);
    setChartData(monthData)
  }, [userExpenses])


  return (
    <SafeAreaView className=" flex-1 dark:bg-cinder bg-magnolia">
      <ScrollView contentContainerStyle={{ padding:10, paddingBottom:100}}>
    <View className="dark:bg-shark2 bg-persian-blue rounded-xl px-4 py-6 gap-1 shadow-xl ">
      <Text className="dark:text-gray-suit text-white text-sm font-medium">
        EXPENSE
      </Text>
      <Text className="dark:text-melrose text-white font-extrabold text-[4rem]">
        ${getTotalExpense(userExpenses).toFixed(2)}
      </Text>

      <View className="dark:bg-shark3 bg-royal-blue p-4 rounded-lg gap-1 mt-6 border border-athens-gray/10 ">
      <Text className="dark:text-gray-suit text-white text-sm font-medium">
      MONTHLY EXPENSE
      </Text>
      <Text className="dark:text-athens-gray text-white font-bold text-3xl">
      ${getCurrentMonthExpense(userExpenses).toFixed(2)}
      </Text>
      </View>
    </View>

    <View className="mt-8 bg-white dark:bg-shark2 rounded-xl px-4 py-6 gap-1 shadow-xl">
      <Text className="dark:text-gray-suit text-shark text-xl pb-8 font-medium">
        Allocation
        </Text>
        <BarChart 
          data={chartData}
          barWidth={40}
          spacing={40}
          roundedTop
          hideRules
          noOfSections={4}
          maxValue={
            chartData && Math.max(...chartData.map((i) => i.value)) + 500
          }
          yAxisThickness={0}
          xAxisThickness={0}
          frontColor="#6366F1"
          xAxisLabelTextStyle={{color: "#aaa"}}
          yAxisTextStyle={{ color:"#aaa"}}
          />
    </View>

    <View className="mt-8 rounded-xl bg-white dark:bg-shark2 px-6 py-8 gap-6 shadow-xl">
      <View className="flex-row justify-between items-center">
          <Text className="dark:text-gray-suit text-shark text-xl font-medium">
          Recent Transactions
          </Text>
            <Pressable onPress={() => router.push("/expenses")}>
              <Text className="font-medium dark:text-melrose text-persian-blue">
                View All
                </Text>
            </Pressable>
      </View>
      <View className="gap-8">
          {userExpenses.slice(0, 5).map((expense) => {
            return (  
              <ExpenseCard key={expense.id} expense={expense} />
              );
          })}
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
