import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const router = useRouter()
  
  const getSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/home')
  }
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button title="退出登录" onPress={getSignOut} />
    </SafeAreaView>
  );
}

