module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'preact',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            pragma: 'h',
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    ignorePatterns: ['build/'],
    rules: {},
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
            },
        },
    ],
};
