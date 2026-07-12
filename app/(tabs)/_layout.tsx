import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import {NativeTabs, Icon, Label, VectorIcon} from "expo-router/unstable-native-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  } 

  return <NativeTabs>
    <NativeTabs.Trigger name="index">
      <Label>Stats</Label>
      <Icon 
      src={<VectorIcon family={MaterialCommunityIcons} name="chart-bar" />}
      />
    </NativeTabs.Trigger>

    <NativeTabs.Trigger name="expenses">
      <Label>Expenses</Label>
      <Icon
      src={<VectorIcon family={MaterialCommunityIcons} name="credit-card"/>}
      />
    </NativeTabs.Trigger>

    <NativeTabs.Trigger name="add">
      <Label>Add</Label>
      <Icon
      src={<VectorIcon family={MaterialCommunityIcons} name="plus-circle"/>}/>
    </NativeTabs.Trigger>

    <NativeTabs.Trigger name="profile">
      <Label>Profile</Label>
      <Icon
      src={<VectorIcon family={MaterialCommunityIcons} name="account"/>}/>
  
    </NativeTabs.Trigger>

  </NativeTabs>
}