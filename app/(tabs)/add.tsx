import { View, Text, ScrollView, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import SafeAreaView from '@/components/SafeAreaView'
import { LinearGradient } from 'expo-linear-gradient'
import { CATEGORIES, CATEGORY_KEY, MAP_CATEGORY_TO_ICON } from '@/utils/constants'

const AddExpenses = () => {
  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [date, setDate] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!amount.trim()) {
      setError('Please enter an amount')
      return
    }
    if (!title.trim()) {
      setError('Please enter a title')
      return
    }
    if (!selectedCategory) {
      setError('Please select a category')
      return
    }
    if (!date.trim()) {
      setError('Please select a date')
      return
    }

    setError(null)
    
    console.log({ amount, title, category: selectedCategory, date })
  }

  return (
    <SafeAreaView className="flex-1 dark:bg-cinder bg-magnolia">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Amount */}
        <View className="items-center justify-center mt-5">
          <Text className="dark:text-gray-suit text-gray-500 font-semibold text-sm">
            ENTER AMOUNT
          </Text>
          <View className="flex-row items-center mt-4 gap-6 w-[95%]">
            <Text className="text-[3rem] font-bold dark:text-white text-royal-blue">
              $
            </Text>
            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              className="text-[3.75rem] w-[85%] font-bold text-black dark:text-melrose"
            />
          </View>
        </View>

        {/* Title */}
        <View>
          <Text className="text-sm dark:text-white text-black font-bold">
            TITLE
          </Text>
          <View className="dark:bg-shark2 bg-royal-blue rounded-xl px-4 py-1 shadow-xl mt-2">
            <TextInput
              placeholder="Expense"
              value={title}
              onChangeText={setTitle}
              className="text-[1.25rem] w-[85%] font-medium text-black dark:text-melrose"
            />
          </View>
        </View>

        {/* Category */}
        <View className="mt-6">
          <Text className="dark:text-white text-black text-sm font-bold">
            CATEGORY
          </Text>
          <View className="flex-row flex-wrap gap-2 mt-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full ${
                    isSelected ? 'bg-royal-blue' : 'dark:bg-shark2 bg-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium text-sm ${
                      isSelected ? 'text-white' : 'dark:text-gray-suit text-gray-600'
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Icon (derived from selected category) */}
        <View className="mt-6">
          <Text className="dark:text-white text-black text-sm font-bold">
            ICON
          </Text>
          <View className="flex-row gap-3 mt-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`w-12 h-12 rounded-full items-center justify-center dark:bg-shark2 bg-gray-200 ${
                    isSelected ? 'border-2 border-royal-blue' : ''
                  }`}
                >
                  <Image
                    source={{ uri: MAP_CATEGORY_TO_ICON[cat] }}
                    style={{ width: 24, height: 24 }}
                    resizeMode="contain"
                  />
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Date */}
        <View className="mt-6">
          <Text className="dark:text-white text-black text-sm font-bold">
            DATE
          </Text>
          <View className="dark:bg-shark2 bg-gray-100 rounded-xl px-4 py-3 mt-2">
            <TextInput
              placeholder="DD-MM-YYYY"
              value={date}
              onChangeText={setDate}
              className="text-base font-medium text-black dark:text-white"
            />
          </View>
        </View>

        {/* Error message */}
        {error && (
          <Text className="text-red-500 text-sm font-medium mt-3 text-center">
            {error}
          </Text>
        )}

        {/* Submit */}
        <Pressable className="mt-6" onPress={handleSubmit}>
          <LinearGradient
            colors={['#6D5DF6', '#8B7CFA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 16, paddingVertical: 16 }}
          >
            <Text className="text-white text-center font-bold text-base">
              Add Expense
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddExpenses