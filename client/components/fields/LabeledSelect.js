import Select from '@/components/fields/Select'
import Button from '../button/Button'

const LabeledSelect = ({ as, placeholder, className, style, label }) => {
  return (
    <div className={` ${className} relative`}>
      <div>
        <label htmlFor={as} className="text-sm">
          {label}
        </label>
      </div>
      <div>
        <Select id={as} placeholder={placeholder} style={style} />
      </div>
    </div>
  )
}

export default LabeledSelect
