import Link from 'next/link'
import Head from 'next/head'

export const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{props.children}</main>
    </>
  )
}
