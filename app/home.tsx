import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')

  const changeWatchEamil = (text: string) => {
    setEmail(text)
  }

  const showToast = (message: string) => {
    Alert.alert('提示', message);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <View style={{ height: 200, backgroundColor: '#3d7cff', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Yunsoo</Text>
        </View>
        
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
                onChangeText={changeWatchEamil}
                value={email}
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
                  marginBottom: 24
                }}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                editable={true}
                selectTextOnFocus={true}
              />

              <TouchableOpacity
                onPress={() => showToast('操作成功！')}
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
                onPress={() => showToast('注册成功！')}
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
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
