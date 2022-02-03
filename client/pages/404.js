import Link from '@/components/Link'
import Button from '../components/button/Button'

export default function FourZeroFour() {
  return (
    <div className="flex flex-col items-center py-36 pb-36 justify-start md:justify-center md:items-center md:flex-row md:space-x-6 md:mt-24">
      <div className="pt-6 pb-8 space-x-2 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-8xl md:leading-14 md:border-r-2 md:px-6">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-4xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8 leading text-lg">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link href="/">
          <Button className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-primary hover:bg-primary-700 dark:hover:bg-primary-500">
            Back to homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}
