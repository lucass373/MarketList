/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Item, List } from 'ionic-angular';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  LoginScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  Bottom: undefined;
  Modal: undefined;
  NotFound: undefined;
  TabOneScreen: undefined ;
  RegisterScreen: undefined;
  LimpList:undefined;
  TabThreeScreen1: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  Bottom: undefined;
  LimpList: undefined;
  TabThreeScreen1: undefined;

};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
