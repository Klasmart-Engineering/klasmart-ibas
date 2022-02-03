import Button from '@/components/button/Button'
import { useEffect, useMemo, useState } from 'react'
import { Oval, ThreeDots } from 'react-loading-icons'
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker'
import Slider from 'react-slick'
import moment from 'moment'
import { useSchedules } from '../../../lib/hooks/useSchedules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import axios from 'axios'
import { useRouter } from 'next/router'
import { url } from '../../../lib/utils/requests'

const schema = yup
  .object({
    date: yup.string().required(),
    times: yup.string().required(),
  })
  .required()

const NextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={`absolute z-[2] -translate-x-[50%] left-[358px] bottom-2`}>
      <button type="button" onClick={onClick}>
        <IoChevronForwardOutline />
      </button>
    </div>
  )
}

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={`absolute z-[2] -translate-x-[50%] bottom-2`}>
      <button type="button" onClick={onClick}>
        <IoChevronBackOutline />
      </button>
    </div>
  )
}

const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

const ScheduleLessonFormStepOne = (props) => {
  const { className, style, onContinue } = props

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

  const { handleSubmit, watch, control } = useForm({
    defaultValues: {
      date: '',
      time: '',
    },
  })

  const [watchDate, watchTime] = watch(['date', 'time'])

  const {
    getFilteredSchedules,
    getAvailableSlotsRemaining,
    getScheduleAllocation,
    isSlotAvailable,
    isLoading,
  } = useSchedules()

  const remainingSlots = getAvailableSlotsRemaining(watchDate, watchTime)

  const getMinimumDate = () => {
    const today = moment().startOf('days')
    const minDate = moment(today).add(2, 'days')

    return {
      year: minDate.get('year'),
      month: minDate.get('month') + 1,
      day: minDate.get('date'),
    }
  }

  const onSubmit = (values) => {
    values['remaining_slots'] = remainingSlots
    onContinue(values)
  }

  // get available slots on specified date;
  useEffect(() => {
    if (watchDate) {
      getFilteredSchedules({ params: { date: watchDate } })
    }
  }, [watchDate])

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
            <div className="h-4 w-4 rounded-full bg-primary-200" />
            <div className="h-4 w-4 rounded-full bg-primary-200" />
          </div>
          <p className="pb-0 block text-primary-500 font-bold">{contentForm.date_time_title}</p>
        </section>
        <section className="flex-grow overflow-auto overflow-x-hidden">
          <section className="px-6 pt-6 pb-3 border-b-2 border-gray-100 block md:hidden">
            <div className="pb-3 flex space-x-3">
              <div className="h-4 w-4 rounded-full bg-primary-500" />
              <div className="h-4 w-4 rounded-full bg-primary-200" />
              <div className="h-4 w-4 rounded-full bg-primary-200" />
            </div>
            <p className="pb-0 block text-primary-500 font-bold">{contentForm.date_time_title}</p>
          </section>
          <section className="pb-0">
            <div className="grid grid-cols-4 items-center">
              <div className="col-span-4 relative pb-2">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      colorPrimary="#FFE598"
                      calendarClassName="responsive-calendar shadow-none w-full"
                      value={
                        field.value
                          ? {
                              day: moment(field.value).get('D'),
                              month: moment(field.value).get('M') + 1,
                              year: moment(field.value).get('Y'),
                            }
                          : null
                      }
                      minimumDate={getMinimumDate()}
                      onChange={({ day, month, year }) => {
                        field.onChange(moment(`${year}-${month}-${day}`).format('YYYY-MM-DD'))
                      }}
                      shouldHighlightWeekends
                    />
                  )}
                />
              </div>
              <div className="col-span-4 relative">
                <p className="px-6 pb-3">{contentForm.select_time_label}</p>
                <div className="pb-3 flex space-x-3">
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <Slider
                        className="mb-0 w-full overflow-hidden"
                        dots={false}
                        variableWidth={false}
                        infinite={false}
                        speed={500}
                        arrows={true}
                        mobileFirst={true}
                        slidesToShow={3.5}
                        focusOnSelect={true}
                        slidesToScroll={3}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                      >
                        {times.map((t, index) => (
                          <div key={t} className={`pr-0 pl-6 w-full`}>
                            <button
                              onClick={() => {
                                field.onChange(t)
                              }}
                              type="button"
                              className={`block h-full py-2 w-full text-center rounded-lg border-2 border-gray-200 bg-white hover:bg-gray-200 ${
                                field.value === t &&
                                'bg-yellow-200 border-yellow-200 hover:bg-yellow-200'
                              }
                          `}
                            >
                              {t}
                            </button>
                          </div>
                        ))}
                        <div className="pr-6" />
                      </Slider>
                    )}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
        <footer className="p-6 py-3 w-full border-t-2 border-gray-100 bg-white">
          <p className="text-center pb-0 uppercase">
            {!!watchTime && !!watchDate
              ? moment(watchDate).format('ddd, MMMM Do') + ` • ${watchTime}`
              : `${contentForm.check_availability_slot}`}
          </p>
          <p
            className={`flex items-center justify-center text-center pb-3 text-sm text-primary-500`}
          >
            {isLoading ? (
              <ThreeDots stroke="#333333" fill="#333333" height={20} width={20} />
            ) : watchDate && watchTime ? (
              `${remainingSlots} ${contentForm.avalaible_slot_label}`
            ) : (
              `select a ${!watchDate ? 'date' : ''}${!watchDate && !watchTime ? ' & ' : ''}${
                !watchTime ? 'time' : ''
              } to get started`
            )}
          </p>

          <Button
            disabled={!isSlotAvailable(watchDate, watchTime) || isLoading}
            type="submit"
            className="w-full text-center flex items-center justify-center"
            style={{ width: '100%' }}
          >
            {isLoading ? (
              <ThreeDots stroke="#ffffff" fill="#ffffff" height={24} width={24} />
            ) : (
              contentForm.form_primary_btn
            )}
          </Button>
        </footer>
      </form>
    </>
  )
}

export default ScheduleLessonFormStepOne
