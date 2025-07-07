import { IconSymbol } from "@/components/ui/IconSymbol";
import { getHeaderStyle, getPublicTime } from "@/lib/commonFunction";
import { BrandProps, WorkOrderProps } from "@/lib/dbtype";
import { getDeviceList, getUserInfo } from "@/lib/pubFunction";
import { getInsertWorkOrder, getWorkBrand, getWorkOrderStatus, getWorkOrderType } from "@/lib/pubWorkOrder";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 自定义选择器组件
const CustomPicker = ({ 
  value, 
  onValueChange, 
  placeholder, 
  items, 
  icon,
  iconColor = '#333'
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  items: Array<{label: string; value: string}>;
  icon?: ReactNode;
  iconColor?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedItem = items.find(item => item.value === value);
  
  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsOpen(true)}
        style={{
          borderWidth: 0,
          borderRadius: 4,
          paddingVertical: 8,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 36,
        }}
      >
        <Text style={{ 
          fontSize: 14, 
          color: selectedItem ? '#000' : '#999',
          flex: 1 
        }}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        {icon ? (
          <View>
            {icon}
          </View>
        ) : (
          <Text style={{ fontSize: 16, color: iconColor }}>▼</Text>
        )}
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
                    handleValueChange(item.value);
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
  const router = useRouter()
  const navigation = useNavigation()
  const [workOrderForm, setWorkOrderForm] = useState<WorkOrderProps>(() => ({
    created_update: '',
    created_time: '',
    created_id: '',
    created_product: '',
    created_name: '',
    created_solved: '',
    created_type: '',
    created_brand: '',
    created_status: '',
    created_remark: '',
    created_text: ''
  }))
  const [deviceList, setDeviceList] = useState([])
  const [workOrderStatus, setWorkOrderStatus] = useState([])
  const [workOrderType, setWorkOrderType] = useState([])
  const [workBrand, setWorkBrand] = useState<BrandProps[]>([])
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
    setWorkOrderForm({...workOrderForm, created_type: key})
    
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

  const changeDevice = (val: string) => {
    setWorkOrderForm(prev => {
      const newForm = {
        ...prev,
        created_product: val.trim()
      }
      return newForm;
    })
  }
  
  const checkOrderForm = async () => {
    if (!workOrderForm.created_product) {
      Alert.alert('提示', '请选择设备')
    } else if (!workOrderForm.created_status) {
      Alert.alert('提示', '请选择状态')
    } else if (!workOrderForm.created_type) {
      Alert.alert('提示', '请选择类型')
    } else if (!workOrderForm.created_brand) {
      Alert.alert('提示', '请选择品牌')
    } else if (!workOrderForm.created_text) {
      Alert.alert('提示', '请输入问题描述')
    } else if (workOrderForm.created_status === '已解决' && !workOrderForm.created_solved) {
      Alert.alert('提示', '请输入解决方案')
    }else {
      await getInsertWorkOrder(workOrderForm)
      router.push('/workorder')
    }
  }

  useEffect(() => {
    getDeviceData();
    getWorkOrderStatusData();
    getWorkOrderTypeData();
    getUserInfo().then(userInfo => {
      setWorkOrderForm(prev => ({
        ...prev,
        created_name: userInfo.user_metadata.username
      }))
    })

    const currentTime = getPublicTime();
    setWorkOrderForm(prev => ({
      ...prev,
      created_time: currentTime[0],
      created_update: currentTime[0],
    }));

  }, [])

  useEffect(() => {
    getHeaderStyle(navigation, {
      title: "创建工单",
      backgroundColor: '#2a6fff',
      titleColor: '#fff',
      titleFontSize: 16,
      rightButton: {
        title: "提交",
        onPress: () => {checkOrderForm()},
        style: { fontSize: 16, color: '#fff'}
      }
    })
  }, [navigation, workOrderForm])


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
            <View style={{ width: 180}}>
              <CustomPicker
                value={workOrderForm.created_product ?? ''}
                onValueChange={changeDevice}
                placeholder="请选择设备..."
                items={deviceList.map((item: any) => {
                  return {
                    label: item.value,
                    value: item.value
                  };
                })}
                icon={<IconSymbol name="chevron.right" size={14} color="#333" />}
              />
            </View>
          </View>
      
          {/* 选择状态 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
            <Text>选择状态：</Text>
            <View style={{ width: 180 }}>
              <CustomPicker
                value={workOrderForm.created_status}
                onValueChange={(val) => setWorkOrderForm({...workOrderForm, created_status: val})}
                placeholder="请选择状态..."
                items={workOrderStatus.map((item: any) => ({
                  label: item.value,
                  value: item.value
                }))}
                icon={<IconSymbol name="chevron.right" size={14} color="#333" />}
              />
            </View>
          </View>
          {/* 选择设备类型 */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
            <Text>设备类型：</Text>
            <View style={{ width: 180 }}>
              <CustomPicker
                value={workOrderForm.created_type}
                onValueChange={changeType}
                placeholder="请选择类型..."
                items={workOrderType.map((item: any) => ({
                  label: item.value,
                  value: item.value
                }))}
                icon={<IconSymbol name="chevron.right" size={14} color="#333" />}
              />
            </View>
          </View>
          {/* 选择品牌 */}
          {workOrderForm.created_type && (
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <Text>选择品牌：</Text>
              <View style={{ width: 180 }}>
                <CustomPicker
                  value={workOrderForm.created_brand}
                  onValueChange={(val) => setWorkOrderForm({...workOrderForm, created_brand: val})}
                  placeholder="请选择品牌..."
                  items={workBrand.map((item: any) => ({
                    label: item.value,
                    value: item.value
                  }))}
                  icon={<IconSymbol name="chevron.right" size={14} color="#333" />}
                />
              </View>
            </View>
          )}
          {/* 创建人 */}
          <View style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginTop: 15
          }}>
            <Text>创建人：</Text>
            <View style={{
              width: 170,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Text>{workOrderForm.created_name}</Text>
            </View>
          </View>
          {/* 创建时间 */}
          <View style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginTop: 15
          }}>
            <Text>创建时间：</Text>
            <View style={{
              width: 170,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Text>{workOrderForm.created_time}</Text>
            </View>
          </View>
          <View style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginTop: 8
          }}>
            <Text>更新时间：</Text>
            <View style={{
              width: 170,
              minHeight: 40,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Text>{workOrderForm.created_update}</Text>
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
            onChangeText={(text) => setWorkOrderForm({...workOrderForm, created_text: text})}
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
            onChangeText={(text) => setWorkOrderForm({...workOrderForm, created_solved: text})}
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