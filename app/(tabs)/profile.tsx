import { supabase } from '@/lib/initSupabase';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const router = useRouter()
  
  const getSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/home')
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <LinearGradient
          colors={['#2a6fff', '#3e7dff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 200 }}
        >
          <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <Image 
              source={{ uri: 'https://www.wangle.run/company_icon/public_image/pub_avatar.jpg' }} 
              style={{ width: 70, height: 70, borderRadius: 100, marginTop: 40 }} 
            />
            <Text style={{ color: 'white', fontSize: 18, marginTop: 10 }}>MilesWang</Text>
          </View>
          
          {/* <Button title="退出登录" onPress={getSignOut} /> */}
        </LinearGradient>
        <View style={{
          width: 380, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          marginHorizontal: 20,
          marginTop: 10
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 52,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}>
            <View style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center' 
            }}>
              <MaterialIcons name="email" size={18} color="#333" style={{ marginRight: 4 }} />  
              <Text style={{ color: '#333', fontSize: 14 }}>注册邮箱</Text>
            </View>
            <Text style={{ color: '#333', fontSize: 14 }}>mileswang@gmail.com</Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 52,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}>
            <View style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center' 
            }}>
              <FontAwesome5 name="user-alt" size={18} color="#333" style={{ marginRight: 4 }} />  
              <Text style={{ color: '#333', fontSize: 14 }}>用户名</Text>
            </View>
            <Text style={{ color: '#333', fontSize: 14 }}>MilesWang</Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 52,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}>
            <View style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center' 
            }}>
              <MaterialIcons name="info" size={18} color="#333" style={{ marginRight: 4 }} />  
              <Text style={{ color: '#333', fontSize: 14 }}>公司名</Text>
            </View>
            <Text style={{ color: '#333', fontSize: 14 }}>AACBBC</Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity onPress={getSignOut}>
              <LinearGradient
                colors={['#2a6fff', '#3e7dff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 12,
                  borderRadius: 10
                }}
              >
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>退出登录</Text>
              </LinearGradient>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

