import { useExpenseStore } from "@/store/useExpenseStore";
import { useAuth } from "@clerk/clerk-expo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Redirect } from "expo-router";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
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
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Stats</Label>
        <Icon
          src={<VectorIcon family={MaterialCommunityIcons} name="chart-bar" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="expenses">
        <Label>Expenses</Label>
        <Icon
          src={
            <VectorIcon family={MaterialCommunityIcons} name="credit-card" />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="add">
        <Label>Add</Label>
        <Icon
          src={
            <VectorIcon family={MaterialCommunityIcons} name="plus-circle" />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon
          src={<VectorIcon family={MaterialCommunityIcons} name="account" />}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
