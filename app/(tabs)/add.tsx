import SafeAreaView from "@/components/SafeAreaView";
import { useExpenseStore } from "@/store/useExpenseStore";
import { IExpenseCategory } from "@/store/useExpenseStore.types";
import { CATEGORY_KEY, MAP_CATEGORY_TO_ICON } from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const AddScreen = () => {
  const {
    id: paramsId,
    title: paramsTitle,
    amount: paramsAmount,
    category,
    expenseDate,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    amount: string;
    category: IExpenseCategory;
    expenseDate: string;
  }>();

  const {
    addExpense,
    updateExpense,
    userExpenses,
    selectedExpenseId,
    setSelectedExpenseId,
  } = useExpenseStore();

  const [amount, setAmount] = useState(paramsAmount || "");
  const [title, setTitle] = useState(paramsTitle || "");
  const [selectedCategory, setSelectedCategory] = useState<
    IExpenseCategory | string
  >(category || "");
  const [date, setDate] = useState(expenseDate || "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleReset = () => {
    setLoading(false);
    setAmount("");
    setTitle("");
    setSelectedCategory("");
    setDate("");
    setSelectedExpenseId(null);
  };

  const handleUpdateExpense = async () => {
    setLoading(true);

    await updateExpense(paramsId, {
      title,
      category: selectedCategory as IExpenseCategory,
      amount,
      expenseDate: date,
    });

    Alert.alert("Success", "Expense updated successfully.", [
      {
        text: "Add Another",
        style: "cancel",
        onPress: () => router.push("/add"),
      },
      {
        text: "View All",
        onPress: () => router.push("/expenses"),
      },
    ]);

    handleReset();
  };

  const handleAddExpense = async () => {
    if (!title || !selectedCategory || !amount || !date) {
      Alert.alert("Error", "Please fill all the required fields");
      return;
    }

    if (paramsId) {
      handleUpdateExpense();
      return;
    }

    setLoading(true);

    await addExpense({
      title,
      category: selectedCategory as IExpenseCategory,
      amount,
      expenseDate: date,
    });

    Alert.alert("Success", "Expense added successfully.", [
      {
        text: "Add Another",
        style: "cancel",
        onPress: () => router.push("/add"),
      },
      {
        text: "View All",
        onPress: () => router.push("/expenses"),
      },
    ]);

    handleReset();
  };

  useEffect(() => {
    const selectedExpense = paramsId
      ? userExpenses.find((item) => item.id === paramsId)
      : selectedExpenseId
        ? userExpenses.find((item) => item.id === selectedExpenseId)
        : undefined;

    const nextTitle = paramsTitle ?? selectedExpense?.title ?? "";
    const nextAmount =
      paramsAmount ?? selectedExpense?.amount?.toString() ?? "";
    const nextCategory = category ?? selectedExpense?.category ?? "";
    const nextDate = expenseDate ?? selectedExpense?.expenseDate ?? "";

    setTitle(nextTitle);
    setAmount(nextAmount);
    setSelectedCategory(nextCategory);
    setDate(nextDate);
  }, [
    category,
    expenseDate,
    paramsAmount,
    paramsId,
    paramsTitle,
    selectedExpenseId,
    userExpenses,
  ]);

  return (
    <SafeAreaView className="flex-1 dark:bg-cinder bg-magnolia">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="items-center justify-center mt-5">
          <Text className="dark:text-gray-suit text-gray-500 font-semibold text-sm">
            ENTER AMOUNT
          </Text>
          <View className="flex-row items-center mt-4 gap-8 w-[95%]">
            <Text className="text-[3rem] font-bold dark:text-white text-royal-blue">
              $
            </Text>
            <TextInput
              className="text-[3.75rem] w-[85%] font-bold text-black
             dark:text-melrose"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View className="gap-2 mt-4">
          <Text className="dark:text-gray-suit text-gray-500 font-semibold text-sm">
            TITLE
          </Text>
          <TextInput
            className="h-[4.3rem] p-4 text-[1.6rem] font-bold dark:bg-shark bg-titan-white/50
             rounded-xl text-black dark:text-melrose"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="gap-2 mt-8">
          <Text className="dark:text-gray-suit text-gray-500 font-semibold text-sm">
            CATEGORY
          </Text>
          <View className="gap-4 flex-row flex-wrap mt-3">
            {Object.values(CATEGORY_KEY).map((category) => (
              <Text
                key={category}
                className={`text-black dark:text-melrose font-medium rounded-full 
                          py-4 px-5      
                          ${
                            selectedCategory === category
                              ? "bg-royal-blue text-white"
                              : "dark:bg-shark bg-titan-white/50"
                          }`}
                onPress={() => {
                  setSelectedCategory(category);
                }}
              >
                {category}
              </Text>
            ))}
          </View>
        </View>

        <View className="gap-2 mt-8">
          <Text className="dark:text-gray-suit text-gray-500 font-semibold text-sm">
            ICON
          </Text>
          <View className="flex-row gap-6 items-center">
            {Object.values(CATEGORY_KEY).map((category) => (
              <View
                key={category}
                className={`dark:bg-shark3 bg-shark3/10 p-2 rounded-lg
${selectedCategory === category ? "border border-royal-blue/70 dark:border-royal-blue" : ""}`}
              >
                <Image
                  source={{ uri: MAP_CATEGORY_TO_ICON[category] }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            ))}
          </View>
        </View>

        <View className="gap-2 mt-8">
          <Text className="dark:text-gray-suit text-gray-500 font-semibold text-sm">
            DATE
          </Text>
          <TextInput
            className="h-16 p-4 text-[1.6rem] font-bold dark:bg-shark bg-titan-white/50 
            rounded-xl text-black dark:text-melrose"
            value={date}
            onChangeText={setDate}
          />
        </View>

        <Pressable
          onPress={handleAddExpense}
          className="rounded-xl overflow-hidden active:opacity-80 mt-14"
        >
          <LinearGradient
            colors={["#C5C0FF", "#5A4FCF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text className="text-center text-white font-medium text-[20px]">
              {paramsId ? "Update Expense" : "Add Expense"}
            </Text>
          </LinearGradient>
        </Pressable>

        {loading ? (
          <Modal visible={loading} transparent>
            <View className="flex-1 justify-center items-center bg-black/50">
              <ActivityIndicator size="large" color="white" />
            </View>
          </Modal>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddScreen;
