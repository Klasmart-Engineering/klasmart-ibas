import Link from './Link'
import MobileNav from './MobileNav'
import { useRouter } from 'next/router'
import TryButton from './button/TryButton'
import { IoChevronDown } from 'react-icons/io5'
import { Link as ScrollLink } from 'react-scroll'
import Image from 'next/image'
import axios from 'axios'
import { Fragment, useState, useEffect, useMemo } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { url } from '../lib/utils/requests'

const Header = () => {
  const [contentNavbar, setContentNavbar] = useState([])
  const router = useRouter()

  const locale = useMemo(() => {
    return router?.locale || 'en'
  }, [router?.locale])

  const loadContentNavbar = () => {
    axios.get(url(`homepage?_locale=${locale}`)).then((res) => setContentNavbar(res.data))
  }

  const handleChangeLocale = (locale = 'en') => {
    const { pathname } = router
    router.replace(pathname, pathname, { locale: locale })
  }

  useEffect(() => {
    loadContentNavbar()
  }, [locale])

  return (
    <header className="flex py-3 md:py-8 w-full top-0 z-50 bg-white md:bg-transparent shadow-sm fixed md:shadow-none md:absolute md:top-0 px-6 md:px-0">
      <section className="flex items-center justify-between w-full max-w-5xl mx-auto">
        <div className="hidden md:flex">
          <Link
            href={'/'}
            className={`font-medium text-white dark:text-white hover:text-gray-300 dark:hover:text-primary-400`}
          >
            {contentNavbar?.badanamu_logo?.url && (
              <Image
                src={contentNavbar?.badanamu_logo?.url}
                height={70}
                width={85}
                className="h-full"
                alt="logo-badanamu"
              />
            )}
          </Link>
          <div className="flex items-center justify-center pl-5">
            <div className="flex-none rounded-lg py-1 border-2 border-gray-500 flex items-center justify-center cursor-pointer">
              <button
                onClick={() => handleChangeLocale('en')}
                className={`border-r border-gray-500 w-10 h-7 flex items-center justify-center ${
                  locale === 'en' ? 'text-gray-500' : 'text-gray-300'
                } hover:text-gray-600`}
              >
                EN
              </button>
              <button
                onClick={() => handleChangeLocale('id')}
                className={`border-l border-gray-500 w-10 h-7 flex items-center justify-center ${
                  locale === 'id' ? 'text-gray-500' : 'text-gray-300'
                } hover:text-gray-600`}
              >
                ID
              </button>
            </div>
          </div>
        </div>
        <div className="flex md:hidden">
          <Link
            href={'/'}
            className={`font-medium text-white dark:text-white hover:text-gray-300 dark:hover:text-primary-400`}
          >
            <div className="relative w-[60px] h-[45px]">
              <Image
                src="/static/images/logo.png"
                layout="fill"
                objectFit="cover"
                className="h-full"
                alt="logo"
              />
            </div>
          </Link>
          <div className="flex items-center justify-center pl-5 left-24 fixed">
            <div className="flex-none rounded-lg py-1 border-2 border-gray-500 flex items-center justify-center cursor-pointer">
              <button
                onClick={() => handleChangeLocale('en')}
                className={`border-r border-gray-500 w-10 h-7 flex items-center justify-center ${
                  locale === 'en' ? 'text-gray-500' : 'text-gray-300'
                } hover:text-gray-600`}
              >
                EN
              </button>
              <button
                onClick={() => handleChangeLocale('id')}
                className={`border-l border-gray-500 w-10 h-7 flex items-center justify-center ${
                  locale === 'id' ? 'text-gray-500' : 'text-gray-300'
                } hover:text-gray-600`}
              >
                ID
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden md:block">
            <ScrollLink
              onClick={() => router.push('/#about')}
              to="about"
              className={`${
                router.asPath == '/about' && 'text-primary-600 dark:text-primary-400'
              } cursor-pointer p-1 font-semibold text-gray-700 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
            >
              {contentNavbar.about}
            </ScrollLink>
            <div className="inline-block">
              <Menu>
                <Menu.Button
                  className={`${
                    router.asPath == '/program' && 'text-primary-600 dark:text-primary-400'
                  } flex items-center p-1 font-semibold text-gray-700 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
                >
                  {contentNavbar.program}
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
                  <Menu.Items className="absolute rounded-md py-2 px-4 bg-white shadow-md focus:outline-none">
                    <div className="px-2 py-2">
                      <>
                        <div className="text-xs text-gray-300">{contentNavbar.program}</div>
                      </>
                      <Menu.Item>
                        {({ active }) => (
                          <ScrollLink
                            to="bada-rhyme"
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
                            to="bada-genius"
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
              className={`${
                router.asPath == '/reviews' && 'text-primary-600 dark:text-primary-400'
              } cursor-pointer p-1 font-semibold text-gray-700 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
            >
              {contentNavbar.success_story}
            </ScrollLink>
            {/* <button
              to="community"
              onClick={() => router.push('/community')}
              className="cursor-pointer p-1 font-semibold text-gray-700 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {contentNavbar.community}
            </button> */}
            <ScrollLink
              onClick={() => router.push('/#faq')}
              to="faq"
              className={`${
                router.asPath == '/faq' && 'text-primary-600 dark:text-primary-400'
              } cursor-pointer p-1 font-semibold text-gray-700 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
            >
              {contentNavbar.faq}
            </ScrollLink>
          </div>
          <div className="ml-3 hidden md:block">
            <TryButton>{contentNavbar.curiculum_action_btn}</TryButton>
          </div>
          <MobileNav />
        </div>
      </section>
    </header>
  )
}

export default Header
