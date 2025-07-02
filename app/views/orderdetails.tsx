import { getWorkOrderData } from '@/lib/pubFunction';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function OrderDetails() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const getOrderDetails = async () => {
    const data = await getWorkOrderData(id as string);
    console.log(data);
  }

  useEffect(() => {
    getOrderDetails()
    
    navigation.setOptions({
      title: "工单详情",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: '#2a6fff',
      },
      headerTitleStyle: {
        fontSize: 16,
        color: '#fff',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  

  return (
    <View 
      style={{
        width: 380, 
        height: 380, 
        backgroundColor: 'white', 
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignSelf: 'center',
        marginTop: 20,
        padding: 15
      }}>
      <Text>工单详情</Text>
      <Text></Text>
    </View>
  );
}