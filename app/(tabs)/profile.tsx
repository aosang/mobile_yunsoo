import { UserInfoProps } from '@/lib/dbtype';
import { supabase } from '@/lib/initSupabase';
import { getProfiles, getSession } from '@/lib/pubFunction';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const getSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const getMyProfileInfo = async () => {
    const sessionInfo = await getSession()
    const profileInfo = await getProfiles(sessionInfo?.user.id as string)
    setAvatarUrl(profileInfo[0]?.avatar_url)
    let formData = {
      email: sessionInfo?.user.email,
      company: sessionInfo?.user.user_metadata.company,
      username: sessionInfo?.user.user_metadata.username,
      time: dayjs(profileInfo[0]?.created_at).format('YYYY-MM-DD HH:mm:ss')
    }
    setUserInfo(formData as UserInfoProps)
  }

  useEffect(() => {
    getMyProfileInfo()
  }, [])
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
              source={{ uri: avatarUrl || 'https://www.wangle.run/company_icon/public_image/pub_avatar.jpg' }} 
              style={{ width: 70, height: 70, borderRadius: 100, marginTop: 40 }} 
            />
            <Text style={{ color: 'white', fontSize: 18, marginTop: 10 }}>{userInfo?.username}</Text>
          </View>
          
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
            <Text style={{ color: '#333', fontSize: 14 }}>{userInfo?.email}</Text>
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
              <MaterialCommunityIcons name="office-building" size={18} color="#333" style={{ marginRight: 4 }} />
              <Text style={{ color: '#333', fontSize: 14 }}>公司名</Text>
            </View>
            <Text style={{ color: '#333', fontSize: 14 }}>{userInfo?.company}</Text>
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
              <MaterialIcons name="access-time-filled" size={18} color="#333" style={{ marginRight: 4 }} />
              <Text style={{ color: '#333', fontSize: 14 }}>注册时间</Text>
            </View>
            <Text style={{ color: '#333', fontSize: 14 }}>{userInfo?.time}</Text>
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
              <Entypo name="book" size={18} color="#333" style={{ marginRight: 4 }} />
              <Text style={{ color: '#333', fontSize: 14 }}>版本记录</Text>
            </View>
            <Text style={{ color: '#333', fontSize: 14 }}>1.0.0</Text>
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

