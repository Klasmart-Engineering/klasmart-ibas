import Link from '@/components/Link'

const Button = ({ children, href, className, onClick, ...rest }) => {
  if (!href) {
    return (
      <button
        {...rest}
        onClick={onClick}
        className={`disabled:bg-gray-300 disabled:border-gray-200 flex whitespace-nowrap flex-nowrap items-center justify-center border-b-4 border-primary-700 px-10 py-4 font-semibold text-gray-900 dark:text-gray-100 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl w-auto ${className} `}
      >
        {children}
      </button>
    )
  }
  return (
    <Link href={href} onClick={onClick}>
      <button
        {...rest}
        onClick={onClick}
        className={`disabled:bg-gray-300 disabled:border-gray-200 flex whitespace-nowrap flex-nowrap items-center justify-center border-b-4 border-primary-700 px-10 py-4 font-semibold text-gray-900 dark:text-gray-100 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg w-auto ${className} `}
      >
        {children}
      </button>
    </Link>
  )
}

export default Button
