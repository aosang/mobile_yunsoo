import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
import { Text, View } from "react-native";


export default function OrderDetails() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "工单详情",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 16
      },
    });
  }, [navigation]);
  
  return (
    <View>
      <Text>工单详情</Text>
    </View>
  );
}