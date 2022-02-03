import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { IoClose, IoLockOpen } from 'react-icons/io5'

import Overlay from '@/components/modal/Overlay'

const VideoModalWrapper = styled.div`
  position: fixed;
  display: block;
  background: white;
  padding: 0;
  margin: 0 auto;
  border-radius: 8px;
  text-align: left;
  top: 50vh;
  left: 50%;
  width: 650px;
  max-height: 450px;
  margin-top: -225px;
  margin-left: -325px;
  z-index: 1004;
  max-width: 820px;
  overflow: auto;
  box-shadow: 0 2px 32px 0 rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    // height: 90vh;
    border-radius: 8px 8px 0 0;
    bottom: 0;
    // top: 10vh;
    max-height: 400;
    height: 400;
    left: 0;
    top: auto;
    margin-left: 0;
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
  }

  /* only show when videoModal */
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
    top: auto;
    left: 20px;
    bottom: 41vh;
    display: none;
    top: 20px;
  }
`

const VideoModal = ({
  children,
  className,
  id,
  label = false,
  show = false,
  src = 'https://www.youtube.com/embed/3d78jKC_woE',
  hideClose = false,
  onClose,
  style,
  transparent,
}) => {
  const videoModal = (
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
            .videoModal-enter {
              opacity: 0.01;
              transform: translateY(50%);
            }

            .videoModal-enter.videoModal-enter-active {
              opacity: 1;
              transform: translateY(0px);
              transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
            }

            .videoModal-exit {
              opacity: 1;
              transform: translateY(0px);
            }

            .videoModal-exit.videoModal-exit-active {
              opacity: 0.01;
              transform: translateY(50%);
              transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
            }
          `}
      </style>
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="videoModal" timeout={{ enter: 600, exit: 600 }}>
            <VideoModalWrapper style={style} show={show} className={className} id={id}>
              <CloseLabel onClick={onClose} className="text-primary-500 top-4 right-3">
                <IoClose size={32} />
              </CloseLabel>
              <iframe
                width="100%"
                height="400"
                src={src}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoModalWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Overlay>
  )

  if (!process.browser) return null
  return ReactDOM.createPortal(videoModal, document.getElementsByTagName('body')[0])
}

export default VideoModal
