import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4600/graphql',
  documents: ['src/**/*.queries.ts', 'src/**/*.mutation.ts'],
  generates: {
    './src/graphql/queries.ts': {
      preset: 'import-types',
      plugins: ['typescript-operations'],
      presetConfig: {
        typesPath: './types',
      },
    },

    './src/graphql/types.ts': {
      plugins: ['typescript'],
      config: {
        arrayInputCoercion: false,
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
