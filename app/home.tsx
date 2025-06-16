import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

type RootStackParamList = {
  '(tabs)': undefined;
};

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className=" bg-blue-500 items-center justify-center">
      <Text className="text-white text-xl">
        Hello World
      </Text>
    </View>
  );
}
