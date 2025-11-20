import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum HomeRoutes {
  HOME = "home",
  POST_DETAILS = "post-details",
}

export type HomeStackParamList = {
  [HomeRoutes.HOME]: undefined;
  [HomeRoutes.POST_DETAILS]: { postId: number };
};

export type HomeStackNavigation = NativeStackNavigationProp<HomeStackParamList>;
