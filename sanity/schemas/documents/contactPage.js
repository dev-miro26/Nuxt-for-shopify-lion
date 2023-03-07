import { Page } from '../../desk/lib/icons'

export default {
  name: 'contactPage',
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
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img',
      description: 'Large image shown at top of about page',
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
      title: 'Location',
      name: 'locations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'location' }]
        }
      ],
      validation: Rule => Rule.max(1).warning('Maximum of 1 location allowed')
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ]
}
