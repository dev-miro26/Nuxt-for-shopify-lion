import VideoBlock from '../../components/VideoBlock'
import { Video } from '../../desk/lib/icons'

export default {
  title: 'Video Block',
  name: 'videoBlock',
  type: 'object',
  icon: Video,
  fields: [
    {
      title: 'Size',
      name: 'size',
      type: 'number',
      description: 'Sets video width for desktop',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {
            title: 'Half width',
            value: 0.5
          },
          {
            title: 'Full width',
            value: 1
          }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Video',
      name: 'video',
      type: 'vimeoEmbed',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      url: 'video.url',
      size: 'size'
    },
    component: VideoBlock
  }
}
