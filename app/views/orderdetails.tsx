import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function OrderDetails() {
  const navigation = useNavigation();

  useEffect(() => {
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

  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>工单详情</Text>
      <Text>{id}</Text>
    </View>
  );
}