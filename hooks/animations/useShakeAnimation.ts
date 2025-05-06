import { useRef, useCallback } from "react";
import { Animated } from "react-native";

export const useShakeAnimation = (angle = 2, duration = 50) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const createAnimation = useCallback(() => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 },
    );
  }, [rotateAnim, duration]);

  const start = useCallback(() => {
    rotateAnim.setValue(0);
    animationRef.current = createAnimation();
    animationRef.current.start();
  }, [createAnimation, rotateAnim]);

  const stop = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [`-${angle}deg`, "0deg", `${angle}deg`],
  });

  return {
    start,
    stop,
    animationStyle: { transform: [{ rotate: rotateInterpolate }] },
  };
};
