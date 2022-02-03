import { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { IoLockClosed, IoLockOpen } from 'react-icons/io5'

const StyledSwitch = styled('label')`
  display: inline-block;
  width: 60px;
  height: 30px;
  position: relative;
`

const ToggleThumb = styled('span')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: black;
  border-radius: 40px;
  cursor: pointer;
  transition: ease-in-out all 0.4s;

  ::before {
    content: '';
    height: 20px;
    width: 20px;
    position: absolute;
    left: 5px;
    bottom: 5px;
    border-radius: 50%;
    background-color: white;
    transition: 0.4s all ease;
  }

  > .checked-wrapper svg {
    color: white;
  }

  > .unchecked-wrapper svg {
    color: white;
  }
`

const Checkbox = styled('input').attrs((props) => ({
  type: 'checkbox',
}))`
  opacity: 0;
  width: 0;
  height: 0;

  :checked + ${ToggleThumb}:before {
    transform: translateX(30px);
  }
`

const Switch = (props, forwardedRef) => {
  const { checkedIcon, unCheckedIcon, name, defaultChecked, onChange, disabled } = props

  const [checked, setchecked] = useState(false)

  return (
    <>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => {
              setchecked(!checked)
            }}
          />
          <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
          <div
            className={`dot absolute left-1 top-1 bg-gray-700 dark:bg-white w-6 h-6 rounded-full transition ${
              checked && 'translate-x-full bg-indigo-500 dark:bg-indigo-500'
            }`}
          ></div>
        </div>
        <div className="ml-3 text-gray-600 font-medium text-sm dark:text-gray-400 flex items-center">
          <div className="ml-1">{checked ? 'Unlock' : 'Lock'}</div>
        </div>
      </label>
    </>
  )
}

export default Switch
