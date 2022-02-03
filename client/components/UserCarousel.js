import { IoEllipseSharp } from 'react-icons/io5'
import Slider from 'react-slick'
import Image from 'next/image'

const UserCarousel = ({ items, slides = 1, dots = true }) => {
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
          <UserCarouselItem key={index} {...i} first={index === 0} index={index} />
        ))}
      </Slider>
    </div>
  )
}

const UserCarouselItem = ({ name, image, title, position = false }) => {
  return (
    <div key={name} className={`p-6 flex flex-col items-center ml-6 px-0 mr-6`}>
      <div className="relative h-96 md:w-9/12 rounded-xl" style={{ background: '#FFFAEC' }}>
        <div className="flex justify-center pt-7 md:justify-start md:pl-24 md:pt-24">
          <div className="rounded-full h-24 w-24 md:w-48 md:h-48 flex">
            <Image
              alt="image"
              className="rounded-full md:w-48 md:h-48"
              height={202}
              width={202}
              src={image}
            />
          </div>
        </div>
        <div className="md:absolute md:left-60 md:top-24 md:px-20 py-6 px-11">
          <div className="text-lg md:text-2xl md:text-justify">{title}</div>
        </div>
        <div className="flex md:absolute md:left-72 md:top-56 flex-nowrap pl-11">
          <Image alt="imageLine" src="/static/images/line.png" height={4} width={4} />
          <div className="pl-6">
            <div>{name}</div>
            <div className="text-gray-400">{position}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCarousel
