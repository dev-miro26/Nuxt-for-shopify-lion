import { Page } from '../../desk/lib/icons'
import { blackAndWhite } from '../../lib/palettes'

export default {
  name: 'exhibitionsPage',
  type: 'document',
  icon: Page,
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      title: 'Document Name',
      name: 'documentName',
      type: 'string',
      hidden: true,
      readonly: true
    },
    {
      title: 'Exhibitions',
      name: 'exhibitions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'exhibition' }]
        }
      ]
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img',
      description: 'Large image shown when page has no exhibtions',
      validation: Rule =>
        Rule.custom((heroImage, context) => {
          const { exhibitions } = context.parent
          const hasExhibitions = exhibitions.length > 0
          const heroVideo = !!context.parent.heroVideo?.url
          return !hasExhibitions && !heroVideo && !heroImage?.asset
            ? 'Required'
            : true
        })
    },
    {
      title: 'Hero Video',
      name: 'heroVideo',
      type: 'vimeoEmbed',
      description: 'Alternate to hero image',
      validation: Rule =>
        Rule.custom((heroVideo, context) => {
          const { exhibitions } = context.parent
          const hasExhibitions = exhibitions.length > 0
          const heroImage = !!context.parent.heroImage?.asset
          return !hasExhibitions && !heroImage && !heroVideo?.url
            ? 'Required'
            : true
        })
    },
    {
      title: 'Hero Text',
      name: 'heroText',
      type: 'string',
      description: 'Message shown over hero image when page has no exhibitions',
      validation: Rule =>
        Rule.custom((heroText, context) => {
          const { exhibitions } = context.parent
          const hasExhibitions = exhibitions.length > 0
          return !hasExhibitions && !heroText ? 'Required' : true
        })
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ]
}
