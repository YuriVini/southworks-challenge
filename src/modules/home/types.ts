import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum HomeRoutes {
  HOME = "home",
}

export type HomeStackParamList = {
  [HomeRoutes.HOME]: undefined;
};

export type HomeStackNavigation = NativeStackNavigationProp<HomeStackParamList>;
