// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("sql");

module.exports = withNativeWind(config, {});
module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, {
    input: "./assets/styles/global.css",
  }),
);
