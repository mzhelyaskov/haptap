const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apps/backend/haptap'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [
        join(__dirname, 'src/assets'),
        {
          input: join(__dirname, 'src/environments/vars'),
          glob: '**/*',
          output: 'environments',
        },
      ],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
  ignoreWarnings: [
    {
      module: /app-database\.module\.ts/,
      message: /Critical dependency: the request of a dependency is an expression/
    }
  ],
};
