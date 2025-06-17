import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import { Button, Image, Text, TextInput, View } from 'react-native';

type RootStackParamList = {
  '(tabs)': undefined;
};

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <LinearGradient
        colors={['#3d7cff', '#2bbaff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className='h-[200px] flex justify-center items-center'
      >
        <Image 
          source={require('../assets/images/logo.png')} 
          className='w-[120px] h-[120px]'
        />
      </LinearGradient>
      <View className='flex-1 bg-white rounded-t-[24px] -mt-8'>
        <Text className='text-[24px] font-bold ml-6 mt-6 mr-6'>欢迎使用Yunsoo</Text>
        <TextInput
          placeholder='请输入邮箱'
          className='border border-gray-300 rounded-md p-2 m-6 block'
          focusable
        />
        <TextInput
          placeholder='请输入密码'
          className='border border-gray-300 rounded-md p-2 m-6 block'
          focusable
        />
        <Button
          title='登录'
          color="#3b82f6"
        />
      </View>
    </>
  )
}
