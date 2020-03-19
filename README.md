# eslint-plugin-lodash-to-native

lodash map rule

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
$ npm install -S https://github.com/MoksS/eslint-plugin-lodash-to-native.git

```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lodash-to-native` globally.

## Usage

Add `lodash-to-native` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lodash-to-native"
    ]
}
```

```json
{
    "rules": {
      "lodash-to-native/map": "warn"
    }
}
```

## Test

```
$ npm test

```

### [AST Explorer test rule](https://astexplorer.net/#/gist/3e76ae61070777ba14d6310e92426595/55f70ae538a7a38c8350018793c581e692333b91)
