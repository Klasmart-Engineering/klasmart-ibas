import { IoEllipseSharp } from 'react-icons/io5'
import Slider from 'react-slick'
import Image from 'next/image'

const GroupCarousel = ({ items, slides = 4, dots = false }) => {
  return (
    <div className="pt-0 pb-0 w-full relative">
      <Slider
        className="mb-0 w-full"
        dots={dots}
        variableWidth={false}
        infinite={true}
        speed={500}
        arrows={false}
        mobileFirst={true}
        slidesToShow={slides}
        focusOnSelect={true}
        slidesToScroll={1}
      >
        {items.map((i, index) => (
          <GroupCarouselItem key={index} {...i} first={index === 0} index={index} />
        ))}
      </Slider>
    </div>
  )
}

const GroupCarouselItem = ({ name, image, countmember, countdiscuss, title = false }) => {
  return (
    <div key={name} className={`p-6 flex flex-col items-center ml-6 px-0 mr-6`}>
      <div className="w-80">
        <div className="relative h-52">
          <Image alt="image" className="rounded-t-lg" src={image} width={341} height={241} />
          <div className="relative bottom-52 left-8">
            <div className="rounded-full left-8 w-24 top-16 bg-yellow-50">
              <p className="py-1 px-3 text-sm text-yellow-500">CATEGORY</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg w-80 h-64">
        <div className="flex items-center pt-6 pl-7 gap-2 justify-start">
          <p className="text-sm text-gray-300">{countmember}</p>
          <p>
            <IoEllipseSharp className="text-gray-400 w-1 h-1" />
          </p>
          <p className="text-xs text-gray-300">{countdiscuss}</p>
        </div>
        <div className="flex pl-7 w-72 h-24 pt-2">
          <p className="text-2xl">{title}</p>
        </div>
        <div className="flex pl-7 pt-7">
          <button className="rounded-lg w-32 h-14" style={{ background: '#28A5DA' }}>
            <a className="text-white">See details</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupCarousel
