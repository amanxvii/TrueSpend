import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple",
  ) => {
    if (loadingStrategy) return; // will cancel the running flow when Another flow is Started
    setLoadingStrategy(strategy);

    console.log("Starting Social Auth Flow for strategy:", strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in incomplete",
          "Problem Completing Sign-In, Try again.",
        );
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error In Social Auth, error");
      Alert.alert("Error Failed Signing-In. Try Again");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
