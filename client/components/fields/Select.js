import { useState } from 'react'
import Peak from '@/components/modal/Peak'
import SelectCollateralList from '@/components/SelectCollateralList'
import { IoChevronDownOutline } from 'react-icons/io5'

export default function Select({ placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggling = () => setIsOpen(!isOpen)
  return (
    <div className="relative">
      <button
        onClick={toggling}
        className="w-full px-3 py-3 rounded mt-0 bg-gray-200 dark:bg-gray-700 text-left flex items-center"
      >
        <div className="opacity-30 flex-1">{placeholder}</div>
        <div className="">
          <IoChevronDownOutline />
        </div>
      </button>
      <Peak show={isOpen} onClose={() => setIsOpen(false)}>
        <SelectCollateralList />
      </Peak>
    </div>
  )
}
