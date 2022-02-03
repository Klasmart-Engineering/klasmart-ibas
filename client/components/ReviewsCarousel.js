import Slider from 'react-slick'
import Image from 'next/image'
import { IoCaretBackCircleSharp, IoCaretForwardCircleSharp } from 'react-icons/io5'

const NextArrow = (props) => {
  const { onClick } = props
  return (
    <button
      className={`absolute hidden md:flex md:z-[2] md:-bottom-[-70px] md:-translate-x-[50%] md:p-3`}
      style={{
        right: 'calc(50% - 70px)',
      }}
      onClick={onClick}
    >
      <IoCaretForwardCircleSharp className="text-7xl hover:text-blue-600 text-[#28A5DA]" />
    </button>
  )
}

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <button
      className={`absolute hidden md:flex md:z-[2] md:-bottom-24 md:-translate-x-[50%] md:p-3 md:px-10`}
      onClick={onClick}
      style={{
        right: 'calc(50% - 1px)',
      }}
    >
      <IoCaretBackCircleSharp className="text-7xl hover:text-blue-600 text-[#28A5DA]" />
    </button>
  )
}

const ReviewsCarousel = ({ items, slides = 3, dots = false }) => {
  return (
    <div className="pt-0 pb-0 w-full relative">
      <Slider
        className="mb-0 w-full"
        dots={dots}
        variableWidth={false}
        infinite={items.length > slides}
        speed={500}
        arrows={true}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        mobileFirst={true}
        slidesToShow={slides}
        focusOnSelect={false}
        slidesToScroll={1}
      >
        {items.map((i) => (
          <ReviewsCarouselItem key={i.id} {...i} />
        ))}
      </Slider>
    </div>
  )
}

const ReviewsCarouselItem = ({ name, description, job, image, id }) => {
  return (
    <div className={`p-6 flex flex-col items-center ml-6 px-0 mr-6`}>
      <div className={`md:p-9 p-5 flex flex-col items-start w-full shadow-lg rounded-lg`}>
        <div className="flex items-left pb-6 border-b-2 border-primary-500 border-dashed w-full">
          <div className="w-[80px] h-[80px] relative">
            <Image src={image} alt="imagerounded" layout="fill" objectFit="cover" />
          </div>
          <div className="flex flex-col justify-center items-start pl-2">
            <h1 className="font-bold text-lg mb-0 text-gray-700">{name}</h1>
            <p className="bold font-regular text-md text-gray-600">{job}</p>
          </div>
        </div>
        <p className="bold font-regular text-md text-gray-600 pt-6">{description}</p>
      </div>
    </div>
  )
}

export default ReviewsCarousel
