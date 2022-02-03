import { PageSEO } from '@/components/SEO'
import {
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoEllipse,
  IoPlayCircleOutline,
} from 'react-icons/io5'
import TryButton from '../components/button/TryButton'
import WhiteButton from '@/components/button/WhiteButton'
import GroupCarousel from '../components/GroupCarousel'
import { Element } from 'react-scroll'
import MerchandiseCarousel from '../components/MerchandiseCarousel'
import NewsCarousel from '../components/NewsCarousel'
import UserCarousel from '../components/UserCarousel'
import axios from 'axios'
import Image from 'next/image'
import LayoutWrapper from '@/components/LayoutWrapper'

const marchendise = [
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
  {
    image: '/static/images/tshirt.png',
    nameProduct: 'T-Shirt',
    price: 'IDR 150,000',
  },
]

const groups = [
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
  {
    image: '/static/images/imagedummy.png',
    countmember: '234 members',
    countdiscuss: '3 discussions',
    title: 'The group name that can be 2 lines',
  },
]

const news = [
  {
    image: '/static/images/imagedummy.png',
    date: 'NOV 30, 2021',
    title:
      'Every teacher in our team is a certified ESL specialist with online teaching experience.',
  },
  {
    image: '/static/images/imagedummy.png',
    date: 'NOV 30, 2021',
    title:
      'Every teacher in our team is a certified ESL specialist with online teaching experience.',
  },
  {
    image: '/static/images/imagedummy.png',
    date: 'NOV 30, 2021',
    title:
      'Every teacher in our team is a certified ESL specialist with online teaching experience.',
  },
  {
    image: '/static/images/imagedummy.png',
    date: 'NOV 30, 2021',
    title:
      'Every teacher in our team is a certified ESL specialist with online teaching experience.',
  },
  {
    image: '/static/images/imagedummy.png',
    date: 'NOV 30, 2021',
    title:
      'Every teacher in our team is a certified ESL specialist with online teaching experience.',
  },
  {
    image: '/static/images/imagedummy.png',
    date: 'NOV 30, 2021',
    title:
      'Every teacher in our team is a certified ESL specialist with online teaching experience.',
  },
]

const user = [
  {
    image: '/static/images/imagedummy.png',
    title:
      '“Every teacher in our team is a certified ESL specialist with online teaching experience.”',
    name: 'PAUL',
    position: 'Amazing Kids Group Member',
  },
  {
    image: '/static/images/imagedummy.png',
    title:
      '“Every teacher in our team is a certified ESL specialist with online teaching experience.”',
    name: 'PAUL',
    position: 'Amazing Kids Group Member',
  },
  {
    image: '/static/images/imagedummy.png',
    title:
      '“Every teacher in our team is a certified ESL specialist with online teaching experience.”',
    name: 'PAUL',
    position: 'Amazing Kids Group Member',
  },
  {
    image: '/static/images/imagedummy.png',
    title:
      '“Every teacher in our team is a certified ESL specialist with online teaching experience.”',
    name: 'PAUL',
    position: 'Amazing Kids Group Member',
  },
]

