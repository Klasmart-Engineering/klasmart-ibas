import { api } from '@/lib/utils/requests'
import { normalize } from '../utils/transformers'

export const schedulesQuery = async (params) => {
  try {
    const schedulesr = await api().get('schedules', params)
    const schedules = normalize(schedulesr.data)
    return { data: schedules }
  } catch (error) {
    // Handle error.
    var errorMessage = error.response
    console.log(errorMessage)
    return { error: true, data: errorMessage }
  }
}

export const scheduleQuery = async (id) => {
  try {
    const scheduler = await api().get(`schedules/${id}`)
    const schedule = normalize(scheduler.data[0])
    return { data: schedule }
  } catch (error) {
    // Handle error.
    var errorMessage = error.response
    console.log(errorMessage)
    return { error: true, data: errorMessage }
  }
}

export const createScheduleQuery = async (values) => {
  try {
    const scheduler = await api().post('schedules', {
      ...values,
    })
    const schedule = normalize(scheduler.data)
    return { data: schedule }
  } catch (error) {
    // Handle error.
    var errorMessage = error.response
    console.log(errorMessage)
    return { error: true, data: errorMessage }
  }
}

export const scheduleSettingQuery = async (params) => {
  const schedule = await api().get('schedules-setting', params)
  const schedules = normalize(schedule.data)
  return { data: schedules }
}

export const scheduleAllocationQuery = async (params) => {
  const schedule = await api().get('schedule-allocations', params)
  const schedules = normalize(schedule.data)
  return { data: schedules }
}
