import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(props) {
  const lang = props.__NEXT_DATA__?.locale || props.locale || 'es'

  return (
    <Html lang={lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export async function getInitialProps(ctx) {
  const initialProps = await ctx.defaultGetInitialProps(ctx)
  return { ...initialProps, locale: ctx.locale }
}
