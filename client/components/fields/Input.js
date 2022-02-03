import Link from '@/components/Link'

const Input = ({ as, placeholder, className, style, onChange, type, required, ...rest }) => (
  <input
    onChange={onChange}
    id={as}
    style={style}
    className={`w-full px-3 py-3 rounded bg-white border-2 border-gray-200 ${className}`}
    placeholder={placeholder}
    type={type}
    required={required}
    {...rest}
  />
)

export default Input
