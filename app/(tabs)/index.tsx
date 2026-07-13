import SafeAreaView from "@/components/SafeAreaView";
import { useExpenseStore } from "@/store/useExpenseStore";
import React from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  const { userExpenses } = useExpenseStore();

  console.log("userExpense:", userExpenses);

  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
