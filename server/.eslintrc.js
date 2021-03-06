module.exports = {
    parser : '@typescript-eslint/parser',
    'rules': {
        'semi': ['error', 'never'],
        'quotes': ['error', 'single']
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ]
}