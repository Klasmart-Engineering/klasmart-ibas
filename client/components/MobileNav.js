import { useState, useEffect, useMemo } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import Sidenav from '@/components/modal/Sidenav'
import EmailForm from '@/components/forms/EmailForm'
import { Menu, MenuItem, MenuButton, MenuHeader, MenuDivider } from '@szhsin/react-menu'
import { IoChevronDown } from 'react-icons/io5'
import { Link as ScrollLink } from 'react-scroll'
import axios from 'axios'
import { useRouter } from 'next/router'
import { url } from '../lib/utils/requests'
import { normalize } from '../lib/utils/transformers'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [contentNavbar, setContentNavbar] = useState([])
  const router = useRouter()

  const locale = useMemo(() => {
    return router?.locale || 'en'
  }, [router?.locale])

  const loadContentNavbar = () => {
    axios.get(url(`homepage?_locale=${locale}`)).then((res) => setContentNavbar(normalize(res.data)))
  }

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  useEffect(() => {
    loadContentNavbar()
  }, [locale])

  return (
    <div className="sm:hidden fixed left-[300px]">
      <Sidenav show={navShow} hideClose onClose={() => setNavShow(false)}>
        <nav className="h-full relative">
          <button
            type="button"
            className="absolute right-0 w-8 h-8 ml-1 mr-1 rounded border-2 border-black"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              {navShow ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
          <div className="block">
            <div className="px-6 py-4">
              <ScrollLink
                onClick={() => {
                  setNavShow(false)
                  router.push('/#about')
                }}
                to="about"
                className={`cursor-pointer p-1 font-semibold text-gray-900 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
              >
                {contentNavbar.about}
              </ScrollLink>
            </div>
            <div className="px-6 py-4">
              <Menu
                transition
                arrow={true}
                direction={'bottom'}
                theming={'light'}
                menuButton={
                  <MenuButton
                    className={`flex items-center p-1 font-semibold text-gray-900 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
                  >
                    {contentNavbar.program}
                    <span className="ml-5" />
                    <IoChevronDown size={15} />
                  </MenuButton>
                }
              >
                <MenuHeader className="font-bold text-xl">Programs</MenuHeader>
                <MenuItem value={'Bada Rhyme'} className="w-full">
                  <ScrollLink
                    onClick={() => setNavShow(false)}
                    to="bada-rhyme"
                    className={`cursor-pointer`}
                  >
                    Bada Rhyme
                  </ScrollLink>
                </MenuItem>
                <MenuDivider />
                <MenuItem value={'Bada Genius'} className="w-full">
                  <ScrollLink
                    onClick={() => setNavShow(false)}
                    to="bada-genius"
                    className={`cursor-pointer`}
                  >
                    Bada Genius
                  </ScrollLink>
                </MenuItem>
              </Menu>
            </div>
            <div className="px-6 py-4">
              <ScrollLink
                onClick={() => {
                  setNavShow(false)
                  router.push('/#reviews')
                }}
                to="reviews"
                className={`cursor-pointer p-1 font-semibold text-gray-900 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
              >
                {contentNavbar.success_story}
              </ScrollLink>
            </div>
            <div className="px-6 py-4">
              <ScrollLink
                to="faq"
                onClick={() => {
                  setNavShow(false)
                  router.push('/#faq')
                }}
                className={`cursor-pointer p-1 font-semibold text-gray-900 sm:p-4 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400`}
              >
                {contentNavbar.faq}
              </ScrollLink>
            </div>
          </div>
          {/* {headerNavLinks.map((link) => (
            <div key={link.title} className="px-6 py-4">
              <Link
                // href={link.href}
                href="/"
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))} */}
        </nav>
      </Sidenav>
      <button
        type="button"
        className="w-8 h-8 ml-1 mr-1 rounded border-2 border-black"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>
      {/* <div
        className={`fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed w-full h-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="fixed h-full mt-8">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div> */}
    </div>
  )
}

export default MobileNav
