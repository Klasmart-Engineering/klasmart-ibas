import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Overlay from '@/components/modal/Overlay'

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background: white;
  padding: 0;
  margin: 0 auto;
  border-radius: 0;
  text-align: left;
  width: 250px;
  height: 100%;
  z-index: 1001;
  max-width: 820px;
  overflow: auto;

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

  ${(props) =>
    props.big &&
    css`
      position: fixed;
      left: auto;
      right: 0;
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

const ContainedModal = ({
  children,
  show = false,
  hideClose = false,
  onClose,
  style,
  transparent,
  big = false,
}) => {
  const changeStyle = style
  return (
    <Overlay contained={true} show={show} onClose={onClose} transparent={transparent}>
      <style>
        {`
          .contained-enter {
            opacity: 0.01;
            transform: translateX(-150px);
          }

          .contained-enter.contained-enter-active {
            opacity: 1;
            transform: translateX(0px);
            transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
          }

          .contained-exit {
            opacity: 1;
            transform: translateX(0px);
          }

          .contained-exit.contained-exit-active {
            opacity: 0.01;
            transform: translateX(-150px);
            transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
          }
        `}
      </style>
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="contained" timeout={{ enter: 600, exit: 600 }}>
            <ModalWrapper style={changeStyle} show={show} big={big}>
              {!hideClose && (
                <CloseLabel onClick={onClose} className="notouchmove">
                  x
                </CloseLabel>
              )}
              {children}
            </ModalWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Overlay>
  )
}

export default ContainedModal
