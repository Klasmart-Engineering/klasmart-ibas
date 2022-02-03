import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { IconButton, Button } from '@/components/button/Button'

const PeakWrapper = styled.div`
  position: relative;
  display: flex;
  background: white;
  padding: 0;
  margin: 0 auto;
  border-radius: 4px;
  padding: 15px;
  text-align: left;
  width: 600px;
  max-height: 500px;
  z-index: 1002;
  max-width: 820px;
  overflow: auto;
  box-shadow: 0 2px 32px 0 rgba(0, 0, 0, 0.08);
  justify-content: stretch;

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
`

const ImageWrapper = styled.div`
  width: 40%;
  padding: 15px;
`

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`

const ContentWrapper = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const TooltipTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`

const ActionWrapper = styled.div`
  padding-top: 15px;
`

const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}) => {
  return (
    <PeakWrapper
      {...tooltipProps}
      style={{
        width: step.img ? '600px' : '400px',
      }}
    >
      {step.img && (
        <ImageWrapper>
          <Image alt="image" src={step.img} />
        </ImageWrapper>
      )}
      <ContentWrapper>
        <div>
          {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
          {step.content}
        </div>
        {continuous && (
          <ActionWrapper>
            {step.buttonText && <Button {...primaryProps}>{step.buttonText}</Button>}
          </ActionWrapper>
        )}
      </ContentWrapper>
    </PeakWrapper>
  )
}

export default Tooltip
