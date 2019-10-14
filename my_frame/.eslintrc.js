module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": "off",
        "prefer-promise-reject-errors": "off",
        "no-redeclare": "off",
        "padded-blocks": ["error", "never"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "spaced-comment": "off",
        "no-trailing-spaces": "off",
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", "always"],
        "semi": ["error", "always"],
        "newline-after-var": ["error", "always"],
        "comma-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "space-infix-ops": "error",
        "key-spacing": ["error", { "beforeColon": false }],
        "object-curly-spacing": ["error", "never"],
        "indent": ["error", 4, {"SwitchCase": 1}],
        "no-spaced-func": "error",
        "generator-star-spacing": "off",
        'eqeqeq': 'off',
        'camelcase': 'off',
        'eol-last': ['error', 'never'],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};