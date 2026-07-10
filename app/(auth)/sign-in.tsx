import { Text, View, } from "react-native";
import { Image, Pressable } from "react-native";
import SafeAreaView from "../../components/SafeAreaView";
import useSocialAuth from "../../hooks/useSocialAuth";
import {OAUTH} from "../../utils/constants"
import {FontAwesome} from "@expo/vector-icons"
const SignInScreen = () => {

  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === OAUTH.GOOGLE_OAUTH;
  const isGithubClicked = loadingStrategy === OAUTH.OAUTH_GITHUB;
  const isAppleClicked = loadingStrategy === OAUTH.OAUTH_APPLE;

  const isLoading = isGoogleClicked || isGithubClicked || isAppleClicked

  return (
    <SafeAreaView className="bg-magnolia dark:bg-cinder flex-1" edges={["top"]} >
      <View className="px-6 pt-12">
        <Text className= "text-center text-5xl font-extrabold tracking-tight text-gun-powder dark:text-athens-gray uppercase font-mono">
          TrueSpend
          </Text>
          <Text className ="mt-1 text-center text-[14px] text-ebony dark:text-gray-suit">
            Sign In To Access Your Financial Vault
          </Text>

      <View className="flex items-center justify-center mt-20">
        <Image source={require("../../assets/images/wallet.webp")}/>
      </View>
      </View>

      <View 
      className="dark:bg-gray-suit/10 bg-white flex-1 rounded-t-[36px] px-6 pb-8 pt-6 mt-20">
        <View 
        className="self-center rounded-full dark:bg-magnolia/10 px-3 py-1">
          <Text 
          className="text-xs font-semibold rounded-full uppercase tracking-[1px]
          dark:text-athens-gray text-gun-powder">
            Welcome Back
            </Text>
        </View>
        <Text className="mt-2 text-center text-sm leading-6 dark:text-white/80 text-gray-500"> 
        Select a Sign-in option below to continue and securely access your Account
        </Text>

      <View className="mt-6">
      <Pressable 
      className={`mb-3 h-14 flex-row items-center 
      rounded-2xl border dark:border border-gray-300 px-4 active:opacity-90
      ${isLoading ? "opacity-70" : ""}`}
      disabled={isLoading}
      onPress={() => handleSocialAuth("oauth_google")}
      >
        <View
        className="w-8 h-8 items-center justify-center
        rounded-full bg-white"
        >
          <Image
          source={require("@/assets/images/google.png")}
          style={{width:20,height:20}}
          />
        </View>
         
         <Text 
         className="ml-3 flex-1 text-lg font-semibold dark:text-white">
          {isGoogleClicked ? "Connecting Google" : "Continue With Google"}
         </Text> 

         <FontAwesome name="angle-double-right" size={18} color="#5f6"/>
      </Pressable>

      <Pressable
      className={`mb-3 h-14 flex-row items-center
      rounded-2xl border dark:border border-gray-300 px-4 active:opacity-90
      ${isLoading ? "opacity-70" : ""}`}
      disabled={isLoading}
      onPress={() => handleSocialAuth("oauth_github")}
      >
        <View
        className="w-8 h-8 items-center justify-center rounded-full bg-white"
        >
          <FontAwesome name="github" size={28} color="#111"/>
        </View>

        <Text
        className="ml-3 flex-1 text-lg font-semibold dark:text-white">
          {isGithubClicked ? "Connecting With Github" : "Continue With Github"}
          </Text>

        <FontAwesome name="angle-double-right" size={18} color="#5f6"/>
      </Pressable>

      <Pressable
      className={`mb-3 h-14 flex-row items-center dark:bg-white/95 bg-cinder
      rounded-2xl border dark:border border-gray-300 px-4 active:opacity-90
      ${isLoading ? "opacity-70" : ""}`}
      disabled={isLoading}
      onPress={() => handleSocialAuth("oauth_apple")}
      >
        <View
        className="w-8 h-8 items-center justify-center rounded-full bg-white"
        >
          <FontAwesome name="apple" size={25} color="#111"/>
        </View>

        <Text
        className="ml-3 flex-1 text-lg font-semibold dark:text-black text-white">
          {isAppleClicked ? "Connecting With Apple" : "Continue With Apple"}
        </Text>

        <FontAwesome name="angle-double-right" size={18} color="#5f6e66"/>
      </Pressable>
      </View>

      <Text
      className="mt-3 text-center text-sm leading-5 dark:text-white/50 text-gray-500">By continuing, you agree to our Terms and Privacy Policy</Text>
      </View>   
    </SafeAreaView>
  );
};

export default SignInScreen;
