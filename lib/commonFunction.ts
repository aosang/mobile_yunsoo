import { NavigationProp, ParamListBase } from "@react-navigation/native";

export const getHeaderStyle = ( navigation: Omit<NavigationProp<ParamListBase>, "getState"> & { getState(): any; }, title: string ) => {
  return navigation.setOptions({
    title: title,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: '#2a6fff',
    },
    headerTitleStyle: {
      color: '#fff',
      fontSize: 16,
    },
    headerTintColor: '#fff',
  })
}
