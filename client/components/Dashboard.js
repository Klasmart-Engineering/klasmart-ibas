import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { removeCookie } from '../lib/utils/cookies'

// Create a client
const queryClient = new QueryClient()

const Dashboard = (props) => {
  const { title = '' } = props

  const router = useRouter()

  const handleLogout = () => {
    removeCookie('_kdslp_dash')
    router.push('/admin/signin')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="py-4 px-4 fixed top-0 left-0 right-0">
        <div className="h-[62px] w-full bg-white shadow-lg flex items-center justify-between px-6 border border-gray-200 rounded">
          <div>
            <div className="font-bold">DASHBOARD</div>
          </div>
          <div>
            <button
              className="text-black hover:text-red-500"
              type="button"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="pt-[100px] px-10">
        {title && <h1 className="text-4xl font-bold mb-6">{title}</h1>}
        <div>{props.children}</div>
      </div>
    </QueryClientProvider>
  )
}

export default Dashboard
