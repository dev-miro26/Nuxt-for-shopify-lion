import { Location } from '../../desk/lib/icons'
import { blackAndWhite, grayscale, pastels } from '../../lib/palettes'

export default {
  name: 'location',
  type: 'document',
  icon: Location,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Short Name',
      name: 'shortName',
      type: 'string',
      description: 'Used as display name on location detail pages'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: "Click 'Generate' to auto-generate a slug for this page",
      options: {
        source: 'shortName'
      }
    },
    {
      title: 'Address',
      name: 'address',
      type: 'address'
    },
    {
      title: 'Hours',
      name: 'hours',
      type: 'string'
    },
    {
      title: 'Visit Link Text',
      name: 'visitLinkText',
      type: 'string',
      description: 'e.g. Click here to book an appointment'
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Phone',
      name: 'phone',
      type: 'string'
    },
    {
      title: 'Acuity Appointment ID',
      name: 'acuityId',
      type: 'string',
      description: 'Appointment type ID for Acuity'
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img',
      description: 'Large image shown at top of location detail page'
    },
    {
      title: 'Hero Video',
      name: 'heroVideo',
      type: 'vimeoEmbed',
      description: 'Alternate to hero image',
      validation: Rule =>
        Rule.custom((heroVideo, context) => {
          const { isActive, type } = context.parent
          const isActiveInternalLocation = type === 'internal' && isActive
          const heroImage = !!context.parent.heroImage?.asset
          return isActiveInternalLocation && !heroImage && !heroVideo?.url
            ? 'Required'
            : true
        })
    },
    {
      title: 'Blurb',
      name: 'blurb',
      type: 'blockContentLite',
      description: 'Short description or quote shown below hero'
    },
    {
      title: 'About',
      name: 'about',
      type: 'blockContentSuite'
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ],
  orderings: [
    {
      title: 'Name, A-Z',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Name, Z-A',
      by: [{ field: 'name', direction: 'desc' }]
    }
  ]
}
