
const PRIORITY_BIGGER_THAN_PROXY = 30;
const JSON_VIEWER_BODY = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Svrx JSON Viewer</title>
  <style></style>
</head>
<body id='body'>
<div id="app-entry">

</div>
<script type='text/javascript'>
window.__JSON_VIEW_OBJECT__ = {0}
</script>
</body>
</html>
`;

module.exports = {
  // Ref: https://docs.svrx.io/en/plugin/contribution.html#schema
  configSchema: {
    type: {
      description: 'Enable data type labels prefix values',
      default: false,
      type: 'boolean',
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
    options: {
      type: 'object',
      default: {},
      description: 'Other JSON VIEW OPTIONS',
    },
  },

  assets: {
    // script resources
    script: ['./assets/index.js'],
    // css resources
    style: ['./index.css'],
  },

  hooks: {
    // Ref: https://docs.svrx.io/en/plugin/contribution.html#server
    async onCreate({
      middleware,
    }) {
      // TODO
      middleware.add('$json-viewer', {
        priority: PRIORITY_BIGGER_THAN_PROXY,
        async onRoute(ctx, next) {
          const SEC_FETCH_MODE = ctx.request.header['sec-fetch-mode'];
          await next();


          const isJSONCanRender = ctx.accepts(['html'])
            && !/^\*(\/\*)?$/.test(ctx.get('accept'))
            && (!SEC_FETCH_MODE || SEC_FETCH_MODE === 'navigate') // https://w3c.github.io/webappsec-fetch-metadata/
            && ctx.get('x-requested-with') !== 'XMLHttpRequest'
            && ctx.response.is('json');


          if (isJSONCanRender) {
            ctx.type = 'html';
            const body = (Buffer.isBuffer(ctx.body) || typeof ctx.body==='string')? ctx.body.toString(): JSON.stringify(ctx.body)
            ctx.body = JSON_VIEWER_BODY.replace('{0}', body);
          }
        },
      });

      return () => {
        // fire onDestory
      };
    },
  },
};
