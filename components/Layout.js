import Link from 'next/link'
import Head from 'next/head'
import { Analytics } from "@vercel/analytics/react"

export const Layout = (props) => {
  
  return (
    <>
    <Analytics>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href={props.fav} />
      </Head>
      <main>{props.children}</main>
      </Analytics>
    </>
  )
}


