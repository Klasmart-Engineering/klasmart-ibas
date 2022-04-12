import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import moment from 'moment'
import { groupBy } from 'lodash'
import {
  scheduleQuery,
  schedulesQuery,
  createScheduleQuery,
  scheduleSettingQuery,
  scheduleAllocationQuery,
} from '../queries/schedule.queries'

const CurrentScheduleState = atom({
  key: 'CurrentScheduleState', // unique ID (with respect to other atoms/selectors)
  default: null,
})
const SchedulesState = atom({
  key: 'SchedulesState', // unique ID (with respect to other atoms/selectors)
  default: [],
})
const SchedulesIsLoadingState = atom({
  key: 'SchedulesIsLoadingState', // unique ID (with respect to other atoms/selectors)
  default: false,
})
const SchedulesErrorMessageState = atom({
  key: 'SchedulesErrorMessageState', // unique ID (with respect to other atoms/selectors)
  default: false,
})
const ScheduleSettings = atom({
  key: 'ScheduleSettings', // unique ID (with respect to other atoms/selectors)
  default: false,
})
const ScheduleAllocations = atom({
  key: 'ScheduleAllocations', // unique ID (with respect to other atoms/selectors)
  default: [],
})

export const useSchedules = () => {
  const [currentSchedule, setcurrentSchedule] = useRecoilState(CurrentScheduleState)
  const [schedules, setschedules] = useRecoilState(SchedulesState)
  const [isLoading, setisLoading] = useRecoilState(SchedulesIsLoadingState)
  const [errorMessage, seterrorMessage] = useRecoilState(SchedulesErrorMessageState)
  const [scheduleSettings, setScheduleSettings] = useRecoilState(ScheduleSettings)
  const [scheduleAllocations, setScheduleAllocations] = useRecoilState(ScheduleAllocations)

  useEffect(() => {
    getSchedules()
    getScheduleSettigns()

    // get all schedule on the year
    getScheduleAllocation({
      params: {
        start_date_gte: moment().startOf('year').format('YYYY-MM-DD'),
        end_date_lte: moment().endOf('year').format('YYYY-MM-DD'),
      },
    })
  }, [])

  const createSchedule = async (values) => {
    setisLoading(true)
    const requestBody = {data: values}

    const { error, data } = await createScheduleQuery(requestBody)
    if (error) {
      seterrorMessage(error)
    } else {
      setcurrentSchedule(data)
    }

    setisLoading(false)
  }

  const getScheduleById = async (id) => {
    setisLoading(true)

    const { error, data } = await scheduleQuery(id)
    if (error) {
      seterrorMessage(error)
    } else {
      setcurrentSchedule(data)
    }

    setisLoading(false)
  }

  const getFilteredSchedules = async (params) => {
    setisLoading(true)

    const { error, data } = await schedulesQuery(params)
    if (error) {
      seterrorMessage(error)
    } else {
      setschedules(data)
    }

    setisLoading(false)
  }

  const getSchedules = async () => {
    setisLoading(true)

    const { error, data } = await schedulesQuery()
    if (error) {
      seterrorMessage(error)
    } else {
      setschedules(data)
    }

    setisLoading(false)
  }

  const getScheduleSettigns = async (params) => {
    setisLoading(true)

    const { error, data } = await scheduleSettingQuery(params)
    if (error) {
      seterrorMessage(error)
    } else {
      setScheduleSettings(data)
    }

    setisLoading(false)
  }

  const getScheduleAllocation = async (params) => {
    setisLoading(true)
    const { error, data } = await scheduleAllocationQuery(params)
    if (error) {
      seterrorMessage(error)
    } else {
      setScheduleAllocations(data)
    }

    setisLoading(false)
  }

  const getAvailableSlotsRemaining = (selectedDay, selectedTime) => {
    if (!selectedDay) return 0
    if (!selectedTime) return 0
    if (isLoading) return 0

    const date = moment(selectedDay)

    // no available slot on weekend
    if (date.weekday() === 0 || date.weekday() === 6) return 0

    // no available slot on past date
    if (moment().diff(date, 'days') > 0) return 0

    selectedTime = `${selectedTime}:00`
    let maxSlotsPerDay = scheduleSettings?.max_allocation || 0

    const scheduleAllocation = scheduleAllocations.find(({ start_date, end_date }) => {
      return moment(selectedDay).isBetween(
        moment(start_date).subtract(1, 'day'),
        moment(end_date).add(1, 'day')
      )
    })

    if (scheduleAllocation) {
      const { allocation = 0 } = scheduleAllocation
      maxSlotsPerDay = allocation
    }

    let groupedSlots = groupBy(schedules, 'time')

    // ada slot kepakai
    let occupiedSlotCount = 0
    const occupiedSlots = groupedSlots[selectedTime] || null
    if (occupiedSlots) {
      occupiedSlots.forEach((slot) => {
        occupiedSlotCount = occupiedSlotCount + slot.children.length
      })
    }

    return maxSlotsPerDay - occupiedSlotCount
  }

  const isSlotAvailable = (selectedDay, selectedTime) => {
    if (!selectedDay) return false
    if (!selectedTime) return false

    const availableSlotRemaining = getAvailableSlotsRemaining(selectedDay, selectedTime)
    if (availableSlotRemaining === 0) return false

    return true
  }

  return {
    isLoading,
    getSchedules,
    getScheduleById,
    createSchedule,
    schedules,
    currentSchedule,
    errorMessage,
    getAvailableSlotsRemaining,
    isSlotAvailable,
    getFilteredSchedules,
    getScheduleSettigns,
    getScheduleAllocation,
  }
}
1
