import '@/css/fonts.css'
import '@/css/tailwind.css'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/theme-dark.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Analytics from '@/components/analytics'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'next-themes'
import moment from 'moment'
import 'moment/locale/id'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    moment.locale(router.locale)
  }, [router.locale])

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  )
}
