import tsConfig from '@dephub/eslint-ts';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...tsConfig,
  { rules: { 'security/detect-object-injection': 'off' } },
]);
