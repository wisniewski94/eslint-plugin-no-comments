const js = require("@eslint/js");
const noComments = require("eslint-plugin-no-comments");
const globals = require("globals");

module.exports = [
    js.configs.recommended,
    {
        plugins: {
            "no-comments": noComments
        },
        languageOptions: {
            ecmaVersion: 2021,
            globals: globals.browser
        },
        rules: {
            "no-comments/disallowComments": [
                "error",
                {
                    "allow": [
                        "global",
                        "eslint",
                        "TODO",
                        "FIXME",
                        "todo",
                    ]
                }
            ]
        }
    }
];
