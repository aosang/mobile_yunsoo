import { TextStyle } from "react-native";
export type LoginForm = {
  email: string
  password: string
  company_name: string
  user_name: string
}

export type WorkOrderProps = {
  created_update: string,
  created_time: string,
  created_id: string,
  created_product: string | null,
  created_name: string,
  created_solved: string,
  created_type: string,
  created_brand: string,
  created_status: string,
  created_remark: string,
  created_text: string
}

export type UserInfoProps = {
  id: string,
  username: string,
  company: string,
  email: string,
  time: string
}

export type BrandProps = {
  id: string,
  value: string
}

export type HeaderButton = {
  title: string;
  onPress: () => void;
  style?: TextStyle;
}

export type HeaderButtonProps = {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  titleFontSize?: number;
  rightButton?: HeaderButton;
  leftButton?: HeaderButton;
  backTitle?: string;
}

export type HeaderConfig = {
  title: string;
  headerTitleAlign: "center";
  headerStyle: {
    backgroundColor: string;
  }
  headerTitleStyle: {
    color: string;
    fontSize: number;
  }
  headerTintColor: string;
  headerBackTitle: string;
  headerRight?: () => React.ReactNode;
  headerLeft?: () => React.ReactNode;
}
