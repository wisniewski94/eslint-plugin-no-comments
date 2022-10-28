module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": ["no-comments"],
    "rules": {
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
};