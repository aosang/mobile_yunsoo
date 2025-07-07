import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from 'react';
import { Text, TouchableOpacity } from "react-native";
import Toast from 'react-native-toast-message';
import { HeaderButton, HeaderButtonProps, HeaderConfig } from "./dbtype";

const createHeaderButton = (button: HeaderButton, side: 'left' | 'right') => {
  const style = side === 'left' ? { marginLeft: 16 } : { marginRight: 16 };
  
  return React.createElement(
    TouchableOpacity,
    {
      onPress: button.onPress,
      style: style
    },
    React.createElement(
      Text,
      {
        style: {
          color: '#fff',
          fontSize: 16,
          ...button.style
        }
      },
      button.title
    )
  );
};

export const getHeaderStyle = (
  navigation: Omit<NavigationProp<ParamListBase>, "getState"> & { getState(): any; },
  options: HeaderButtonProps
): void => {
  const headerConfig: HeaderConfig = {
    title: options.title,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: options.backgroundColor || '#2a6fff',
    },
    headerTitleStyle: {
      color: options.titleColor || '#fff',
      fontSize: options.titleFontSize || 16,
    },
    headerTintColor: options.titleColor || '#fff',
    headerBackTitle: options.backTitle || '返回',
  };

  if (options.rightButton) {
    headerConfig.headerRight = () => createHeaderButton(options.rightButton!, 'right');
  }

  if (options.leftButton) {
    headerConfig.headerLeft = () => createHeaderButton(options.leftButton!, 'left');
  }

  navigation.setOptions(headerConfig);
}

// 获取时间公共方法
export const getPublicTime = () => {
  let currentTimeString: number | string = ''
  let orderId: number | string = ''
  let date: Date = new Date()
  let year: number | string = date.getFullYear()
  let month: number | string = date.getMonth() + 1
  let day: number | string = date.getDate()
  let hour: number | string = date.getHours()
  let minute: number | string = date.getMinutes()
  let second: number | string = date.getSeconds()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  const randomNumber = Math.floor(Math.random() * 100)
  orderId = `${year}${month}${day}${hour}${minute}${second}${randomNumber}`
  currentTimeString = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return [currentTimeString, orderId]
}

export const showToast = (message: string, type: string) => {
  Toast.show({
    text1: message,
    type: type,
    position: 'bottom',
    bottomOffset: 96,
    visibilityTime: 1200,
  })
}