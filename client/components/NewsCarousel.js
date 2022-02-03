import Slider from 'react-slick'
import Image from 'next/image'

const NewsCarousel = ({ items, slides = 3.4, dots = false }) => {
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
          <NewsCarouselItem key={index} {...i} first={index === 0} index={index} />
        ))}
      </Slider>
    </div>
  )
}

const NewsCarouselItem = ({ name, image, date, title = false }) => {
  return (
    <div key={name} className={`p-6 flex flex-col items-center ml-6 px-0 mr-6`}>
      <div className="md:w-96">
        <Image
          src={image}
          className="rounded-xl md:w-96 md:h-64"
          alt="imageRounded"
          height={283}
          width={400}
        />
      </div>
      <div className="pt-6 w-full">
        <a className="text-sm text-gray-400">{date}</a>
        <p className="w-72 text-2xl pt-2">{title}</p>
        <button className="pt-10 text-base text-blue-500 border-b-2 border-primary-500 border-dashed">
          READ MORE
        </button>
      </div>
    </div>
  )
}

export default NewsCarousel
