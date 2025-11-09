import tseslint from 'typescript-eslint';
import baseConfig from '../../eslint.config.mts';

export default tseslint.config(...baseConfig, {
  files: ['**/*.{js,ts}'],
  rules: {
    // Regras específicas do NestJS
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
});
