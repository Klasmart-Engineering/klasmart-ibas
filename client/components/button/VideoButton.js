import Link from '@/components/Link'
import { useEffect, useState } from 'react'
import EmailForm from '../forms/EmailForm'
import Modal from '../modal/Modal'
import VideoModal from '../modal/VideoModal'
import Button from './Button'
import WhiteButton from './WhiteButton'

const VideoButton = ({ children = 'Try for Free' }) => {
  const [showVideo, setshowVideo] = useState(false)
  return (
    <>
      <VideoModal show={showVideo} onClose={() => setshowVideo(false)} />
      <WhiteButton
        onClick={() => {
          setshowVideo(true)
        }}
      >
        {children}
      </WhiteButton>
    </>
  )
}

export default VideoButton
