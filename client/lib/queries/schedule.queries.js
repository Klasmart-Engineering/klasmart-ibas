import { api } from '@/lib/utils/requests'

let _apiHost = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://badanamu-api.herokuapp.com'

export const schedulesQuery = async (params) => {
  try {
    const schedulesr = await api().get(`${_apiHost}/schedules`, params)
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
    const scheduler = await api().get(`${_apiHost}/schedules/${id}`)
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
    const scheduler = await api().post(`${_apiHost}s/chedules`, {
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
  const schedule = await api().get(`${_apiHost}/schedules-setting`, params)
  const schedules = schedule.data
  return { data: schedules }
}

export const scheduleAllocationQuery = async (params) => {
  const schedule = await api().get(
    `${_apiHost}/schedule-allocations`,
    params
  )
  const schedules = schedule.data
  return { data: schedules }
}
