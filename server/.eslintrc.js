/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: server/.eslintrc
 * 
 */
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