import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { disableScroll, enableScroll } from '@/lib/utils/dom'

const Overlay = styled.section`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 115px 0;
  z-index: 1000;
  background: rgba(233, 233, 233, 0.65);
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 0 0 0;
  }
  ${(props) =>
    props.show &&
    css`
      display: block;
    `}
`

const CloseLabel = styled.label`
  position: fixed;
  right: 45px;
  top: 23px;
  z-index: 100;
  color: #333,
  cursor: pointer;
`

const IsOverlay = ({ children, modal, onClose, style, show, hideClose, transparent, ...props }) => {
  const [mounted, setmounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      setmounted(true)
    }

    return () => {
      enableScroll()
    }
  }, [])

  if (!process.browser || !window || !mounted) return null
  if (show) {
    disableScroll()
  } else {
    enableScroll()
  }
  return (
    <>
      <style>
        {`
          .overlay-enter {
            background: ${transparent ? 'rgba(233,233,233,0.0)' : 'rgba(233,233,233,0.01)'};
          }
          .overlay-enter.overlay-enter-active {
            background: ${transparent ? 'rgba(233,233,233,0.0)' : 'rgba(233,233,233,0.65)'};
            transition: background 333ms cubic-bezier(0.25, 0.1, 0.25, 1);
          }
          .overlay-exit {
            background: ${transparent ? 'rgba(233,233,233,0.0)' : 'rgba(233,233,233,0.65)'};
          }
          .overlay-exit.overlay-exit-active {
            background: ${transparent ? 'rgba(233,233,233,0.0)' : 'rgba(233,233,233,0.01)'};
            transition: background 333ms cubic-bezier(0.25, 0.1, 0.25, 1);
          }
        `}
      </style>
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="overlay" timeout={{ enter: 333, exit: 333 }}>
            <Overlay
              className="Overlay"
              style={{
                ...style,
                ...(transparent && { background: 'rgba(3,3,3,0.0)' }),
              }}
              onClick={(e) => {
                if (e.target.className.indexOf('Overlay') > -1) {
                  onClose()
                }
              }}
              show={show}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
      {children}
    </>
  )
}

export default IsOverlay
