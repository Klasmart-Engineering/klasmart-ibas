import { PageSEO } from '@/components/SEO'
import { IoChevronDown, IoChevronUpOutline, IoSearchOutline } from 'react-icons/io5'
import { useState, useMemo, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import axios from 'axios'
import LayoutWrapper from '@/components/LayoutWrapper'
import { api, url } from '../lib/utils/requests'
import { normalize } from '../lib/utils/transformers'
import Markdown from '../components/Markdown'
import { useRouter } from 'next/router'

export default function Faq(props) {
  const { content = {} } = props
  const [selectedFaq, setSelectedFaq] = useState(false)
  const [contentFaq, setContentFaq] = useState([])
  const router = useRouter()

  const locale = useMemo(() => {
    return router?.locale || 'en'
  }, [router?.locale])

  const loadContentFaq = () => {
    api()
      .get(`faq-contents?_locale=${locale}`)
      .then((res) => setContentFaq(normalize(res.data)))
  }

  const toogleAccordion = (i) => {
    if (i === selectedFaq) {
      setSelectedFaq(-1)
      return
    }
    setSelectedFaq(i)
  }

  useEffect(() => {
    loadContentFaq()
  }, [locale])

  return (
    <LayoutWrapper>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        image={siteMetadata.image.url}
      />
      <section className="h-screen mb-36 mt-24 md:mt-52">
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full p-3">
              <div className="relative">
                <IoSearchOutline className="absolute text-gray-400 top-5 left-4" />
                <input
                  type="text"
                  className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                  placeholder="Search"
                ></input>
                <span className="absolute top-4 right-5 border-l pl-4"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-10 justify-center w-full">
          <div className="px-3 py-1 bg-blue-200 rounded-full text-xs text-blue-700">
            <span>{content?.faq_pils}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="font-bold text-3xl pt-6 md:text-5xl leading-tight text-gray-700 pb-6 text-center">
            {content?.faq_title}
          </h1>
        </div>

        <div className="w-full md:max-w-6xl md:mx-auto md:mt-12">
          {contentFaq.map((content, i) => (
            <>
              <button
                className="border-b border-t pb-6 w-full flex justify-between items-center px-8 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  toogleAccordion(i)
                }}
              >
                <p className="flex items-center text-left bold w-60 md:w-full text-xl md:text-xl text-gray-600 pt-6 ">
                  {content.title}
                </p>

                <span className="text-2xl md:text-2xl md:ml-5">
                  {selectedFaq === i ? <IoChevronUpOutline /> : <IoChevronDown />}
                </span>
              </button>
              <div
                style={{ display: selectedFaq === i ? 'block' : 'none' }}
                className="px-8 py-9 text-left"
              >
                <Markdown>{content.description}</Markdown>
              </div>
            </>
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}

export async function getServerSideProps({ locale }) {
  const cmsUrl = url(`homepage?_locale=${locale}`)
  const content = await axios.get(cmsUrl).then((res) => normalize(res.data))

  const metaUrl = url(`seos`)
  const siteMetadata = await axios
    .get(metaUrl, { params: { path: '/faqs' } })
    .then((res) => normalize(res.data))

  return { props: { locale, content, siteMetadata: siteMetadata[0] } }
}
