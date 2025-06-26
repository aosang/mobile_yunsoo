import { supabase } from '@/lib/initSupabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
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
            <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>MilesWang</Text>
          </View>
          
          {/* <Button title="退出登录" onPress={getSignOut} /> */}
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

