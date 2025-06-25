import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomeScreen() {
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
          style={{ height: 80, paddingTop: Platform.OS === 'ios' ? 44 : 24 }}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20,
            marginLeft: 16
          }}>
            Yunsoo云梳
          </Text>
        </LinearGradient>
        
        <ScrollView 
          style={{ flex: 1}}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={true}
        >
          <LinearGradient
            colors={['#2a6fff', '#3e7dff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 120 }}
          >
          </LinearGradient>

          <View style={{
            width: 380,
            height: 148,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
            borderRadius: 10,
            marginTop: -110,
          }}
          >
            <Image
              source={{ uri: 'https://www.wangle.run/yunsoo_wrap/yunsoo_banner.png' }}
              style={{
                width: 380,
                height: 148,
                overflow: 'hidden',
                borderRadius: 10,
              }}
              resizeMode='contain'
            />
          </View>

          {/* nav */}
          <View style={{
            width: 380,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
            marginTop: 18,
          }}>
            <View>
              <LinearGradient
                colors={['#07b0f8', '#43d7fd']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  marginBottom: 6
                }}>
                <MaterialIcons
                  name='inventory'
                  size={28}
                  color='white'
                  style={{ textAlign: 'center', lineHeight: 64 }}
                />
              </LinearGradient>
              <Text style={{ fontSize: 14, color: '#333', textAlign: 'center' }}>库存管理</Text>
            </View>
            <View>
              <LinearGradient
                colors={['#8e69fc', '#a98df3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  marginBottom: 6
                }}>
                <Ionicons
                  name="shield-checkmark"
                  size={32}
                  color="white"
                  style={{ textAlign: 'center', lineHeight: 64 }}
                />
              </LinearGradient>
              <Text style={{ fontSize: 14, color: '#333', textAlign: 'center' }}>巡检记录</Text>
            </View>
            <View>
              <LinearGradient
                colors={['#f9b31a', '#ffe12e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  marginBottom: 6,
                }}>
                <Ionicons
                  name='book'
                  size={32}
                  color='white'
                  style={{ textAlign: 'center', lineHeight: 64 }}
                />
              </LinearGradient>
              <Text style={{ fontSize: 14, color: '#333', textAlign: 'center' }}>知识库</Text>
            </View>

            <View>
              <LinearGradient
                colors={['#fe8312', '#ffb302']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  marginBottom: 6,
                }}>
                <MaterialCommunityIcons
                  name='account-group'
                  size={32}
                  color='white'
                  style={{ textAlign: 'center', lineHeight: 64 }}
                />
              </LinearGradient>
              <Text style={{ fontSize: 14, color: '#333', textAlign: 'center' }}>人员管理</Text>
            </View>
          </View>

          {/* 统计 */}
          <View style={{
            width: 380,
            alignSelf: 'center',
            marginTop: 30,
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', textAlign: 'left', marginBottom: 6, }}>工单信息</Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: 380,
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
              <LinearGradient
                colors={['#4878ff', '#5e89fe']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: '48%',
                  height: 90,
                  borderRadius: 10,
                  marginBottom: 16,
                }}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                  paddingLeft: 20
                }}>
                  <Entypo name="pie-chart" size={40} color="white" style={{ opacity: 0.8, marginRight: 12 }} />
                  <View style={{ display: 'flex' }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>123</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>总计数量</Text>
                  </View>
                </View>
              </LinearGradient>
              <LinearGradient
                colors={['#14e2af', '#02dd9c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: '48%',
                  height: 90,
                  borderRadius: 10,
                  marginBottom: 16
                }}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                  paddingLeft: 20
                }}>
                  <AntDesign name="checkcircle" size={40} color="white" style={{ opacity: 0.8, marginRight: 12 }} />
                  <View style={{ display: 'flex' }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>123</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>已完成</Text>
                  </View>
                </View>
              </LinearGradient>
              <LinearGradient
                colors={['#fe6f89', '#ff9a96']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: '48%',
                  height: 90,
                  borderRadius: 10,
                  marginBottom: 16
                }}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                  paddingLeft: 20
                }}>
                  <Ionicons name="reload-circle" size={50} color="white" style={{ opacity: 0.8, marginRight: 12 }} />
                  <View style={{ display: 'flex' }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>123</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>未完成</Text>
                  </View>
                </View>
              </LinearGradient>
              <LinearGradient
                colors={['#fea926', '#ffb631']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: '48%',
                  height: 90,
                  borderRadius: 10,
                  marginBottom: 16
                }}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                  paddingLeft: 20
                }}>
                  <AntDesign name="pausecircle" size={40} color="white" style={{ opacity: 0.8, marginRight: 12 }} />
                  <View style={{ display: 'flex' }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>123</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>未完成</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* 资产设备 */}
          <View style={{
            width: 380,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 50,
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', textAlign: 'left', marginBottom: 6, }}>资产统计</Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: 380,
            }}>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>电脑: 2</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>笔记本: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>服务器: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>交换机: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>打印机: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>路由器: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>手机: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>键盘/鼠标: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>显示器: 20</Text>
              <Text style={{ width: '25%', fontSize: 14, color: '#333', marginBottom: 15}}>其他: 20</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}


