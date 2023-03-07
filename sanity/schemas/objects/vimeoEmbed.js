import { Vimeo } from '../../desk/lib/icons'

export default {
  title: 'Vimeo Embed',
  name: 'vimeoEmbed',
  type: 'object',
  icon: Vimeo,
  fields: [
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description:
        'Video file link — found in Vimeo under Distribution > Video file links',
      validation: Rule => Rule.uri()
    },
    {
      title: 'Video Thumbnail',
      name: 'videoThumbnail',
      type: 'img',
      description:
        "image that will show as placeholder for videos that don't autoplay"
    }
  ]
}
