import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { Link as ScrollLink } from 'react-scroll'
import { IoChevronDown } from 'react-icons/io5'
import Image from 'next/image'
import { Fragment, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { api } from 'lib/utils/requests'
import { Menu, Transition } from '@headlessui/react'
import { url } from '../lib/utils/requests'
import { normalize } from '../lib/utils/transformers'

export default function Footer() {
  const [contentFooter, setContentFooter] = useState([])
  const router = useRouter()

  const locale = useMemo(() => {
    return router?.locale || 'en'
  }, [router?.locale])

  const loadContentFooter = () => {
    api()
      .get(url(`homepage?_locale=${locale}`))
      .then((res) => setContentFooter(normalize(res.data)))
  }

  useEffect(() => {
    loadContentFooter()
  }, [locale])

  return (
    <footer
      style={{
        background: '#F4F9FB',
      }}
    >
      <section className="flex-col md:flex-row items-start md:items-center md:justify-between w-full max-w-5xl mx-auto py-12 px-6 md:px-0 hidden md:flex">
        <div className="hidden md:flex">
          <Link
            href={'/'}
            className={`font-medium text-white dark:text-white hover:text-gray-300 dark:hover:text-primary-400`}
          >
            {contentFooter?.badanamu_logo?.url && (
              <Image
                src={contentFooter?.badanamu_logo?.url}
                height={70}
                width={85}
                className="h-full"
                alt="logo"
              />
            )}
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden md:block">
            <ScrollLink
              onClick={() => router.push('/#about')}
              to="about"
              className={`cursor-pointer p-1 font-semibold text-gray-900 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
            >
              {contentFooter.about}
            </ScrollLink>
            <div className="inline-flex">
              <Menu>
                <Menu.Button
                  className={`${
                    router.asPath == '/program' && 'text-primary-600 dark:text-primary-400'
                  } flex items-center p-1 font-semibold text-gray-700 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
                >
                  {contentFooter.program}
                  <span className="ml-5" />
                  <IoChevronDown size={15} />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute rounded-md mt-11 py-2 px-4 bg-white shadow-md focus:outline-none">
                    <div className="px-2 py-2">
                      <>
                        <div className="text-xs text-gray-300">PROGRAMS</div>
                      </>
                      <Menu.Item>
                        {({ active }) => (
                          <ScrollLink
                            to="bada-rhyme"
                            onClick={() => router.push('/#bada-rhyme')}
                            className={`${active && 'bg-white cursor-pointer'}`}
                          >
                            <div className="mt-4">Bada Rhyme</div>
                          </ScrollLink>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="border-b-2 w-full" />
                    <div className="py-2 px-2">
                      <Menu.Item>
                        {({ active }) => (
                          <ScrollLink
                            to="bada-rhyme"
                            onClick={() => router.push('/#bada-genius')}
                            className={`${active && 'bg-white cursor-pointer'}`}
                          >
                            <div>Bada Genius</div>
                          </ScrollLink>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <ScrollLink
              onClick={() => router.push('/#reviews')}
              to="reviews"
              className={`cursor-pointer p-1 font-semibold text-gray-900 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
            >
              {contentFooter.success_story}
            </ScrollLink>
            {/* <button
              to="community"
              onClick={() => router.push('/community')}
              className="cursor-pointer p-1 font-semibold text-gray-700 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {contentFooter.community}
            </button> */}
            <ScrollLink
              onClick={() => router.push('/#faq')}
              to="faq"
              className={`cursor-pointer p-1 font-semibold text-gray-900 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
            >
              {contentFooter.faq}
            </ScrollLink>
          </div>
        </div>
      </section>
      <div className="flex flex-col w-full max-w-5xl mx-auto items-start pt-16 px-6 md:px-0">
        <div className="flex mb-6 md:mb-3 space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div>
        <div className="mb-8 justify-between text-sm text-gray-500 dark:text-gray-400 w-full hidden md:flex">
          <div className="flex space-x-2 mt-3">
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{siteMetadata.title}</Link>
          </div>
          <div className="flex space-x-2 mt-3">
            <div>{`Terms & Conditions`}</div>
            <div>{` • `}</div>
            <div>{`Privacy Policy`}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
