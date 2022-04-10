import { PageSEO } from '@/components/SEO'
import { useRouter } from 'next/router'
import { Element } from 'react-scroll'
import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoChevronDown,
  IoChevronUpOutline,
  IoDocumentTextOutline,
  IoPersonOutline,
  IoPlayCircleOutline,
} from 'react-icons/io5'
import TryButton from '@/components/button/TryButton'
import WhiteButton from '@/components/button/WhiteButton'
import Carousel from '@/components/Carousel'
import ReviewsCarousel from '@/components/ReviewsCarousel'
import TeachersCarousel from '@/components/TeachersCarousel'
import VideoButton from '@/components/button/VideoButton'
import axios from 'axios'
import React, { useState } from 'react'
import Image from 'next/image'
import LayoutWrapper from '@/components/LayoutWrapper'
import { url } from '../lib/utils/requests'
import { normalize } from '../lib/utils/transformers'
import Markdown from '../components/Markdown'

export default function Home(props) {
  const { content = {}, siteMetadata = {} } = props
  const router = useRouter()
  const [selectedFaq, setSelectedFaq] = useState(false)

  const toogleAccordion = (i) => {
    if (i === selectedFaq) {
      setSelectedFaq(-1)
      return
    }
    setSelectedFaq(i)
  }

  const points = content?.about_us_features?.map((feature) => ({
    id: feature.id,
    image: feature?.icon?.url,
    title: feature?.title,
    text: feature?.description,
  }))

  const teachers = content?.teachers?.map((teacher) => ({
    id: teacher.id,
    video_image: teacher?.video_image?.url,
    video_url: teacher?.video_url,
    name: teacher?.teacher_name,
    teacher_experience: teacher?.teacher_experince,
  }))

  const reviews = content?.user_review?.map((review) => ({
    id: review.id,
    job: review.job,
    name: review.name,
    image: review?.picture?.url,
    description: review.review,
  }))

  return (
    <LayoutWrapper>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        image={siteMetadata.image.url}
      />
      <section
        className="max-h-full flex md:hidden p-6"
        style={{
          backgroundImage: 'url(static/images/hero-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: '65% center',
        }}
      >
        <div className="flex h-screen items-center justify-center md:mt-28 max-w-5xl w-full m-auto flex-col md:flex-row ">
          <div className="w-full md:w-3/5 md:h-auto">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight text-gray-700 pb-6 text-left">
              {content?.hero_title}
            </h1>
            <div className="mb-3">
              {content?.featured?.map(({ title = '' }) => (
                <div
                  key={title}
                  className="ml-0 bold flex-row flex items-center text-sm md:text-lg text-gray-600 text-left  mx-auto pb-3"
                >
                  <div className="items-center flex justify-center">
                    <IoCheckmarkCircleOutline className="mr-3 text-xl" />
                  </div>
                  {title}
                </div>
              ))}
            </div>

            <h2
              className="font-bold text-xl border-b-4 border-dashed leading-loose w-min whitespace-nowrap"
              style={{ borderColor: '#9FA0A0' }}
            >
              {content?.hero_subtitle}
            </h2>

            <div className="flex pt-12 text-left items-start md:items-center justify-start flex-col md:flex-row">
              <TryButton>{content?.hero_primary_btn}</TryButton>
              <div className="px-0 py-2 md:px-2 md:py-0" />
              <VideoButton>
                <IoPlayCircleOutline size={22} className="mr-2" /> {content?.hero_secondary_btn}
              </VideoButton>
            </div>
          </div>
          <div className="w-full md:w-2/5 hidden md:block"></div>
        </div>
      </section>

      <section
        className="h-[120vh] hidden md:flex flex-col mt-9 justify-center items-center md:p-0"
        style={{
          backgroundImage: 'url(static/images/hero-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="flex h-screen items-center justify-center max-w-5xl w-full m-auto flex-col md:flex-row ">
          <div className="w-full md:w-3/5 md:h-auto">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight text-gray-700 pb-6 text-left">
              {content?.hero_title}
            </h1>
            <div className="mb-3">
              {content?.featured?.map(({ title = '' }) => (
                <div
                  key={title}
                  className="ml-0 bold flex-row flex items-center text-sm md:text-lg text-gray-600 text-left  mx-auto pb-3"
                >
                  <div className="items-center flex justify-center">
                    <IoCheckmarkCircleOutline className="mr-3 text-xl" />
                  </div>
                  {title}
                </div>
              ))}
            </div>

            <h2
              className="font-bold text-xl border-b-4 border-dashed leading-loose w-min whitespace-nowrap"
              style={{ borderColor: '#9FA0A0' }}
            >
              {content?.hero_subtitle}
            </h2>

            <div className="flex pt-12 text-left items-start md:items-center justify-start flex-col md:flex-row">
              <TryButton>{content?.hero_primary_btn}</TryButton>
              <div className="px-0 py-2 md:px-2 md:py-0" />
              <VideoButton>
                <IoPlayCircleOutline size={22} className="mr-2" /> {content?.hero_secondary_btn}
              </VideoButton>
            </div>
          </div>
          <div className="w-full md:w-2/5 hidden md:block"></div>
        </div>
      </section>

      <section className="relative hidden md:block">
        <div className="max-w-5xl mx-auto py-16 justify-between w-full border-b">
          <div className="flex items-start  justify-between w-full space-x-6">
            {content?.hero_statistic?.map(({ title = '', description = '' }) => {
              return (
                <div key={title} className="p-6 flex-grow w-1/3">
                  <h1 className="font-bold text-5xl text-gray-700 text-center">{title}</h1>
                  <p className="bold text-md text-gray-700 text-center">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="relative block md:hidden">
        <div className="max-w-5xl mx-auto py-16 justify-between w-full border-b">
          <div className="flex items-center  justify-between w-full space-x-6">
            <div className="p-3 flex-grow w-full">
              <h1 className="font-bold text-3xl text-gray-700 text-center">
                {content?.hero_statistic[1].title}
              </h1>
              <p className="bold text-sm text-gray-700 text-center">
                {content?.hero_statistic[1].description}
              </p>
            </div>
          </div>
          <div className="flex items-center pt-3 px-3 justify-between w-full space-x-6">
            <div className="p-3 flex-grow w-1/2">
              <h1 className="font-bold text-3xl text-gray-700 text-center">
                {content?.hero_statistic[0].title}
              </h1>
              <p className="bold text-sm text-gray-700 text-center">
                {content?.hero_statistic[0].description}
              </p>
            </div>
            <div className="p-3 flex-grow w-1/2">
              <h1 className="font-bold text-3xl text-gray-700 text-center">
                {content?.hero_statistic[2].title}
              </h1>
              <p className="bold text-sm text-gray-700 text-center">
                {content?.hero_statistic[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Element name="about" id="about">
        <section className="relative">
          <div className="max-w-5xl mx-auto py-16 justify-between w-full items-center flex flex-col">
            <span
              className="px-3 py-1 mt-12 rounded-full text-xs m-auto"
              style={{ background: '#FBF0D0', color: '#CD9B0B' }}
            >
              {content?.about_us_pils}
            </span>
            <h1 className="font-bold text-3xl md:text-5xl leading-tight text-gray-700 pt-6 pb-12 text-center px-6 md:px-0">
              {content?.about_us_title}
              <div className="relative bottom-32 left-40 md:left-[500px]">
                <Image src="/static/images/spark.png" width={32} height={32} alt="spark" />
              </div>
            </h1>
            <div className="flex items-center justify-between w-full space-x-6 md:hidden py-12">
              <Carousel items={points} />
            </div>
            <div className="items-center justify-between w-full space-x-6 hidden md:flex px-6 md:px-0">
              {points.map((s, i) => {
                return (
                  <div
                    key={s.title}
                    className={`relative p-6 flex-grow w-1/3 md:h-96 flex flex-col items-center border-primary-500 border-dashed`}
                  >
                    <Image
                      className="inline object-cover w-16 h-16 mr-2 rounded-full mb-6"
                      src={s.image}
                      alt="image"
                      height={80}
                      width={80}
                    />
                    <h1 className="font-bold text-lg mb-2 text-gray-700 mt-6 text-center">
                      {s.title}
                    </h1>
                    <p className="bold font-regular text-md text-gray-700 text-center">{s.text}</p>
                    <div
                      className={`absolute top-1/2 -right-3 transform -translate-y-1/2 h-16 w-2 ${
                        i != points.length - 1 && 'border-r-2'
                      } border-primary-500 border-dashed`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </Element>
      <section className="relative">
        <div className="max-w-5xl mx-auto py-16 justify-between w-full items-center flex flex-col px-6 md:px-0 md:pb-0">
          <h1 className="font-bold text-3xl md:text-5xl leading-tight text-gray-700 pt-6 pb-6 text-center">
            {content?.program_title}
          </h1>
          <p className="bold font-medium text-md md:text-xl text-md text-gray-700 text-center max-w-lg leading-relaxed">
            {content?.program_description}
          </p>
        </div>
      </section>
      <Element name="bada-rhyme" id="bada-rhyme">
        <section className="relative">
          <div className="max-w-5xl flex items-center justify-center mx-auto py-24 pt-6 md:pt-24 flex-col md:flex-row px-6 md:px-0">
            <div className="md:pr-12 w-full md:w-1/2">
              <Image
                className="inline object-contain w-28 h-28 mr-2 rounded-full mb-6"
                src={`/static/images/bada-rhyme.png`}
                alt="bada-rhyme"
                height={100}
                width={100}
              />
              <h1 className="font-bold text-3xl md:text-5xl pb-6 text-gray-700">
                {content?.programs[0]?.title}
              </h1>
              {/* {content?.programs[0]?.description.split('.')} */}
              <Markdown className="bold text-md md:text-lg text-gray-600">
                {content?.programs[0]?.description}
              </Markdown>
            </div>
            <div className="md:pl-12 w-full md:w-1/2 pt-24 md:pt-0">
              <ul className="rounded-xl p-8 shadow-lg relative">
                <div className="absolute bottom-64 md:bottom-48 transform translate-x-36 md:translate-x-64">
                  <Image
                    className="transform"
                    src={`/static/images/curly-1.png`}
                    alt="curly"
                    width={160}
                    height={160}
                  />
                </div>
                <li className="flex items-start pb-6 w-2/3">
                  <div className="text-purple-400">
                    <IoPersonOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[0]?.age_label}</p>
                    <p className="font-bold text-gray-700">{content?.programs[0]?.age}</p>
                  </div>
                </li>
                <li className="flex items-start pb-6  w-2/3">
                  <div className="text-purple-400">
                    <IoDocumentTextOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[0]?.grade_label}</p>
                    <p className="font-bold text-gray-700">{content?.programs[0]?.grade}</p>
                  </div>
                </li>
                <li className="flex items-start pb-6  w-2/3">
                  <div className="text-purple-400">
                    <IoCalendarOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[0]?.duration_label}</p>
                    <p className="font-bold text-gray-700 md:w-44">
                      {content?.programs[0]?.duration}
                    </p>
                  </div>
                </li>
                {/* <h1 className="hover:text-primary-300 cursor-pointer text-primary-500 border-b-2 border-primary-500 w-24 text-center border-dashed">
                  SEE DETAIL
                </h1> */}
              </ul>
            </div>
          </div>
        </section>
      </Element>
      <Element name="bada-genius" id="bada-genius">
        <section className="relative block md:hidden">
          <div className="max-w-5xl flex items-center justify-center mx-auto py-24 pt-6 md:pt-24 flex-col md:flex-row px-6 md:px-0">
            <div className="md:pr-12 w-full md:w-1/2">
              <Image
                className="inline object-contain w-28 h-28 mr-2 rounded-full mb-6"
                src={`/static/images/bada-genius.png`}
                alt="bada-genius"
                height={100}
                width={100}
              />
              <h1 className="font-bold text-3xl md:text-5xl pb-6 text-gray-700">
                {content?.programs[1]?.title}
              </h1>
              <Markdown className="bold text-md md:text-lg text-gray-600">
                {content?.programs[1]?.description}
              </Markdown>
            </div>
            <div className="md:pl-12 w-full md:w-1/2 pt-24 md:pt-0">
              <ul className="rounded-xl p-8 shadow-lg relative">
                <div className="absolute transform -translate-y-32 left-40 md:left-8">
                  <Image
                    className="transform"
                    src={`/static/images/polar-1.png`}
                    alt="polar1"
                    width={160}
                    height={160}
                  />
                </div>
                <li className="flex items-start pb-6 w-2/3">
                  <div className="text-yellow-400">
                    <IoPersonOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[1]?.age_label}</p>
                    <p className="font-bold text-gray-700">{content?.programs[1]?.age}</p>
                  </div>
                </li>
                <li className="flex items-start pb-6 w-2/3">
                  <div className="text-yellow-400">
                    <IoDocumentTextOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[1]?.grade_label}</p>
                    <p className="font-bold text-gray-700">{content?.programs[1]?.grade}</p>
                  </div>
                </li>
                <li className="flex items-start pb-6 w-2/3">
                  <div className="text-yellow-400">
                    <IoCalendarOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[1]?.duration_label}</p>
                    <p className="font-bold text-gray-700">{content?.programs[1]?.duration}</p>
                  </div>
                </li>
                {/* <h1 className="hover:text-primary-300 cursor-pointer text-primary-500 border-b-2 border-primary-500 w-24 text-center border-dashed">
                  SEE DETAIL
                </h1> */}
              </ul>
            </div>
          </div>
        </section>
      </Element>
      <Element name="bada-genius" id="bada-genius">
        <section className="relative hidden md:block">
          <div className="max-w-5xl flex items-center justify-center mx-auto py-24 pt-0">
            <div className="pr-12 w-1/2">
              <ul className="rounded-xl p-8 shadow-lg relative">
                <div className="absolute transform translate-x-60 bottom-48">
                  <Image
                    className="transform"
                    src={`/static/images/polar-1.png`}
                    alt="polar-1"
                    width={160}
                    height={160}
                  />
                </div>
                <li className="flex items-start pb-6 w-2/3">
                  <div className="text-yellow-400">
                    <IoPersonOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[1]?.age_label}</p>
                    <p className="font-bold text-gray-700">{content?.programs[1]?.age}</p>
                  </div>
                </li>
                <li className="flex items-start pb-6 w-2/3">
                  <div className="text-yellow-400">
                    <IoDocumentTextOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[1]?.grade_label}</p>
                    <p className="font-bold text-gray-700">{content?.programs[1]?.grade}</p>
                  </div>
                </li>
                <li className="flex items-start pb-6 w-2/3">
                  <div className="text-yellow-400">
                    <IoCalendarOutline size={20} />
                  </div>
                  <div className="pl-6">
                    <p className="text-xs text-gray-500">{content?.programs[1]?.duration_label}</p>
                    <p className="font-bold text-gray-700 md:w-44">
                      {content?.programs[1]?.duration}
                    </p>
                  </div>
                </li>
                {/* <h1 className="hover:text-primary-300 cursor-pointer text-primary-500 border-b-2 border-primary-500 w-24 text-center border-dashed">
                  SEE DETAIL
                </h1> */}
              </ul>
            </div>
            <div className="pl-12 w-1/2">
              <Image
                className="inline object-contain w-28 h-28 mr-2 rounded-full mb-6"
                src={`/static/images/bada-genius.png`}
                alt="bada-genius"
                height={100}
                width={100}
              />
              <h1 className="font-bold text-3xl md:text-5xl pb-6 text-gray-700">
                {content?.programs[1]?.title}
              </h1>
              <Markdown className="bold text-md md:text-lg text-gray-600">
                {content?.programs[1]?.description}
              </Markdown>
            </div>
          </div>
        </section>
      </Element>
      <section className="relative">
        <div className="flex py-24 items-center justify-center max-w-5xl w-full m-auto flex-col">
          <div className="md:pr-12 w-full ">
            <ul
              className="rounded-xl p-24 md:px-24 px-6 relative"
              style={{
                backgroundImage: 'url(static/images/marketing-1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            >
              <div className="w-full md:w-1/2 md:h-auto">
                <h1 className="font-bold text-3xl md:text-3xl leading-tight text-gray-700 pb-6 text-center md:text-left">
                  {content?.curiculum_title}
                </h1>
                <div className="flex pt-12 text-left items-center justify-start flex-col md:flex-row">
                  <TryButton>{content?.curiculum_action_btn}</TryButton>
                </div>
              </div>
              <div className="w-full md:w-1/2 hidden md:block"></div>
            </ul>
          </div>
        </div>
      </section>
      <Element name="reviews" id="reviews">
        <section className="relative">
          <div className="py-16 justify-between w-full items-center flex flex-col">
            <span
              className="max-w-5xl mx-auto px-3 py-1 mt-12 rounded-full text-xs m-auto"
              style={{ background: '#FFDFEA', color: '#EE004F' }}
            >
              {content?.user_review_pils}
            </span>
            <h1 className="hidden md:block max-w-5xl mx-auto font-bold text-3xl md:text-5xl leading-tight text-gray-700 pt-6 pb-0 text-center px-6 md:px-0">
              {/* Don’t take our word for it,
              <br /> Here’s what our customers think */}
              {content?.user_review_title}
              <div className="relative bottom-7 right-16">
                <Image
                  src="/static/images/vectorline.png"
                  alt="vector-line"
                  height={10}
                  width={250}
                />
              </div>
            </h1>
            <h1 className="block md:hidden max-w-5xl mx-auto font-bold text-3xl md:text-5xl leading-tight text-gray-700 pt-6 pb-12 text-center px-6 md:px-0">
              {/* Don’t take our word for it, Here’s what our customers think */}
              {content?.user_review_title}
              <div className="relative right-10 bottom-5 ">
                <Image
                  src="/static/images/vectorline.png"
                  alt="vector-line"
                  height={10}
                  width={150}
                />
              </div>
            </h1>
            <div className="items-center justify-between w-full space-x-6 py-12 pb-0 hidden md:flex">
              <ReviewsCarousel items={reviews} slides={3.7} dots={false} />
            </div>
            <div className="items-center justify-between w-full space-x-6 py-3 pt-0 flex md:hidden">
              <ReviewsCarousel items={reviews} slides={1} dots={true} />
            </div>
          </div>
        </section>
      </Element>
      <section className="relative">
        <div className="mx-auto py-16 justify-start w-full items-start flex flex-col">
          <div className="max-w-5xl mx-auto w-full px-6 md:px-0">
            <div className="flex justify-end">
              <Image src="/static/images/dollowl.png" alt="doll" width={212} height={212} />
            </div>
            <span
              className="px-3 py-1 mt-12 rounded-full text-xs"
              style={{ background: '#FBF0D0', color: '#CD9B0B' }}
            >
              {content?.our_teacher_pils}
            </span>
          </div>
          <h1 className="max-w-5xl mx-auto w-full  font-bold text-3xl md:text-5xl leading-tight text-gray-700 pt-6 pb-3 text-left px-6 md:px-0">
            {content?.our_teacher_title}
          </h1>
          <p className="max-w-5xl mx-auto w-full bold text-lg text-gray-500 pb-6 md:pb-12 px-6 md:px-0">
            {content?.our_teacher_description}
          </p>
          <div className="items-center justify-between w-full space-x-6 py-12 pt-0 hidden md:flex">
            <TeachersCarousel items={teachers} slides={3.7} />
          </div>
          <div className="items-center  justify-between w-full space-x-6 py-0 pb-6 flex md:hidden">
            <TeachersCarousel items={teachers} slides={1} dots={true} />
          </div>
        </div>
      </section>
      <Element name="faq" id="faq">
        <section className=" flex flex-col justify-start items-center p-6 md:p-0 ">
          <div className="md:py-12  md:pb-48 flex items-start justify-center max-w-5xl w-full m-auto flex-col md:flex-row ">
            <div className="w-full md:w-1/2 md:h-auto">
              <span className="px-3 py-1 bg-blue-200 rounded-full text-xs text-blue-700">
                {content?.faq_pils}
              </span>
              <h1 className="font-bold text-3xl pt-6 md:text-5xl leading-tight text-gray-700 pb-6 text-left">
                {content?.faq_title}
              </h1>
            </div>
            <div className="w-full md:w-1/2 pb-32 md:pb-0">
              {content?.faq_content?.map((content, i) => (
                <React.Fragment key={i}>
                  <button
                    key={content.title}
                    className="border-b w-full pb-6 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      toogleAccordion(i)
                    }}
                  >
                    <p className="flex text-left items-center md:w-96 bold text-lg md:text-xl text-gray-600 pt-6 ">
                      {content.title}
                    </p>
                    <span>{selectedFaq === i ? <IoChevronUpOutline /> : <IoChevronDown />}</span>
                  </button>
                  <div
                    style={{ display: selectedFaq === i ? 'block' : 'none' }}
                    className="px-8 pt-9"
                  >
                    <Markdown className="text-gray-600 text-left">{content.description}</Markdown>
                  </div>
                </React.Fragment>
              ))}

              <button
                onClick={() => router.push('/faqs')}
                className="hover:text-primary-300 cursor-pointer text-primary-500 border-b-2 border-primary-500 w-24 pt-6 text-center border-dashed"
              >
                SEE MORE
              </button>
            </div>
          </div>
        </section>
      </Element>
      <section
        className="h-screen flex flex-col justify-start items-center p-6 md:p-0 relative"
        style={{
          backgroundImage: 'url(static/images/curve-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          height: 212,
        }}
      >
        <div className="max-w-5xl mx-auto relative w-full">
          <div className="absolute object-contain h-24 md:h-36 top-0 left-0 transform -translate-y-1/2">
            <Image src={`/static/images/group-1.png`} alt="group-1" width={342} height={182} />
          </div>
        </div>
      </section>
      <section
        className="flex flex-col justify-start items-center bg-indigo-100"
        style={{
          background: '#F4F9FB',
        }}
      >
        <div className=" flex items-center justify-center max-w-5xl w-full m-auto flex-col md:flex-row border-b border-indego-100 px-6 md:p-0 md:pb-28">
          <div className="w-full md:w-1/2 md:h-auto">
            <div className="w-full md:w-1/2 block md:hidden pb-6">
              <div className="object-contain w-full h-full rounded-xl border-r-8 border-yellow-500">
                <Image
                  src="/static/images/marketing-2.png"
                  alt="marketing-2"
                  height={646}
                  width={646}
                />
              </div>
            </div>

            <span className="px-3 py-1 bg-yellow-200 rounded-full text-xs text-yellow-700">
              {content?.footer_pils}
            </span>
            <h1 className="pt-6 font-bold text-3xl md:text-5xl leading-tight text-gray-700 pb-6 text-left">
              {content?.footer_title}
            </h1>
            {content?.featured?.map(({ title }) => (
              <div
                key={title}
                className="bold flex items-center text-sm md:text-lg text-gray-600 text-left max-w-xl mx-auto pb-3"
              >
                <div className="items-center flex justify-center">
                  <IoCheckmarkCircleOutline className="mr-2 text-xl" />
                </div>{' '}
                {title}
              </div>
            ))}

            <div className="flex pt-12 text-left items-start md:items-center justify-start flex-col md:flex-row">
              <TryButton>{content?.footer_action_btn}</TryButton>
              <div className="px-0 py-2 md:px-2 md:py-0" />
              <WhiteButton className="opacity-0 cursor-auto" disabled>
                <IoPlayCircleOutline size={22} className="mr-2" /> How it works{' '}
              </WhiteButton>
            </div>
          </div>
          <div className="w-full h-full flex-grow md:w-1/2 hidden md:block md:pl-20">
            <div className=" w-full rounded-xl border-r-8 h-96 border-yellow-500 overflow-hidden relative">
              <Image
                className="object-cover h-screen"
                src={content?.footer_image?.url}
                alt="footer"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}

export async function getServerSideProps({ locale }) {
  const cmsUrl = url(`homepage?_locale=${locale}&populate=*`)
  const content = await axios.get(cmsUrl).then((res) => normalize(res.data))

  const metaUrl = url(`seos`)
  const siteMetadata = await axios.get(metaUrl, { params: { path: '/', populate:'image' } }).then((res) => normalize(res.data))

  return { props: { locale, content, siteMetadata: siteMetadata[0] } }
}
