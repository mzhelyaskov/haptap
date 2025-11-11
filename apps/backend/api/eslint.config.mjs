import baseConfig from '../../../eslint.config.mjs';

export default [{
  ...baseConfig,
  overrides: {
    files: ['**/*.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ['^@@be-api/*'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ]
    }
  }
}];
