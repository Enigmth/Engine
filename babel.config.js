module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            images: './assets',
            components: './components',
            services: './services',
            store: './store',
            common: './components/common',
            styles: './styles',
          },
          'extensions': [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ],
        },
      ],
    ],
  };
};
