import Button from '@/components/button/Button'
import { ThreeDots } from 'react-loading-icons'
import moment from 'moment'
import LabeledInput from '../../fields/LabeledInput'
import { useSchedules } from '../../../lib/hooks/useSchedules'
import { useEffect, useState, useMemo } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { isEmpty } from 'lodash'
import axios from 'axios'
import { useRouter } from 'next/router'
import { url } from '../../../lib/utils/requests'
import { schedulesQuery } from '../../../lib/queries/schedule.queries'

const validationSchema = yup.object().shape({
  children: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Required'),
      age: yup.string().required('Required'),
      grade: yup.string().required('Required'),
      school_name: yup.string().required('Required'),
    })
  ),
})

const childrenDefaultValue = {
  name: '',
  age: '',
  grade: '',
  school_name: '',
}

const ScheduleLessonFormStepThree = (props) => {
  const { className, style, formValues, onBack, onContinue } = props

  const { date, time, remaining_slots = 0 } = formValues

  const { createSchedule } = useSchedules()

  const [contentForm, setContentForm] = useState([])
  const router = useRouter()

  const locale = useMemo(() => {
    return router?.locale || 'en'
  }, [router?.locale])

  const loadContentForm = () => {
    axios.get(url(`schedule-form-copy?_locale=${locale}`)).then((res) => setContentForm(res.data))
  }

  useEffect(() => {
    loadContentForm()
  }, [locale])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: { children: [{ ...childrenDefaultValue }] },
    resolver: yupResolver(validationSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  })

  const onSubmit = async (values) => {
    const finalValues = {
      ...formValues,
      ...values,
    }

    finalValues['time'] = `${finalValues['time']}:00`
    finalValues['schedule_status'] = 1

    try {
      const schedule = await createSchedule({ ...finalValues })
      onContinue(values)
    } catch (err) {
      console.log(err)
    }
  }

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
            <div className="h-4 w-4 rounded-full bg-primary-500" />
          </div>
          <p className="pb-0 block text-primary-500 font-bold">{contentForm.child_title}</p>
        </section>
        <section className="flex-grow overflow-auto overflow-x-hidden">
          <section className="px-6 pt-6 pb-3 border-b-2 border-gray-100 block md:hidden">
            <div className="pb-3 flex space-x-3">
              <div className="h-4 w-4 rounded-full bg-primary-500" />
              <div className="h-4 w-4 rounded-full bg-primary-500" />
              <div className="h-4 w-4 rounded-full bg-primary-500" />
            </div>
            <p className="pb-0 block text-primary-500 font-bold">{contentForm.child_title}</p>
          </section>

          {fields.map((item, i) => (
            <section key={item.id}>
              <div className="px-6 w-full font-bold flex justify-between mb-2 pb-2 pt-2 bg-gray-100">
                {contentForm.form_child_title} {i + 1}{' '}
                {fields.length > 1 && (
                  <button className="text-sm text-red-500" onClick={() => remove(i)}>
                    Remove
                  </button>
                )}
              </div>
              <div key={i} className="grid grid-cols-4 items-center py-3">
                <div className="col-span-4 relative pb-3 px-6">
                  <Controller
                    name={`children.${i}.name`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <LabeledInput
                          label={contentForm.child_name_field}
                          type="text"
                          value={field.value}
                          placeholder="Komang Wisnu..."
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                        />
                        {error && <div className="text-xs text-red-500 pt-1">{error?.message}</div>}
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-4 relative pb-3 p-6 flex space-x-6">
                  <Controller
                    name={`children.${i}.age`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <LabeledInput
                          label={contentForm.age_field}
                          type="number"
                          value={field.value}
                          placeholder="7..."
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                        />
                        {error && <div className="text-xs text-red-500 pt-1">{error?.message}</div>}
                      </div>
                    )}
                  />

                  <Controller
                    name={`children.${i}.grade`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <LabeledInput
                          label={contentForm.grade_field}
                          value={field.grade}
                          placeholder="2..."
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                        />
                        {error && <div className="text-xs text-red-500 pt-1">{error?.message}</div>}
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-4 relative pb-3 p-6">
                  <Controller
                    name={`children.${i}.school_name`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <LabeledInput
                          label={contentForm.school_name_field}
                          type="text"
                          value={field.value}
                          placeholder="International School.."
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                        />
                        {error && <div className="text-xs text-red-500 pt-1">{error?.message}</div>}
                      </div>
                    )}
                  />
                </div>
              </div>
            </section>
          ))}

          {fields.length < remaining_slots && (
            <div className="px-6 pb-6">
              <Button
                type="button"
                style={{ width: '100%' }}
                onClick={() => append(childrenDefaultValue)}
              >
                {contentForm.add_more_child_btn}
              </Button>
            </div>
          )}
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
            {contentForm.schedule_lesson_btn}
          </Button>
          <button
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

export default ScheduleLessonFormStepThree
