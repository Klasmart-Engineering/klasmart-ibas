import React from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import { getCookie } from './cookies'

export const withAuth = (WrappedComponent) => {
  class HOC extends React.Component {
    static async getInitialProps(ctx) {
      let token = getCookie('_kdslp_dash')

      if (!token) {
        const cookie = nextCookie(ctx)
        token = cookie['_kdslp_dash']
      }

      if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/admin/signin' })
        ctx.res.end()
        return
      }

      if (!token) {
        Router.push('/admin/signin')
      }

      // Check if Page has a `getInitialProps`;
      const pageProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(ctx)
        : null || {}
      return { ...pageProps, token }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return HOC
}
