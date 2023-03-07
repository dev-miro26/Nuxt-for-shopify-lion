import { Page } from '../../desk/lib/icons'
import { blackAndWhite, grayscale, pastels } from '../../lib/palettes'

export default {
  name: 'plusPage',
  type: 'document',
  icon: Page,
  // __experimental_actions: ['update', 'publish'],
  fields: [
    {
      title: 'Document Name',
      name: 'documentName',
      type: 'string'
      // hidden: true,
      // readonly: true
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img',
      description: 'Large image shown at top of S94+ page',
      validation: Rule =>
        Rule.custom((heroImage, context) => {
          const heroVideo = !!context.parent.heroVideo?.url
          return !heroVideo && !heroImage?.asset ? 'Required' : true
        })
    },
    {
      title: 'Hero Video',
      name: 'heroVideo',
      type: 'vimeoEmbed',
      description: 'Alternate to hero image',
      validation: Rule =>
        Rule.custom((heroVideo, context) => {
          const heroImage = !!context.parent.heroImage?.asset
          return !heroImage && !heroVideo?.url ? 'Required' : true
        })
    },
    {
      title: 'Hero Text',
      name: 'heroText',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Blurb',
      name: 'blurb',
      type: 'blockContentLite',
      description: 'Short description or quote shown below hero'
    },
    {
      title: 'Mission',
      name: 'mission',
      type: 'blockContentSuite'
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ]
}
