import { Platform } from "react-native";

interface BoxShadowStyle {
  xOffset?: number; // Горизонтальное смещение тени
  yOffset?: number; // Вертикальное смещение тени
  shadowColorIos?: string; // Цвет тени для iOS
  shadowOpacity?: number; // Прозрачность тени (0-1)
  shadowRadius?: number; // Радиус размытия тени
  elevation?: number; // Высота тени для Android (аналог z-index)
  shadowColorAndroid?: string; // Цвет тени для Android}
}

export function generateBoxShadowStyle({
  xOffset = 0,
  yOffset = 5,
  shadowColorIos = "#000",
  shadowOpacity = 0.5,
  shadowRadius = 10,
  elevation = 10,
  shadowColorAndroid = "#000",
}: BoxShadowStyle = {}) {
  if (Platform.OS === "ios") {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
}

//const styles = StyleSheet.create({
//  card: {
//    ...generateBoxShadowStyle(),
//  },
//});
