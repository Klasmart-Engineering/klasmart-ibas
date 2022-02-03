import NextImage from 'next/image'
import { getStrapiMedia } from '@/lib/utils/media'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...image }) => {
  // const { src, ...rest } = image
  // const imageUrl = getStrapiMedia(src);
  return <NextImage {...image} />
}

export default Image
