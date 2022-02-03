import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { IoClose, IoLockOpen } from 'react-icons/io5'

import Overlay from '@/components/modal/Overlay'

const ActionWrapper = styled.div`
  position: fixed;
  display: block;
  background: white;
  padding: 0;
  margin: 0 auto;
  border-radius: 8px;
  text-align: left;
  top: 5vh;
  bottom: 5vh;
  height: 90vh;
  left: 50%;
  width: 400px;
  margin-left: -200px;
  z-index: 1004;
  max-width: 820px;
  overflow: auto;
  box-shadow: 0 2px 32px 0 rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 97vh;
    border-radius: 8px 8px 0 0;
    bottom: 0;
    top: 3vh;
    max-height: 97vh;
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
`

const CloseLabel = styled.label`
  position: absolute;
  z-index: 1000;
  color: #111;
  cursor: pointer;
  font-weight: bold;

  & > * {
    border-radius: 100%;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 5vh;
  }
`

const Action = ({
  children,
  className,
  id,
  label = false,
  show = false,
  hideClose = false,
  onClose,
  style,
  transparent,
}) => {
  const action = (
    <Overlay
      show={show}
      onClose={onClose}
      transparent={transparent}
      style={{
        zIndex: 1003,
      }}
    >
      <style>
        {`
            .action-enter {
              opacity: 0.01;
              transform: translateY(10%);
            }

            .action-enter.action-enter-active {
              opacity: 1;
              transform: translateY(0px);
              transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
            }

            .action-exit {
              opacity: 1;
              transform: translateY(0px);
            }

            .action-exit.action-exit-active {
              opacity: 0.01;
              transform: translateY(10%);
              transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
            }
          `}
      </style>
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="action" timeout={{ enter: 600, exit: 600 }}>
            <ActionWrapper style={style} show={show} className={className} id={id}>
              <CloseLabel onClick={onClose} className="text-primary-500 top-4 right-3">
                <IoClose size={32} />
              </CloseLabel>
              {children}
            </ActionWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Overlay>
  )

  if (!process.browser) return null
  return ReactDOM.createPortal(action, document.getElementsByTagName('body')[0])
}

export default Action
