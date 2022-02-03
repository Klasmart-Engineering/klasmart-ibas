import Input from '@/components/fields/Input'

const LabeledInput = ({
  as,
  placeholder,
  className,
  style,
  label,
  onChange,
  type,
  required,
  ...rest
}) => {
  return (
    <div className={` ${className}`}>
      <div>
        <label htmlFor={as} className="text-sm">
          {label}
        </label>
      </div>
      <Input
        id={as}
        placeholder={placeholder}
        style={style}
        onChange={onChange}
        type={type}
        required={required}
        {...rest}
      />
    </div>
  )
}

export default LabeledInput
