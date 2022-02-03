import { api } from '@/lib/utils/requests'

export const schedulesQuery = async (params) => {
  try {
    const schedulesr = await api().get('https://badanamu-api.herokuapp.com/schedules', params)
    const schedules = schedulesr.data
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
    const scheduler = await api().get(`https://badanamu-api.herokuapp.com/schedules/${id}`)
    const schedule = scheduler.data[0]
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
    const scheduler = await api().post('https://badanamu-api.herokuapp.com/schedules', {
      ...values,
    })
    const schedule = scheduler.data
    return { data: schedule }
  } catch (error) {
    // Handle error.
    var errorMessage = error.response
    console.log(errorMessage)
    return { error: true, data: errorMessage }
  }
}

export const scheduleSettingQuery = async (params) => {
  const schedule = await api().get('https://badanamu-api.herokuapp.com/schedules-setting', params)
  const schedules = schedule.data
  return { data: schedules }
}

export const scheduleAllocationQuery = async (params) => {
  const schedule = await api().get(
    'https://badanamu-api.herokuapp.com/schedule-allocations',
    params
  )
  const schedules = schedule.data
  return { data: schedules }
}
