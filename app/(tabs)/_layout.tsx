import { useExpenseStore } from "@/store/useExpenseStore";
import { useAuth } from "@clerk/expo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Redirect } from "expo-router";
import {
  NativeTabs,
} from "expo-router/unstable-native-tabs";
import { useEffect } from "react";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const { fetchExpenses } = useExpenseStore();
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <NativeTabs labelVisibilityMode="labeled">
        <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        </NativeTabs.Trigger>

       <NativeTabs.Trigger name="expenses">
      <NativeTabs.Trigger.Label>Expense</NativeTabs.Trigger.Label>
      <NativeTabs.Trigger.Icon sf="list.bullet" md="list"/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="add">
      <NativeTabs.Trigger.Label>Add</NativeTabs.Trigger.Label>
      <NativeTabs.Trigger.Icon sf="plus.circle.fill" md="add_circle" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
      <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      <NativeTabs.Trigger.Icon sf="person.fill" md="person_book" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
