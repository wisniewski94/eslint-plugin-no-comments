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
// eslintrc.js
{
    "plugins": ["no-comments"],
    "rules": {
        "no-comments/disallowComments": [
            "error",
            {
                "allow": ["TODO", "FIXME", "NOTE", "DEBUG"],
            }
        ]
    }
}

If allow is not specified, all comments will be disallowed except for `eslint` and `global` comments.
```
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

if allow is specified, e.g.: `["TODO", "FIXME", "NOTE", "DEBUG"]`

```js
const {Text, Image} = require('cool-package') // TODO fix vulnerability
```

## Author
- [Wiktor Wiśniewski](https://wiktorwisniewski.dev)

## MIT License
