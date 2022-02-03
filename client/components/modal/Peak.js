import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { IoCloseCircle, IoLockOpen } from 'react-icons/io5'

import Overlay from '@/components/modal/Overlay'

const PeakWrapper = styled.div`
  position: fixed;
  display: block;
  background: white;
  padding: 0;
  margin: 0 auto;
  border-radius: 4px;
  text-align: left;
  top: 50vh;
  left: 50%;
  width: 400px;
  max-height: 300px;
  margin-top: -150px;
  margin-left: -200px;
  z-index: 1002;
  max-width: 820px;
  overflow: auto;
  box-shadow: 0 2px 32px 0 rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 40vh;
    border-radius: 8px 8px 0 0;
    bottom: 0;
    top: 60vh;
    left: 0;
    margin-left: 0;
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
  }

  /* only show when modal */
  ${(props) =>
    props.show &&
    css`
      display: block;
    `}
  ${(props) =>
    props.large &&
    css`
      max-height: 100%;
    `}

  width: 800px;
  left: calc(50% - 200px);
  top: 50px;
  max-height: 100%;
  height: calc(100vh - 50px);
  border-radius: 4px 4px 0 0;
  margin-top: 0;
`

const CloseLabel = styled.label`
  position: absolute;
  z-index: 1000;
  color: #111;
  cursor: pointer;
  font-weight: bold;

  & > * {
    box-shadow: 0 3px 13px rgba(51, 51, 51, 0.22);
    border-radius: 100%;
  }

  @media (max-width: 768px) {
    top: auto;
    left: 20px;
    bottom: 41vh;
    top: 56vh;
  }
`

export default ({
  children,
  className,
  id,
  show = false,
  big = false,
  onClose,
  style,
  large,
  transparent,
}) => {
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    if (show === true) {
      setTimeout(() => {
        setShowChildren(true)
      }, 600)
    } else if (show === false) {
      setShowChildren(false)
    }
  }, [show])

  useEffect(() => {
    return () => {
      setShowChildren(false)
    }
  }, [])

  const peak = (
    <Overlay show={show} onClose={onClose} transparent={transparent}>
      <style>
        {`
					  .peak-enter {
					  	opacity: 0.01;
						  transform: translateY(50%);
						}

						.peak-enter.peak-enter-active {
							opacity: 1;
						  transform: translateY(0px);
						  transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
						}

						.peak-exit {
							opacity: 1;
							transform: translateY(0px);
						}

						.peak-exit.peak-exit-active {
							opacity: 0.01;
							transform: translateY(50%);
						  transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
						}
	  			`}
      </style>
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="peak" timeout={{ enter: 600, exit: 600 }}>
            <PeakWrapper
              style={style}
              show={show}
              large={large}
              big={big}
              className={`bg-white dark:bg-gray-900 ${className}`}
              id={id}
            >
              <CloseLabel
                onClick={onClose}
                className={`text-white dark:text-gray-300 right-6 top-6`}
              >
                <IoCloseCircle size={32} />
              </CloseLabel>
              {showChildren && children}
            </PeakWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Overlay>
  )

  if (!process.browser) return null
  return ReactDOM.createPortal(peak, document.getElementsByTagName('body')[0])
}
