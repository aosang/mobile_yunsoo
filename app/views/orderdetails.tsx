import { getHeaderStyle } from '@/lib/commonFunction';
import { WorkOrderProps } from '@/lib/dbtype';
import { getWorkOrderData } from '@/lib/pubFunction';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState<WorkOrderProps[]>([{
    created_id: '',
    created_product: '',
    created_name: '',
    created_type: '',
    created_brand: '',
    created_time: '',
    created_update: '',
    created_solved: '',
    created_status: '',
    created_remark: '',
    created_text: '',
  }]);
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const getOrderDetails = async () => {
    const data = await getWorkOrderData('', id as string);
    setOrderDetails(data as WorkOrderProps[]);
  }

  useEffect(() => {
    getOrderDetails()
    getHeaderStyle(navigation, "工单详情")
  }, [navigation]);

  return (
    <View 
      style={{
        width: 380, 
        backgroundColor: 'white', 
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignSelf: 'center',
        marginTop: 20,
        padding: 15,
        position: 'relative'
      }}>
      <View style={{
        backgroundColor: {
          '已解决': '#1cce9f',
          '待处理': '#f9b435',
          '处理中': '#f55d5d',
        }[orderDetails[0].created_status], 
        position: 'absolute', 
        top: 12, 
        right: 12, 
        width: 80, 
        height: 30, 
        borderRadius: 4, 
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        {orderDetails[0].created_status == '处理中' && (
          <>
            <Ionicons name="ellipsis-horizontal-circle-sharp" size={20} color="white" />
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', lineHeight: 30}}>处理中</Text>
          </>
        )}
        {orderDetails[0].created_status == '待处理' && (
          <>
            <MaterialCommunityIcons name="clock-time-three" size={20} color="white" />
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', lineHeight: 30}}>待处理</Text>
          </>
        )}
        {orderDetails[0].created_status == '已解决' && (
          <>
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', lineHeight: 30}}>已解决</Text>
          </>
        )}
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
        <Entypo name="chevron-small-right" size={14} color="#333" />
        <Text style={{color: '#000'}}>设备名称：</Text>
        <Text style={{color: '#555'}}>{orderDetails[0].created_product}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
        <Entypo name="chevron-small-right" size={14} color="#333" />
        <Text style={{color: '#000'}}>创建人：</Text>
        <Text style={{color: '#555'}}>{orderDetails[0].created_name}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
        <Entypo name="chevron-small-right" size={14} color="#333" />
        <Text style={{color: '#000'}}>设备类型：</Text>
        <Text style={{color: '#555'}}>{orderDetails[0].created_type}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
        <Entypo name="chevron-small-right" size={14} color="#333" />
        <Text style={{color: '#000'}}>设备品牌：</Text>
        <Text style={{color: '#555'}}>{orderDetails[0].created_brand}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
        <Entypo name="chevron-small-right" size={14} color="#333" />
        <Text style={{color: '#000'}}>创建时间：</Text>
        <Text style={{color: '#555'}}>{orderDetails[0].created_time}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="chevron-small-right" size={14} color="#333" />
        <Text style={{color: '#000'}}>更新时间：</Text>
        <Text style={{color: '#555'}}>{orderDetails[0].created_update}</Text>
      </View>
      <View style={{height: 1, backgroundColor: '#ccc', marginVertical: 16}}></View>
      <View style={{marginBottom: 12}}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}>
          <Entypo name="bookmark" size={14} color="#2a6fff" />
          <Text style={{color: '#000'}}>问题描述：</Text>
        </View>
        <Text style={{marginTop: 3, color: '#555', paddingHorizontal: 16}}>{orderDetails[0].created_text}</Text>
      </View>
      
      {orderDetails[0].created_solved && (
        <View style={{marginBottom: 16}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <Entypo name="bookmark" size={14} color="#2a6fff" />
            <Text style={{color: '#000'}}>解决方案：</Text>
          </View>
          <Text style={{marginTop: 3, color: '#555', paddingHorizontal: 16}}>{orderDetails[0].created_solved}</Text>
        </View>
      )}
      
      {orderDetails[0].created_remark && (
        <View style={{marginBottom: 16}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <Entypo name="bookmark" size={14} color="#2a6fff" />
            <Text style={{color: '#000'}}>备注：</Text>
          </View>
          <Text style={{marginTop: 3, color: '#555', paddingHorizontal: 16}}>{orderDetails[0].created_remark}</Text>
        </View>
      )}
    </View>
  )
}