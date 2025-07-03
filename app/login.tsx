import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { LoginForm } from '../lib/dbtype';
import { supabase } from '../lib/initSupabase';
import { getIsLoginSession } from '../lib/pubFunction';
export default function Home() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
    company_name: '',
    user_name: ''
  })

  const verifyLoginForm = async () => {
    if (loginForm.email === '') {
      Alert.alert('请输入邮箱')
      return false
    } else if (loginForm.password === '') {
      Alert.alert('请输入密码')
      return false
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password
    })
    if (error) {
      // Alert.alert(error.message)
      setLoginForm({ ...loginForm, password: '', email: '' })
    } else if (data.session) {
      router.replace('/(tabs)')
    }
  }

  const checkLoginSession = async () => {
    const mySession = await getIsLoginSession()
    if (mySession) {
      router.replace('/(tabs)')
    }
  }

  useEffect(() => {
    checkLoginSession()
  }, [])
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#2a6fff', '#3e7dff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('../assets/images/system_logo_white.png')}
          style={{ width: 160 }}
          resizeMode="contain"
        />
      </LinearGradient>

      <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -32, padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 24 }}>欢迎使用Yunsoo</Text>
        {isLogin ? (
          <View>
            <TextInput
              placeholder='请输入邮箱'
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 6,
                padding: 12,
                fontSize: 15,
                height: 44,
                marginBottom: 16
              }}
              onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
              value={loginForm.email}
              focusable
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              editable={true}
              selectTextOnFocus={true}
            />

            <TextInput
              placeholder='请输入密码'
              secureTextEntry
              value={loginForm.password}
              onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 6,
                padding: 12,
                fontSize: 15,
                height: 44,
                marginBottom: 24
              }}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              editable={true}
              selectTextOnFocus={true}
            />

            <TouchableOpacity
              onPress={verifyLoginForm}
              style={{
                backgroundColor: '#3b82f6',
                height: 44,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginBottom: 16
              }}
            >
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>登 录</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, color: '#6b7280' }}>没有账号？</Text>
              <TouchableOpacity onPress={() => setIsLogin(false)}>
                <Text style={{ fontSize: 15, color: '#3b82f6', marginLeft: 4 }}>
                  立即注册
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TextInput
              placeholder='请输入邮箱123'
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 6,
                padding: 12,
                fontSize: 15,
                height: 44,
                marginBottom: 16
              }}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              editable={true}
              selectTextOnFocus={true}
            />

            <TextInput
              placeholder='请输入密码'
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 6,
                padding: 12,
                fontSize: 15,
                height: 44,
                marginBottom: 16
              }}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              editable={true}
              selectTextOnFocus={true}
            />

            <TextInput
              placeholder='请输入公司名'
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 6,
                padding: 12,
                fontSize: 15,
                height: 44,
                marginBottom: 16
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              editable={true}
              selectTextOnFocus={true}
            />

            <TextInput
              placeholder='请输入用户名'
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 6,
                padding: 12,
                fontSize: 15,
                height: 44,
                marginBottom: 24
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              editable={true}
              selectTextOnFocus={true}
            />

            <TouchableOpacity
              onPress={() => verifyLoginForm()}
              style={{
                backgroundColor: '#3b82f6',
                height: 44,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginBottom: 16
              }}
            >
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>立即注册</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, color: '#6b7280' }}>已有账号？</Text>
              <TouchableOpacity onPress={() => setIsLogin(true)}>
                <Text style={{ fontSize: 15, color: '#3b82f6', marginLeft: 4 }}>
                  去登录
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

    </KeyboardAvoidingView>
  )
}
