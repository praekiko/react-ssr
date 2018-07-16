// import serialize from 'serialize-javascript'

export default function renderHtml({
  body,
  css,
  scripts,
  styleTags,
  store,
  head,
}) {
  return `<!DOCTYPE html>
    <head>
      ${head.title.toString()}
      ${head.meta.toString()}
      <base href="/" />
      <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
      <meta http-equiv="content-language" content="th, en" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" media="all" href="${css.bundle}"/>
      <link rel="stylesheet" media="all" href="${css.vendor}"/>
      ${styleTags}
      
      ${head.script.toString()}
      ${head.link.toString()}
      <script defer type="text/javascript" src="${scripts.bundle}"></script>
      <script defer type="text/javascript" src="${scripts.vendor}"></script>
      

    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
      <script type="text/javascript">window._store_=${store}</script>
    </body>
  </html>`
}

//<script type="text/javascript">window._store_=${serialize(store, {
//       isJSON: true,
//     })}</script>
