# eslint-plugin-no-comments

Prevents leaving comment blocks in the file. This plugin will ignore all comments starting from string `global` or `eslint` in order to keep eslint local settings safe.

## Why?

If the source code is not being processed by a bundler or any other tool, there is a risk of shipping some notes, old code blocks or sensitive information to production environment.

## Installation

```sh
npm install eslint-plugin-no-comments --save-dev
```

## Configuration
```js
// eslint.config.js
import noComments from "eslint-plugin-no-comments";

export default [
    {
        plugins: { "no-comments": noComments },
        rules: {
            "no-comments/disallowComments": [
                "error",
                {
                    allow: ["global", "eslint", "TODO", "FIXME"],
                }
            ]
        }
    }
];
```

### [How to add JSDoc to allowlist?](https://github.com/wisniewski94/eslint-plugin-no-comments/issues/7)

If `allow` is not specified, all comments are disallowed except those starting with `eslint` or `global`.

> **Note:** providing `allow` **replaces** the defaults entirely. If you want to keep `eslint` and `global` comments allowed alongside your own entries, include them explicitly in the array (as shown in the example above).

## Rule details

### Fail

```js
// import {Text} from 'react-native'
const {Text, Image} = require('react-native')
```

```js
/* var price1 = 5;
* var price2 = 6;
var total = price1 + price2;
*/
```

```js
const {Text, Image} = require('cool-package') // TO-DO fix vulnerability
```

### Pass

```js
/* global MyClass */
// eslint-disable-next-line no-unused-vars

var price1 = 5;
var price2 = 6;
var total = price1 + price2;
```

if allow is specified, e.g.: `["global", "eslint", "TODO", "FIXME"]`

```js
/* global MyClass */
// eslint-disable-next-line no-unused-vars
const {Text, Image} = require('cool-package') // TODO fix vulnerability
```

## Author
- [Wiktor Wiśniewski](https://wiktorwisniewski.dev)

## MIT License
