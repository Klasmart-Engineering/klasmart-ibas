import Dashboard from '../../components/Dashboard'
import { withAuth } from '../../lib/utils/auth'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { privateApi, url } from '../../lib/utils/requests'
import { IoDownloadOutline } from 'react-icons/io5'
import DataList from '../../components/DataList'
import moment from 'moment'
import { normalize } from '../../lib/utils/transformers'

const defaultFilter = {
  _q: '',
  start: moment().format('YYYY-MM-DD'),
  end: '',
}

const HomePage = () => {
  const [filter, setFilter] = useState({ ...defaultFilter })
  const [schedules, setSchedules] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { ...filter },
  })

  const handleFilter = (values) => {
    if (!values._q) delete values._q
    if (!values.start) delete values.start
    if (!values.end) delete values.end

    setFilter(values)
  }

  const loadSchedules = (params = {}) => {
    const formatedParams = {}

    if (params?._q) formatedParams['_q'] = params._q

    if (params?.start) {
      formatedParams['date_gte'] = params.start
    }

    if (params?.end) {
      formatedParams['date_lte'] = params.end
    }

    privateApi()
      .get('schedules', {
        params: { ...formatedParams, _sort: 'date:ASC', _limit: -1 },
      })
      .then((res) => {
        setSchedules(normalize(res.data))
      })
  }

  const handleDownload = () => {
    const params = []
    if (filter?.start) params.push(`start=${filter.start}`)
    if (filter?.end) params.push(`end=${filter.end}`)

    window.open(url(`download_schedules?${params.join('&')}`))
  }

  const columns = [
    {
      Header: '#',
      accessor: 'id',
    },
    {
      Header: 'DATE',
      accessor: 'date',
      Cell: function DateItem({ row }) {
        return <>{moment(row?.original?.date).format('DD/MM/YYYY')}</>
      },
    },
    {
      Header: 'TIME',
      accessor: 'time',
    },
    {
      Header: 'PHONE',
      accessor: 'phone',
    },
    {
      Header: 'NAME',
      accessor: 'parent_name',
    },
    {
      Header: 'EMAIL',
      accessor: 'email',
    },
    {
      Header: 'CHILD',
      Cell: function ChildItem({ row }) {
        return <>{row?.original?.children?.length}</>
      },
    },
    {
      Header: 'ACTION',
      Cell: function ActionItem({ row }) {
        return (
          <>
            <button
              type="button"
              className="text-blue-400 cursor-pointer bg-transparent rounded hover:bg-blue-100 px-2 py-1 transition"
              onClick={() => setSelectedSchedule(row.original)}
            >
              Show
            </button>
          </>
        )
      },
    },
  ]

  useEffect(() => {
    loadSchedules(filter)
  }, [filter])

  useEffect(() => {
    loadSchedules(filter)
  }, [])

  return (
    <Dashboard title="Schedules">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <div className="font-bold mb-4">Filter</div>
          <form onSubmit={handleSubmit(handleFilter)}>
            <div className="mb-4">
              <input
                className="w-full bg-transparent border rounded px-2 py-1"
                name="_q"
                placeholder="Search..."
                {...register('_q')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="start">
                Start
              </label>
              <input
                className="w-full bg-transparent border rounded px-2 py-1"
                id="start"
                name="start"
                type="date"
                {...register('start')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="end">
                End
              </label>
              <input
                className="w-full bg-transparent border rounded px-2 py-1"
                id="end"
                name="end"
                type="date"
                {...register('end')}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-400 text-white px-2 py-1 rounded mb-2"
              >
                Apply
              </button>
              <button
                onClick={() => reset()}
                type="submit"
                className="w-full border px-2 py-1 rounded"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-9">
          <div className="flex justify-end w-full mb-4">
            <button
              onClick={() => handleDownload()}
              type="button"
              className="w-min border px-2 py-1 rounded whitespace-nowrap flex items-center"
            >
              <IoDownloadOutline className="mr-2" />
              Download CSV
            </button>
          </div>

          <div>
            <DataList columns={columns} data={schedules} />
          </div>
        </div>
      </div>

      {selectedSchedule && (
        <div className="fixed inset-0 z-10 bg-black/25">
          <div className="w-[480px] absolute right-0 h-screen p-4">
            <div className="h-full w-full bg-white rounded-lg">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">SCHEDULE DETAIL #{selectedSchedule?.id}</h2>
                <button onClick={() => setSelectedSchedule(null)}>&times;</button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4 border-b border-gray-200 pb-1">
                  <div>Date</div>
                  <div>
                    :{' '}
                    {selectedSchedule?.date && moment(selectedSchedule?.date).format('DD/MM/YYYY')}{' '}
                    {selectedSchedule?.time}
                  </div>
                </div>
                <div className="font-bold">Parent</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>Name</div>
                  <div>: {selectedSchedule?.parent_name}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>Phone</div>
                  <div>: {selectedSchedule?.phone}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>Email</div>
                  <div>
                    :{' '}
                    <a className="underline" href={`mailto:${selectedSchedule?.email}`}>
                      {selectedSchedule?.email}
                    </a>
                  </div>
                </div>
                <div className="font-bold border-b border-gray-200 mb-2 pb-1">
                  Children ({selectedSchedule?.children?.length})
                </div>
                {selectedSchedule?.children?.map((child, childIndex) => (
                  <div key={`child-${childIndex}`} className="mb-2 border-b border-gray-200">
                    <div className="font-bold">{child?.name}</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>{child?.age} Yo</div>
                      <div>Grade {child?.grade}</div>
                    </div>
                    <div>School: {child?.school_name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Dashboard>
  )
}

export default withAuth(HomePage)
