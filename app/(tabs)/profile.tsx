import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { useUser, useAuth } from '@clerk/expo';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator />
      </View>
    );
  }

  const hasChanges =
    firstName !== (user?.firstName ?? '') || lastName !== (user?.lastName ?? '');

  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);
      await user.update({ firstName, lastName });
    } catch (err: any) {
      console.log('Profile update error:', err?.message ?? err);
      Alert.alert('Update failed', err?.errors?.[0]?.message ?? err?.message ?? 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Allow photo access to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.canceled || !user) return;

    try {
      setUploadingImage(true);
      const asset = result.assets[0];

      // RN's fetch().blob() doesn't reliably survive Clerk's multipart upload,
      // so we read the file as base64 and send it as a data URI instead.
      const base64 = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await user.setProfileImage({
        file: `data:image/jpeg;base64,${base64}`,
      });
    } catch (err: any) {
      console.log('Profile image update error:', err?.message ?? err);
      Alert.alert('Upload failed', err?.errors?.[0]?.message ?? err?.message ?? 'Could not update photo.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <ScrollView
      className="flex-1 dark:bg-cinder bg-white"
      contentContainerStyle={{ padding: 20, paddingTop: Platform.OS === 'ios' ? 60 : 40 }}
    >
      <Text className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        Profile
      </Text>

      {/* Avatar */}
      <Pressable onPress={handlePickImage} className="self-center mb-8">
        <View className="w-24 h-24 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 items-center justify-center">
          {uploadingImage ? (
            <ActivityIndicator />
          ) : user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} className="w-24 h-24" />
          ) : (
            <Text className="text-3xl text-neutral-500">
              {firstName?.[0]?.toUpperCase() ?? '?'}
            </Text>
          )}
        </View>
        <Text className="text-center text-sm text-blue-500 mt-2">Change photo</Text>
      </Pressable>

      {/* Editable fields */}
      <View className="mb-4">
        <Text className="text-sm text-neutral-500 mb-1">First name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          className="border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-neutral-900 dark:text-white"
          placeholder="First name"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm text-neutral-500 mb-1">Last name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          className="border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-neutral-900 dark:text-white"
          placeholder="Last name"
        />
      </View>

      {/* Read-only email */}
      <View className="mb-6">
        <Text className="text-sm text-neutral-500 mb-1">Email</Text>
        <Text className="px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-500">
          {email}
        </Text>
      </View>

      <Pressable
        onPress={handleSave}
        disabled={!hasChanges || saving}
        className={`rounded-xl py-3 items-center mb-3 ${
          hasChanges ? 'bg-blue-500' : 'bg-neutral-300 dark:bg-neutral-800'
        }`}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Save changes</Text>
        )}
      </Pressable>

      <Pressable
        onPress={handleSignOut}
        className="rounded-xl py-3 items-center border border-red-500"
      >
        <Text className="text-red-500 font-semibold">Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}
