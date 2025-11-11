const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  module: {
    rules: [
      {
        // Target only the file where the dynamic require is used
        test: /app-database\.module\.ts$/,
        parser: {
          // This setting tells Webpack to ignore the warning about dynamic
          // expressions (like 'require(file)') inside the module context.
          exprContextCritical: false
        },
      },
    ],
  },
  output: {
    path: join(__dirname, '../../../dist/apps/backend/api'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};
