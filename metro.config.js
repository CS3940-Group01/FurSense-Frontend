const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get the default Expo Metro config
const config = getDefaultConfig(__dirname);

// Wrap the config with NativeWind
let metroConfig = withNativeWind(config, { input: './app/globals.css' });

// Wrap the config with Reanimated Metro configuration
metroConfig = wrapWithReanimatedMetroConfig(metroConfig);

module.exports = metroConfig;
