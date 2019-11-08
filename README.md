svrx-plugin-json-viewer
---

[![svrx](https://img.shields.io/badge/svrx-plugin-%23ff69b4?style=flat-square)](https://svrx.io/)
[![npm](https://img.shields.io/npm/v/svrx-plugin-json-viewer.svg?style=flat-square)](https://www.npmjs.com/package/svrx-plugin-json-viewer)

The svrx plugin for json-viewer

![](https://p1.music.126.net/sotrRhLUPnicsOiFqqTBGA==/109951164475904446.png)

This plugin will convert the JSON response to a json viewer's page, but it won't affect the response via ajax or fetch.

## Usage

> Please make sure that you have installed [svrx](https://svrx.io/) already.

### Via CLI

```bash
svrx -p json-viewer
```

### Via API

```js
const svrx = require('@svrx/svrx');

svrx({ plugins: [ 'json-viewer' ] }).start();
```

## Options


```js
{
    type: {
      description: 'Enable data type labels prefix values',
      default: false,
      type: 'boolean'
    },
    collapsed: {
      default: false,
      description: 'When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth.',
      anyOf: [
        {
          type: 'number',
        },
        {
          type: 'boolean',
        },
      ],
    },
    theme: {
      type: 'string',
      description: 'RJV supports base-16 themes.',
    },
}
```

#### 

<!-- TODO -->

## License

MIT