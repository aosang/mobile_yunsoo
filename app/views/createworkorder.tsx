import { getHeaderStyle } from "@/lib/commonFunction";
import { getDeviceList } from "@/lib/pubFunction";
import { getWorkBrand, getWorkOrderStatus, getWorkOrderType } from "@/lib/pubWorkOrder";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Brand {
  id: string | number;
  value: string;
}

// 自定义选择器组件
const CustomPicker = ({ 
  value, 
  onValueChange, 
  placeholder, 
  items, 
  style 
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  items: Array<{label: string; value: string}>;
  style?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedItem = items.find(item => item.value === value);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          paddingVertical: 12,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 44,
        }}
      >
        <Text style={{ 
          fontSize: 14, 
          color: selectedItem ? '#000' : '#999',
          flex: 1 
        }}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={{ fontSize: 16, color: '#333' }}>▼</Text>
      </TouchableOpacity>
      
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '50%'
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>请选择</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text style={{ fontSize: 16, color: '#007AFF' }}>取消</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsOpen(false);
                  }}
                  style={{
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f0f0f0'
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    color: item.value === value ? '#007AFF' : '#000'
                  }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function CreateWorkOrder() {
  const [myValue, setMyValue] = useState('');
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
            <Text>请选择设备：</Text>
            <View style={{ width: 180 }}>
              <CustomPicker
                value={myValue}
                onValueChange={(val) => setMyValue(val)}
                placeholder="请选择..."
                items={[
                  { label: '苹果', value: 'apple' },
                  { label: '香蕉', value: 'banana' },
                  { label: '橘子', value: 'orange' },
                ]}
              />
            </View>
            {/* {myValue ? <Text>你选择了：{myValue}</Text> : null} */}
          </View>
          {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>选择设备：</Text>
            <View style={{
              width: 180,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <PickerIOS
                selectedValue={selectedValue}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={{ 
                  width: 180, 
                  fontSize: 14, 
                  color: '#000',
                  backgroundColor: 'transparent',
                  opacity: 1,
                }}
                // dropdownIconColor="transparent"
                // dropdownIconRippleColor="transparent"
                // itemStyle={{ backgroundColor: 'transparent' }}
              >
                {deviceList.map((item: any) => (
                  <PickerIOS.Item label={item.product_name} value={item.id} key={`device-${item.id}`} />
                ))}
              </PickerIOS>
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
          </View> */}
          {/* 选择状态 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
            <Text>选择状态：</Text>
            <View style={{ width: 180 }}>
              <CustomPicker
                value={selectedStatus}
                onValueChange={(val) => setSelectedStatus(val)}
                placeholder="请选择状态..."
                items={workOrderStatus.map((item: any) => ({
                  label: item.value,
                  value: item.id
                }))}
              />
            </View>
          </View>
          {/* 选择设备类型 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
            <Text>设备类型：</Text>
            <View style={{ width: 180 }}>
              <CustomPicker
                value={selectedType}
                onValueChange={(val) => changeType(val)}
                placeholder="请选择类型..."
                items={workOrderType.map((item: any) => ({
                  label: item.value,
                  value: item.value
                }))}
              />
            </View>
          </View>
          {/* 选择品牌 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
            <Text>选择品牌：</Text>
            <View style={{ width: 180 }}>
              <CustomPicker
                value={selectedBrand}
                onValueChange={(val) => setSelectedBrand(val)}
                placeholder="请选择品牌..."
                items={workBrand.map((item: any) => ({
                  label: item.value,
                  value: item.id
                }))}
              />
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