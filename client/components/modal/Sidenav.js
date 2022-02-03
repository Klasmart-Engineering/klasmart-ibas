import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Overlay from '@/components/modal/Overlay'

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: block;
  background: white;
  padding: 25px;
  margin: 0 auto;
  border-radius: 0;
  text-align: left;
  width: 400px;
  height: 100%;
  z-index: 1001;
  max-width: 820px;
  overflow: auto;
  box-shadow: 0 2px 32px 0 rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 100vh;
    border-radius: 0 0;
  }

  /* only show when modal */
  ${(props) =>
    props.show &&
    css`
      display: block;
    `}

  @media (max-width: 768px) {
    width: 100%;
  }
`

const CloseLabel = styled.label`
  position: fixed;
  right: 25px;
  top: 30px;
  padding: 0;
  border-radius: 100%;
  z-index: 101;
  color: #333;
  cursor: pointer;
  & > * {
    box-shadow: 0 3px 13px rgba(51, 51, 51, 0.22);
    border-radius: 100%;
  }
`

const Sidenav = ({ children, show = false, hideClose = false, onClose, style, transparent }) => {
  const [showChildren, setShowChildren] = useState(false)
  const changeStyle = style

  useEffect(() => {
    setTimeout(() => {
      setShowChildren(true)
    }, 600)
  }, [show])

  const modal = (
    <Overlay show={show} onClose={onClose} transparent={transparent}>
      <style>
        {`
				  .modal-enter {
				  	opacity: 0.01;
					  transform: translateX(60px);
					}

					.modal-enter.modal-enter-active {
						opacity: 1;
					  transform: translateX(0px);
					  transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
					}

					.modal-exit {
						opacity: 1;
						transform: translateX(0px);
					}

					.modal-exit.modal-exit-active {
						opacity: 0.01;
						transform: translateX(60px);
					  transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
					}
  			`}
      </style>
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="modal" timeout={{ enter: 600, exit: 600 }}>
            <ModalWrapper style={changeStyle} show={show}>
              {!hideClose && (
                <CloseLabel onClick={onClose} className="notouchmove">
                  x
                </CloseLabel>
              )}
              {showChildren && children}
            </ModalWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Overlay>
  )
  if (!process.browser) return null
  return ReactDOM.createPortal(modal, document.getElementsByTagName('body')[0])
}

export default Sidenav
