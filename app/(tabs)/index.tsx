import { LinearGradient } from 'expo-linear-gradient';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView>
      <LinearGradient 
        colors={['#2a6fff', '#3e7dff']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 220 }}
      >
        <SafeAreaView>
          <Text style={{
            fontSize: 18, 
            fontWeight: 'bold', 
            color: 'white',
            marginTop: 10,
            marginLeft: 16
          }}>
            Yunsoo资产管理系统
          </Text>
          <View style={{ 
              width: 380, 
              height: 174, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              alignSelf: 'center',
              marginTop: 14,
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
              borderRadius: 10,
            }}
          >
            <Image 
              source={{uri: 'https://www.wangle.run/company_icon/public_image/myweb/yunsoo_banner.png'}}
              style={{ 
                width: 380, 
                height: 174, 
                overflow: 'hidden', 
                borderRadius: 10,
              }}
              resizeMode='contain'
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        flexWrap: 'wrap',
        width: 380,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 60,
      }}>
        <LinearGradient
          colors={['#4878ff', '#5e89fe']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: '48%', 
            height: 100, 
            borderRadius: 10,
            marginBottom: 16,
          }}>
        </LinearGradient>
        <LinearGradient
          colors={['#14e2af', '#02dd9c']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '48%', height: 100, borderRadius: 10, marginBottom: 16 }}>
        </LinearGradient>
        <LinearGradient
          colors={['#fea926', '#ffb631']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '48%', height: 100, borderRadius: 10, marginBottom: 16 }}>
        </LinearGradient>
        <LinearGradient
          colors={['#fe6f89', '#ff9a96']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '48%', height: 100, borderRadius: 10, marginBottom: 16 }}>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  )
}


