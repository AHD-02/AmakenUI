module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin" // KEEP IT THE LAST ELEMENT مع تحيات بشار الزق
    ]
  };
};
