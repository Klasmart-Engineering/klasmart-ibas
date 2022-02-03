import Input from '@/components/fields/Input'
import NumberFormat from 'react-number-format'

const LabeledPhoneInput = (props) => {
  const { as, placeholder, className, style, label, onChange, type, required, ...rest } = props

  return (
    <div className={` ${className}`}>
      <div>
        <label htmlFor={as} className="text-sm">
          {label}
        </label>
      </div>
      <NumberFormat
        customInput={Input}
        format="+62 ### #### #### ####"
        placeholder={placeholder}
        mask=" "
        onValueChange={onChange}
        required={required}
        {...rest}
      />
    </div>
  )
}

export default LabeledPhoneInput