export default function Community(props) {
  const { content } = props
  return (
    <LayoutWrapper>
      <PageSEO />
      <section className="h-screen flex flex-col justify-start items-center p-6 md:p-0">
        <div className="flex md:h-20 items-center max-w-5xl w-full m-auto flex-col md:flex-row ">
          <div className="w-full md:px-8 pt-8">
            <h2
              style={{
                fontSize: '52px',
              }}
            >
              {content?.hero_title}
            </h2>
            <div className="my-6">
              <TryButton
                style={{
                  width: '122px',
                  height: '56px',
                }}
              >
                Sign Up
              </TryButton>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[640px]" style={{ background: '#F7F6F6' }}>
        <div className="max-w-5xl mx-auto justify-between w-full items-center">
          <div className="mt-48 mb-10 flex justify-center">
            <div className="relative mt-32">
              <h1 className="text-center md:text-[80px] text-5xl">
                {content?.hero_secondary}

                <div className="relative left-28 bottom-16 md:left-[26rem] md:bottom-32">
                  <Image
                    className="absolute hidden md:block"
                    src="/static/images/spark.png"
                    height={50}
                    width={50}
                    alt="spark"
                  />
                </div>
              </h1>
            </div>
          </div>
          <div className="items-center flex justify-between">
            {content?.hero_secondary_group?.map(({ title = '', description = '' }) => {
              return (
                <div key={title} className="flex-grow">
                  <h1 className="font-bold text-center text-5xl">{title}</h1>
                  <p className="text-center font-bold text-sm">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---Feature Groups--- */}
      <section className="w-full" style={{ background: '#F9F9F9' }}>
        <Element name="feature-groups" id="feature-groups">
          <div className="relative left-28 md:left-40 pt-24">
            <div className="rounded-full w-40 h-8" style={{ background: '#FFF6E6' }}>
              <p className="text-sm py-1 text-center" style={{ color: '#EE9D00' }}>
                FEATURED GROUPS
              </p>
            </div>
            <h1 className="text-5xl w-52 md:w-full pt-5" style={{ color: '#595757' }}>
              Featured groups
            </h1>
          </div>
          <div className="pt-9 px-4 ">
            <div
              className="h-screen md:h-96 relative shadow-xl md:left-36 rounded-xl md:w-4/5 "
              style={{ background: '#FFFFFF' }}
            >
              <div className="absolute top-96 left-24 mt-5 items-center md:top-4 md:left-2/4 md:pl-14">
                <div className="rounded-full w-40 h-8" style={{ background: '#FFF6E6' }}>
                  <p className="text-sm text-center p-1" style={{ color: '#EE9D00' }}>
                    GROUPS CATEGORY
                  </p>
                </div>
              </div>
              <div className="absolute top-96 mt-14 px-4 items-center md:top-4 md:left-2/4 md:px-28 md:pt-2 md:pl-16">
                <p className="text-3xl text-center md:text-left">
                  The group name that can be 2 lines
                </p>
                <div
                  className="flex justify-center md:justify-start pt-2 gap-2 items-center"
                  style={{ color: '#727171' }}
                >
                  <div className="text-sm">234 members</div>
                  <div>
                    <IoEllipse style={{ width: '3px', height: '3px' }} />
                  </div>
                  <div className="text-sm">3 discussions</div>
                </div>
                <p className="text-lg text-left pt-4" style={{ color: '#727171' }}>
                  Every teacher in our team is a certified ESL specialist with online teaching
                  experience.
                </p>
                <div className="pt-16 pl-3 md:pt-8 md:pl-1">
                  <TryButton>Ask to join</TryButton>
                </div>
              </div>
              <div className="h-96 rounded-xl md:w-2/4" style={{ background: '#C4C4C4' }}></div>
            </div>
          </div>
          <div className="mt-36 pl-5 md:pl-40 flex justify-between">
            <div className="border rounded-xl h-12 w-48 flex justify-center">
              <button className="text-xl items-center flex justify-center">
                All groups
                <div className="items-center px-2">
                  <IoChevronDownOutline />
                </div>
              </button>
            </div>
            <div className="flex flex-nowrap gap-4 pr-32">
              <button className="hidden md:block">
                <Image
                  src="/static/favicons/coolicon2.png"
                  width={40}
                  height={40}
                  alt="coolicon2"
                />
              </button>
              <button className="hidden md:block">
                <Image
                  src="/static/favicons/coolicon1.png"
                  width={40}
                  height={40}
                  alt="coolicon1"
                />
              </button>
            </div>
          </div>
          <div>
            <div className="items-center justify-between w-full space-x-6 py-12 pb-0 hidden md:flex">
              <GroupCarousel items={groups} />
            </div>
            <div className="flex items-center  justify-between w-full space-x-6 py-3 pt-0 md:hidden">
              <GroupCarousel items={groups} slides={1} />
            </div>
          </div>
        </Element>
      </section>

      <section className="w-full">
        <Element name="user-review" id="user-review">
          <div className="flex justify-center mt-32">
            <div className="w-32 rounded-full" style={{ background: '#F0F5F7' }}>
              <p className="text-sm text-center" style={{ color: '#158ABC' }}>
                USER REVIEWS
              </p>
            </div>
          </div>
          <div className="flex justify-center px-2 pt-5">
            <p className="text-5xl text-center">
              What they say after <br />
              joining the groups
            </p>
          </div>
          <div className="flex md:h-screen mt-5 mb-16">
            <UserCarousel items={user} />
          </div>
        </Element>
      </section>

      <section className="w-full h-screen mt-36 md:mt-10">
        <Element name="merchandise" id="merchandise">
          <div className="relative flex justify-center md:justify-start md:left-40">
            <div className="w-32 h-7 rounded-full" style={{ background: '#FBF4DF' }}>
              <p className="text-center py-1 text-sm" style={{ color: '#FFCB37' }}>
                MERCHANDISE
              </p>
            </div>
          </div>
          <div className="relative flex justify-center md:justify-between px-40 pt-5">
            <p className="text-5xl text-center md:text-left">Our goods</p>
            <div className="flex flex-nowrap gap-5">
              <button>
                <Image
                  src="/static/favicons/coolicon2.png"
                  alt="coolicon2"
                  width={40}
                  height={40}
                  className="hidden md:block"
                />
              </button>
              <button>
                <Image
                  src="/static/favicons/coolicon1.png"
                  alt="coolicon1"
                  width={40}
                  height={40}
                  className="hidden md:block"
                />
              </button>
            </div>
          </div>
          <div className="pt-16 hidden md:flex">
            <MerchandiseCarousel items={marchendise} onClick={() => this.slider.slickPrev()} />
          </div>
          <div className="pt-16 flex md:hidden">
            <MerchandiseCarousel items={marchendise} slides={1} />
          </div>
        </Element>
      </section>

      <section className="w-full mt-72">
        <Element name="news-event" id="news-event">
          <div className="flex justify-center relative md:justify-start md:left-40">
            <div className="rounded-full w-32" style={{ background: '#FFDFEA' }}>
              <p className="text-sm text-center" style={{ color: '#EE004F' }}>
                NEWS & EVENTS
              </p>
            </div>
          </div>
          <div className="flex justify-center pt-5 relative md:justify-start md:left-40">
            <p className="text-5xl text-center">Upcoming news and events</p>
          </div>
          <div className="flex justify-center relative md:justify-between md:pl-40 md:pr-32 pt-3 md:pt-9 px-4">
            <p className="text-xl text-center">
              Every teacher in our team is a certified ESL <br /> specialist with online teaching
              experience.
            </p>
            <div className="flex gap-5">
              <button className="hidden md:block">
                <Image
                  src="/static/favicons/coolicon2.png"
                  alt="coolicon2"
                  width={40}
                  height={40}
                />
              </button>
              <button className="hidden md:block">
                <Image
                  src="/static/favicons/coolicon1.png"
                  alt="coolicon1"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          </div>
          <div className="mt-16 flex md:hidden">
            <NewsCarousel items={news} slides={1} />
          </div>
          <div className="mt-16 hidden md:flex">
            <NewsCarousel items={news} />
          </div>
          <div className="mt-52" />
        </Element>
      </section>

      <section
        className="flex flex-col justify-start items-center bg-indigo-100 pt-52"
        style={{
          background: '#F4F9FB',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-full">
            <div className="relative bg-red-500 h-60 w-full md:hidden block pb-6">
              <Image
                src="/static/images/marketing-2.png"
                alt="marketing-2"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <span className="px-3 py-1 bg-yellow-200 rounded-full text-xs text-yellow-700">
              GET STARTED
            </span>
            <h1 className="pt-6 font-bold text-3xl md:text-5xl leading-tight text-gray-900 pb-6 text-left">
              Schedule your <br />
              first lesson today!
            </h1>
            <p className="bold flex items-center text-sm md:text-lg text-gray-800 text-left max-w-xl mx-auto pb-3">
              <IoCheckmarkCircleOutline size={20} className="mr-2" /> Online classes in a caring
              environment
            </p>
            <p className="bold flex items-center text-sm md:text-lg text-gray-800 text-left max-w-xl mx-auto pb-3">
              <IoCheckmarkCircleOutline size={20} className="mr-2" /> Certified, native-speaking
              English teachers
            </p>
            <p className="bold flex items-center text-sm md:text-lg text-gray-800 text-left max-w-xl mx-auto pb-3">
              <IoCheckmarkCircleOutline size={20} className="mr-2" /> Engaging activities including
              songs and games
            </p>
            <p className="bold flex items-center text-sm md:text-lg text-gray-800 text-left max-w-xl mx-auto">
              <IoCheckmarkCircleOutline size={20} className="mr-2" /> Proven curriculum, tailored to
              your child's needs
            </p>
            <div className="flex pt-12 text-left items-start md:items-center justify-start flex-col md:flex-row">
              <TryButton>Schedule Free lesson</TryButton>
              <div className="px-0 py-2 md:px-2 md:py-0" />
              <WhiteButton className="opacity-0 cursor-auto" disabled>
                <IoPlayCircleOutline size={22} className="mr-2" /> How it works{' '}
              </WhiteButton>
            </div>
          </div>
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              // className="object-contain rounded-xl w-52 h-60 border-r-8 border-yellow-500"
              src="/static/images/marketing-2.png"
              alt="marketing-2"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}

export async function getServerSideProps({ query }) {
  const { locale = 'en' } = query
  const content = await axios
    .get(`http://localhost:1337/community-page?_locale=${locale}`)
    .then((res) => res.data)

  return { props: { locale, content } }
}
