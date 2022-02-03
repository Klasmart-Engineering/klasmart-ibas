import { useState } from 'react'
import Slider from 'react-slick'
import VideoModal from './modal/VideoModal'
import Image from 'next/image'

const TeachersCarousel = ({ items, slides = 3, dots = true }) => {
  const [showVideo, setshowVideo] = useState(null)

  return (
    <div className="pt-0 pb-0 w-full relative">
      <VideoModal show={!!showVideo} src={showVideo} onClose={() => setshowVideo(false)} />
      <Slider
        className="mb-0 w-full"
        dots={dots}
        variableWidth={false}
        infinite={items.length > slides}
        speed={500}
        arrows={true}
        mobileFirst={true}
        slidesToShow={slides}
        focusOnSelect={false}
        slidesToScroll={1}
      >
        {items.map((i, index) => (
          <button
            key={i.id}
            onClick={() => {
              setshowVideo(i.video_url)
            }}
          >
            <TeachersCarouselItem key={i.id} {...i} first={index === 0} index={index} />
          </button>
        ))}
      </Slider>
    </div>
  )
}

const TeachersCarouselItem = ({
  name,
  video_url,
  teacher_experience,
  video_image,
  index,
  first = false,
}) => {
  return (
    <div key={index} className={`p-6 px-3 flex flex-col items-center`}>
      <div
        className={`p-0 flex flex-col items-start w-[360px] shadow-lg rounded-lg overflow-hidden`}
      >
        <div className="items-center justify-center flex">
          <Image src={video_image} alt="imagevideo" height={250} width={360} />
        </div>
        <div className="flex flex-col justify-center items-start p-6">
          <h1 className="font-bold text-lg mb-0 text-gray-900">{name}</h1>
          <p className="bold font-regular text-md text-left text-gray-700 h-40">
            {teacher_experience}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TeachersCarousel
