import { getHeaderStyle } from "@/lib/commonFunction";
import { getDeviceList } from "@/lib/pubFunction";
import { getWorkBrand, getWorkOrderStatus, getWorkOrderType } from "@/lib/pubWorkOrder";
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Brand {
  id: string | number;
  value: string;
}

export default function CreateWorkOrder() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('电脑');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const [workOrderStatus, setWorkOrderStatus] = useState([]);
  const [workOrderType, setWorkOrderType] = useState([]);
  const [workBrand, setWorkBrand] = useState<Brand[]>([]);
  const getDeviceData = async () => {
    const data = await getDeviceList();
    setDeviceList(data as []);
  }

  const getWorkOrderStatusData = async () => {
    const data = await getWorkOrderStatus();
    setWorkOrderStatus(data as []);
  }

  const getWorkOrderTypeData = async () => {
    const data = await getWorkOrderType();
    setWorkOrderType(data as []);
  }

  const changeType = async (key: string) => {
    setSelectedType(key);
    
    const data = await getWorkBrand(key);
    if (!data?.[0]?.product_brand_cn) {
      setWorkBrand([]);
      return;
    }
    // 处理品牌数据
    const formattedBrands = data[0].product_brand_cn.map((brand: any) => ({
      id: brand.id,
      value: brand.value
    }));
    setWorkBrand(formattedBrands);
  }


  useEffect(() => {
    getHeaderStyle(navigation, "创建工单")
  }, [navigation])

  useEffect(() => {
    getDeviceData();
    getWorkOrderStatusData();
    getWorkOrderTypeData();
    changeType(selectedType);
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <View style={{ 
          backgroundColor: 'white', 
          width: 380, 
          alignSelf: 'center', 
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          display: 'flex',
          marginTop: 20,
          paddingHorizontal: 12,
          paddingVertical: 15
        }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>选择设备：</Text>
            <View style={{
              width: 180,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Picker
                mode="dialog"
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={{ 
                  width: 180, 
                  fontSize: 14, 
                  color: '#000',
                  backgroundColor: 'transparent',
                  opacity: 1,
                }}
                dropdownIconColor="transparent"
                dropdownIconRippleColor="transparent"
                itemStyle={{ backgroundColor: 'transparent' }}
              >
                {deviceList.map((item: any) => (
                  <Picker.Item label={item.product_name} value={item.id} key={`device-${item.id}`} style={{ fontSize: 14, color: '#000' }} />
                ))}
              </Picker>
              <View style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: '-50%'}],
                pointerEvents: 'none',
                backgroundColor: '#fff',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1
              }}>
                <Entypo name="chevron-right" size={16} color="#333" />
              </View>
            </View>
          </View>
          {/* 选择状态 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>选择状态：</Text>
            <View style={{
              width: 180,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Picker
                mode="dialog"
                selectedValue={selectedStatus}
                onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}
                style={{ 
                  width: 180, 
                  fontSize: 14, 
                  color: '#000',
                  backgroundColor: 'transparent',
                }}
                dropdownIconColor="transparent"
                dropdownIconRippleColor="transparent"
              >
                {workOrderStatus.map((item: any) => (
                  <Picker.Item label={item.value} value={item.id} key={`status-${item.id}`} style={{ fontSize: 14, color: '#000' }} />
                ))}
              </Picker>
              <View style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: '-50%'}],
                pointerEvents: 'none',
                backgroundColor: '#fff',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1
              }}>
                <Entypo name="chevron-right" size={16} color="#333" />
              </View>
            </View>
          </View>
          {/* 选择设备类型 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>设备类型：</Text>
            <View style={{
              width: 180,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Picker
                mode="dialog"
                selectedValue={selectedType}
                onValueChange={changeType}
                style={{ 
                  width: 180, 
                  fontSize: 14, 
                  color: '#000',
                  backgroundColor: 'transparent',
                }}
                dropdownIconColor="transparent"
                dropdownIconRippleColor="transparent"
              >
                {workOrderType.map((item: any) => (
                  <Picker.Item label={item.value} value={item.value} key={`type-${item.id}`} style={{ fontSize: 14, color: '#000' }} />
                ))}
              </Picker>
              <View style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: '-50%'}],
                pointerEvents: 'none',
                backgroundColor: '#fff',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1
              }}>
                <Entypo name="chevron-right" size={20} color="#333" />
              </View>
            </View>
          </View>
          {/* 选择品牌 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>选择品牌：</Text>
            <View style={{
              width: 180,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Picker
                mode="dialog"
                selectedValue={selectedBrand}
                onValueChange={(itemValue, itemIndex) => setSelectedBrand(itemValue)}
                style={{ 
                  width: 180, 
                  fontSize: 14, 
                  color: '#000',
                  backgroundColor: 'transparent',
                }}
                dropdownIconColor="transparent"
                dropdownIconRippleColor="transparent"
              >
                {workBrand.map((item: any) => (
                  <Picker.Item label={item.value} value={item.id} key={`brand-${item.id}`} style={{ fontSize: 14, color: '#000' }} />
                ))}
              </Picker>
              <View style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: '-50%'}],
                pointerEvents: 'none',
                backgroundColor: '#fff',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1
              }}>
                <Entypo name="chevron-right" size={20} color="#333" />
              </View>
            </View>
          </View>
          {/* 创建时间 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>创建时间：</Text>
            <View style={{
              width: 165,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Text>2025-01-01 12:00:00</Text>
            </View>
          </View>
          <View style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginTop: 4
          }}>
            <Text>更新时间：</Text>
            <View style={{
              width: 165,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Text>2025-01-01 12:00:00</Text>
            </View>
          </View>
          <View style={{width: '100%' , height: 1, backgroundColor: '#ccc', marginVertical: 15}}></View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{ marginBottom: 5 }}>问题描述：</Text>
            <TextInput style={{
              width: '100%', 
              minHeight: 100, 
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ccc',
              paddingHorizontal: 10,
              textAlignVertical: 'top',
            }} 
            placeholder="请输入问题描述"
            multiline
            numberOfLines={5}
            maxLength={260}
            />
          </View>

          <View style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
            <Text style={{ marginBottom: 5 }}>解决方案：</Text>
            <TextInput style={{
              width: '100%', 
              minHeight: 100, 
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ccc',
              paddingHorizontal: 10,
              textAlignVertical: 'top',
            }} 
            placeholder="请输入解决方案"
            multiline
            numberOfLines={5}
            maxLength={260}
            />
          </View>

          <View style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
            <Text style={{ marginBottom: 5 }}>其它备注：</Text>
            <TextInput style={{
              width: '100%', 
              minHeight: 60, 
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ccc',
              paddingHorizontal: 10,
              textAlignVertical: 'top',
            }} 
            placeholder="请输入备注"
            multiline
            numberOfLines={4}
            maxLength={120}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}