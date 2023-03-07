import ImageBlock from '../../components/ImageBlock'
import { Image } from '../../desk/lib/icons'

export default {
  title: 'Image Block',
  name: 'imageBlock',
  type: 'object',
  icon: Image,
  fields: [
    {
      title: 'Size',
      name: 'size',
      type: 'number',
      description: 'Sets image width for desktop',
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
      title: 'Image',
      name: 'image',
      type: 'img',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      image: 'image.asset.url',
      size: 'size'
    },
    component: ImageBlock
  }
}
