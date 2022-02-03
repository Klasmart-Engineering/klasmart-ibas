import { IoEllipseSharp } from 'react-icons/io5'
import Slider from 'react-slick'
import Image from 'next/image'

const MerchandiseCarousel = ({ items, slides = 4, dots = false }) => {
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
          <MerchandiseCarouselItem key={index} {...i} first={index === 0} index={index} />
        ))}
      </Slider>
    </div>
  )
}

const MerchandiseCarouselItem = ({ name, image, nameProduct, price = false }) => {
  return (
    <div key={name} className={`p-6 flex flex-col items-center ml-6 px-0 mr-6`}>
      <div className="relative w-80 h-56">
        <Image className="rounded-t-lg" src={image} alt="rounded" layout="fill" />
      </div>
      <div className="bg-white shadow-lg rounded-b-lg w-80 h-36">
        <div className="flex pt-6 pl-7">
          <p className="text-lg tracking-wider">{nameProduct}</p>
        </div>
        <div className="flex pt-6 pl-7">
          <p className="text-2xl" style={{ color: '#28A5DA' }}>
            {price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MerchandiseCarousel
