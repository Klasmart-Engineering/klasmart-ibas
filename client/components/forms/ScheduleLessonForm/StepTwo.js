import Button from '@/components/button/Button'
import moment from 'moment'
import LabeledInput from '../../fields/LabeledInput'
import LabeledPhoneInput from '../../fields/LabeledPhoneInput'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { isEmpty } from 'lodash'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { url } from '../../../lib/utils/requests'
import { normalize } from '../../../lib/utils/transformers'

const validationSchema = yup.object({
  parent_name: yup.string().required('Parent Name is required'),
  email: yup.string().email('Format not correct').required('Email is required'),
  phone: yup.string().required('Phone Number is required').min(9, 'Minimum 10 digit'),
})

const ScheduleLessonFormStepTwo = (props) => {
  const { className, style, onContinue, onBack, formValues } = props

  const { date, time } = formValues

  const [contentForm, setContentForm] = useState([])
  const router = useRouter()

  const locale = useMemo(() => {
    return router?.locale || 'en'
  }, [router?.locale])

  const loadContentForm = () => {
    axios.get(url(`schedule-form-copy?_locale=${locale}`)).then((res) => setContentForm(normalize(res.data)))
  }

  useEffect(() => {
    loadContentForm()
  }, [locale])

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      parent_name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = (values) => {
    onContinue(values)
  }

  const [watchParentName, watchParentEmail, watchParentNumber] = watch([
    'parent_name',
    'email',
    'phone',
  ])

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={style}
        className={`w-full flex flex-col rounded-lg shadow-lg dark:shadow-sm dark:bg-gray-900 overflow-hidden h-full ${className}`}
      >
        <section className="px-6 pt-6 pb-3 border-b-2 border-gray-100 hidden md:block">
          <div className="pb-3 flex space-x-3">
            <div className="h-4 w-4 rounded-full bg-primary-500" />
            <div className="h-4 w-4 rounded-full bg-primary-500" />
            <div className="h-4 w-4 rounded-full bg-primary-200" />
          </div>
          <p className="pb-0 block text-primary-500 font-bold">{contentForm.form_parent_title}</p>
        </section>
        <section className="flex-grow overflow-auto overflow-x-hidden">
          <section className="px-6 pt-6 pb-3 border-b-2 border-gray-100 block md:hidden">
            <div className="pb-3 flex space-x-3">
              <div className="h-4 w-4 rounded-full bg-primary-500" />
              <div className="h-4 w-4 rounded-full bg-primary-500" />
              <div className="h-4 w-4 rounded-full bg-primary-200" />
            </div>
            <p className="pb-0 block text-primary-500 font-bold">{contentForm.form_parent_title}</p>
          </section>
          <section className="pb-0">
            <div className="grid grid-cols-4 items-center">
              <div className="col-span-4 relative pb-3 p-6">
                <Controller
                  name="parent_name"
                  control={control}
                  render={({ field }) => (
                    <LabeledInput
                      label={contentForm.parent_name_field}
                      type="text"
                      value={field.value}
                      placeholder="Parent Name"
                      onChange={(v) => {
                        field.onChange(v.currentTarget.value)
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-span-4 relative pb-3 p-6">
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <LabeledInput
                        label={contentForm.email_field}
                        type="email"
                        value={field.value}
                        placeholder="example@email.com"
                        onChange={(v) => {
                          field.onChange(v.currentTarget.value)
                        }}
                      />
                      {error && <div className="text-xs text-red-500 pt-1">{error?.message}</div>}
                    </div>
                  )}
                />
              </div>
              <div className="col-span-4 relative pb-3 p-6">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <LabeledPhoneInput
                        label={contentForm.phone_number_field}
                        value={field.value}
                        placeholder="+62 841 9999 999"
                        onChange={({ value }) => {
                          field.onChange(value)
                        }}
                      />
                      {error && <div className="text-xs text-red-500 pt-1">{error?.message}</div>}
                    </div>
                  )}
                />
              </div>
            </div>
          </section>
        </section>
        <footer className="p-6 py-3 w-full border-t-2 border-gray-100 bg-white">
          <p className="text-center pb-3 uppercase">
            {!!time && !!date
              ? moment(date).format('ddd, MMMM Do') + ` • ${time}`
              : 'SELECT DATE & TIME'}
          </p>
          <Button
            disabled={!isEmpty(errors)}
            className="w-full text-center flex items-center justify-center"
            style={{ width: '100%' }}
          >
            {contentForm.form_primary_btn}
          </Button>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center w-full pt-3 justify-center hover:text-primary-500 text-lg text-gray-500"
          >
            {contentForm.form_secondary_btn}
          </button>
        </footer>
      </form>
    </>
  )
}

export default ScheduleLessonFormStepTwo
