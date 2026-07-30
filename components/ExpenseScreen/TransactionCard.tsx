import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { IExpenseCategory, IExpenseItem } from '@/store/useExpenseStore.types'
import { IndexedExtraConfigType } from 'drizzle-orm/gel-core'
import { MAP_CATEGORY_TO_ICON } from '@/utils/constants'

const TransactionCard = ({
    expense, 
    handleUpdate, 
    handleDelete
} : {
    expense: IExpenseItem,
    handleUpdate: (value: IExpenseItem) => void;
    handleDelete: (id: string) => void
}) => {
  return (
    <View className='flex-row justify-between items-start overflow-x-scroll'>
      <View className="flex-row items-start gap-4">
        <View className='dark:bg-shark3 bg-shark3/10 p-2 rounded-lg'>
            <Image source={{uri: MAP_CATEGORY_TO_ICON[expense.category] }} style={{ width: 20 , height:20}} 
            />
        </View>

         <View className='gap-0.5'>
            <Text className=' text-base font-semibold dark:text-white w-46'>
                {expense.title}
            </Text>
            <Text className=' text-gun-powder dark:text-gray-suit '>
            {new Date(expense.expenseDate).toLocaleString("en-IN", {
                month:"short"
            })}
            {", "}
            {expense.category}
            </Text>
            <Text className='text-base font-semibold dark:text-melrose'>
            ${expense.amount}
            </Text>
         </View>
      </View>

      <View className="items-end">
              <View className=" flex-row gap-2">
                <Pressable 
                onPress={() => handleUpdate(expense)}
                className="px-4 py-1.5 rounded-full bg-green-150 dark:bg-melrose active:opacity-60"
                >
                  <Text className="text-green-800 dark:text-black text-sm font-medium">
                    Edit
                    </Text>
                </Pressable>

                <Pressable 
                onPress={() => handleDelete(expense.id)}
                className="px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-400 active:opacity:60"
                >
                  <Text className=" text-red-800 dark:text-black text-sm font-medium">
                    Delete
                    </Text>
                </Pressable>
              </View>
      </View>
    </View>
  )
}

export default TransactionCard