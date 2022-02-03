import Slider from 'react-slick'
import Image from 'next/image'

const Carousel = ({ items }) => {
  return (
    <div className="pt-0 pb-0 w-full relative">
      <Slider
        className="mb-0 w-full"
        dots={true}
        variableWidth={false}
        infinite={true}
        speed={500}
        arrows={false}
        mobileFirst={true}
        slidesToShow={1.05}
        focusOnSelect={true}
        slidesToScroll={1}
      >
        {items.map((i, index) => (
          <CarouselItem key={i.id} {...i} first={index === 0} index={index} />
        ))}
      </Slider>
    </div>
  )
}

const CarouselItem = ({ title, id, text, image, index, first = false }) => {
  return (
    <div
      key={id}
      className={`${
        first && 'pl-12'
      } ml-0 p-6 flex flex-col items-center w-full border-r-2 border-primary-500 border-dashed`}
    >
      <Image
        alt="imageCarausel"
        // className="inline object-cover w-16 h-16 mr-2 rounded-full mb-6"
        src={image}
        height={80}
        width={80}
      />
      <h1 className="font-bold text-lg mb-2 mt-6 text-gray-700 text-center">{title}</h1>
      <p className="bold font-regular px-3 text-md text-gray-500 text-center">{text}</p>
    </div>
  )
}

export default Carousel
