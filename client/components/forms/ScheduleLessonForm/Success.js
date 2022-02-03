import Button from '@/components/button/Button'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { useState, useEffect, useMemo } from 'react'
import { api } from 'lib/utils/requests'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Markdown from '../../Markdown'
import { url } from '../../../lib/utils/requests'

const ScheduleLessonFormSuccess = ({ className, style, setShowEmail }) => {
  const [contentSuccess, setContentSuccess] = useState([])
  const router = useRouter()

  const locale = useMemo(() => {
    return router?.locale || 'en'
  }, [router?.locale])

  const loadContentSuccess = () => {
    api()
      .get(url(`schedule-form-copy?_locale=${locale}`))
      .then((res) => setContentSuccess(res.data))
  }

  useEffect(() => {
    loadContentSuccess()
  }, [locale])

  return (
    <>
      <form
        style={style}
        className={`w-full flex flex-col rounded-lg shadow-lg dark:shadow-sm dark:bg-gray-900 overflow-hidden h-full ${className}`}
      >
        <section className="flex-grow flex items-center justify-center">
          <section className="p-6  text-center">
            <div className="flex items-center justify-center pb-6 text-primary-500">
              {contentSuccess?.body_content_form?.icon?.url && (
                <Image
                  src={contentSuccess?.body_content_form?.icon?.url}
                  alt="icon"
                  width={100}
                  height={100}
                />
              )}
            </div>
            <h2 className="text-2xl pb-3">{contentSuccess?.body_content_form?.thank_title}</h2>
            <p className="text-lg text-gray-500">
              <Markdown>{contentSuccess?.body_content_form?.description}</Markdown>
            </p>
          </section>
        </section>
        <footer className="p-6 py-3 w-full border-t-2 border-gray-100 bg-white">
          <div className="mb-4">
            <Button
              type="button"
              className="w-full text-center flex items-center justify-center"
              style={{ width: '100%' }}
              onClick={() => {
                setShowEmail(false)
              }}
            >
              {contentSuccess.finish_btn}
            </Button>
          </div>
          <Button
            type="button"
            className="w-full text-center flex items-center justify-center"
            style={{ width: '100%' }}
            onClick={() => {
              window.open(`${contentSuccess.form_third_url}`)
            }}
          >
            {contentSuccess.form_third_btn}
          </Button>
        </footer>
      </form>
    </>
  )
}

export default ScheduleLessonFormSuccess
