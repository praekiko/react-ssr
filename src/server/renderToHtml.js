// @flow

/* eslint-disable react/no-danger */
import React from 'react'
import Helmet from 'react-helmet'

type Props = {
  children: *,
  css?: string[],
  scripts?: string[],
  state?: string,
}

const RenderToHtml = ({ children, scripts, css, state }: Props) => {
  const helmet = Helmet.renderStatic()

  return (
    <html lang="th">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {css.map(href => <link key={href} rel="stylesheet" href={href} />)}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`,
          }}
        />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map(src => <script key={src} src={src} />)}
      </body>
    </html>
  )
}

RenderToHtml.defaultProps = {
  css: [],
  scripts: [],
  state: '{}',
}

export default RenderToHtml
