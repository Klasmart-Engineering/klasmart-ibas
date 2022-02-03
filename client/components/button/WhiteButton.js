import Link from '@/components/Link'

const WhiteButton = ({ children, href, className, onClick }) => {
  if (!href) {
    return (
      <button
        onClick={onClick}
        className={`flex whitespace-nowrap flex-nowrap items-center justify-center border-b-4 border-gray-400 px-10 w-auto py-4 font-semibold text-gray-900 dark:text-gray-100 bg-white hover:bg-gray-100 text-black font-bold rounded-xl ${className} `}
      >
        {children}
      </button>
    )
  }
  return (
    <Link href={href} onClick={onClick}>
      <button
        onClick={onClick}
        className={`flex whitespace-nowrap flex-nowrap items-center justify-center border-b-4 border-gray-400 px-10 w-auto py-4 font-semibold text-gray-900 dark:text-gray-100 bg-white hover:bg-gray-100 text-black font-bold rounded-lg ${className} `}
      >
        {children}
      </button>
    </Link>
  )
}

export default WhiteButton
