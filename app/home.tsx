import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';

type RootStackParamList = {
  '(tabs)': undefined;
};

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')

  const changeWatchEamil = (text: string) => {
    setEmail(text)
  }

  const showToast = (message: string) => {
    console.log(Platform.OS)
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('提示', message);
    }
  };

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
        {isLogin? (
          
          <View className='mt-6'>
            <View className='relative h-[44px] w-[360px] mx-auto mb-6'>
              <TextInput
                placeholder='请输入邮箱'
                className='border border-gray-300 rounded-md p-2 block text-[15px] h-[44px] w-full'
                focusable
                onChangeText={changeWatchEamil}
                value={email}
              />
              <AntDesign 
                name="closecircle" 
                size={16} 
                color="#555"
                style={{
                  position: 'absolute', 
                  right: 12, 
                  top: '50%', 
                  transform: [{ translateY: -8 }]
                }}
              />
            </View>

            <View className='relative h-[44px] w-[360px] mx-auto mb-6'>
              <TextInput
                placeholder='请输入密码'
                className='border border-gray-300 rounded-md p-2 block text-[15px] h-[44px] w-full'
                focusable
                secureTextEntry
              />
              <AntDesign 
                name="closecircle" 
                size={16} 
                color="#555"
                style={{
                  position: 'absolute', 
                  right: 12, 
                  top: '50%', 
                  transform: [{ translateY: -8 }]
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => showToast('操作成功！')}
              className='
              bg-blue-500 
              w-[368px] 
              h-[44px] 
              flex
              items-center 
              justify-center 
              rounded-[10px]
              mx-auto'
            >
              <Text className='text-white text-[15px] font-bold'>登 录</Text>
            </TouchableOpacity>
            
            <View className='flex flex-row justify-center items-center mt-4'>
              <Text className='text-[15px] text-gray-500'>没有账号？</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text 
                  className='text-[15px] 
                  text-blue-500'
                  onPress={() => setIsLogin(false)}
                >
                  立即注册
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TextInput
              placeholder='请输入邮箱'
              className='border border-gray-300 rounded-md p-2 m-6 block text-[15px] h-[44px]'
              focusable
            />
            
            <TextInput
              placeholder='请输入密码'
              className='border border-gray-300 rounded-md p-2 m-6 block text-[15px] h-[44px] -mt-[3px]'
              focusable
              secureTextEntry
            />
            <TextInput
              placeholder='请输入公司名'
              className='border border-gray-300 rounded-md p-2 m-6 block text-[15px] h-[44px] -mt-[3px]'
              focusable
            />
            <TextInput
              placeholder='请输入用户名'
              className='border border-gray-300 rounded-md p-2 m-6 block text-[15px] h-[44px] -mt-[3px]'
              focusable
            />
            <TouchableOpacity
              onPress={() => {}}
              className='
              bg-blue-500 
              w-[368px] 
              h-[44px] 
              flex
              items-center 
              justify-center 
              rounded-[10px]
              mx-auto'
            >
              <Text className='text-white text-[15px] font-bold'>立即注册</Text>
            </TouchableOpacity>
            <View className='flex flex-row justify-center items-center mt-4'>
              <Text className='text-[15px] text-gray-500'>已有账号？</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text 
                  className='text-[15px] 
                  text-blue-500'
                  onPress={() => setIsLogin(true)}
                >
                  去登录
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        
      </View>
    </>
  )
}
