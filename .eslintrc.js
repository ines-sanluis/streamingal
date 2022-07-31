module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    env: {
        "browser": true,
        "amd": true,
        "node": true
    },
    rules: {
        quotes: ["error", "double"],
        "keyword-spacing": ["error", { "before": true,
            "after": true }],
        "indent": ["error", 4],
        "no-duplicate-imports": "error",
        "no-trailing-spaces": "error",
        "no-var": "error",
        "no-useless-return": "error",
        "prefer-const": "error",
        "comma-dangle": "error",
        "jsx-quotes": ["error", "prefer-double"],
        "brace-style": "error",
        "no-multi-spaces": "error",
        "linebreak-style": ["error", "unix"],
        "object-property-newline": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off"
    }
};