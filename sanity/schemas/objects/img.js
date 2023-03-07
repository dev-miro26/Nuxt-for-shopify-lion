import { Image } from '../../desk/lib/icons'
import { blackAndWhite } from '../../lib/palettes'

export default {
  title: 'Image',
  name: 'img',
  type: 'image',
  icon: Image,
  fields: [
    {
      title: 'Alternative Text',
      name: 'alt',
      type: 'string',
      description: 'Short description of image for web accesibility purposes',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'blockContentLite'
    },
    {
      title: 'Caption Color',
      name: 'captionColor',
      type: 'colors',
      options: {
        list: blackAndWhite
      },
      validation: Rule =>
        Rule.custom((captionColor, context) => {
          const hasCaption = !!context.parent.caption
          return hasCaption && !captionColor
            ? 'Caption color is required when caption is provided'
            : true
        })
    }
  ]
}
