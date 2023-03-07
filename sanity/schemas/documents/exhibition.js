import { Exhibition } from '../../desk/lib/icons'
import { colors } from '../../lib/colors'
import { blackAndWhite, grayscale, pastels } from '../../lib/palettes'

export default {
  name: 'exhibition',
  type: 'document',
  icon: Exhibition,
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      description:
        'Sets whether this is a current, past, upcoming, or fairs exhibition',
      options: {
        list: [
          {
            title: 'Current',
            value: 'current'
          },
          {
            title: 'Past',
            value: 'past'
          },
          {
            title: 'Upcoming',
            value: 'upcoming'
          },
          {
            title: 'Fairs',
            value: 'fairs'
          }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Exhibition Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Hide from search',
      name: 'hide',
      description: 'Green to hide',
      initialValue: false,
      type: 'boolean',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: "Click 'Generate' to auto-generate a slug for this page",
      options: {
        source: 'name'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Location',
      name: 'location',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: Rule => Rule.required()
    },
    {
      title: 'Opening Date',
      name: 'openingDate',
      type: 'date',
      options: {
        dateFormat: 'MM.DD.YYYY'
      },
      validation: Rule =>
        Rule.custom((openingDate, context) => {
          const { type } = context.parent
          const isUpcoming = type === 'upcoming'
          return !isUpcoming && !openingDate ? 'Required' : true
        })
    },
    {
      title: 'Closing Date',
      name: 'closingDate',
      type: 'date',
      options: {
        dateFormat: 'MM.DD.YYYY'
      },
      validation: Rule =>
        Rule.custom((closingDate, context) => {
          const { type } = context.parent
          const isPast = type === 'past'
          return isPast && !closingDate ? 'Required' : true
        })
    },
    {
      title: 'Enable Appointment Scheduling',
      name: 'allowAppointments',
      type: 'boolean',
      description:
        "Displays 'Schedule an appointment' button on exhibition detail page when enabled"
    },
    {
      title: 'Featured Image',
      name: 'featuredImage',
      type: 'img',
      description: 'Large image shown at top of exhibition preview',
      validation: Rule =>
        Rule.custom((featuredImage, context) => {
          const featuredVideo = !!context.parent.featuredVideo?.url
          return !featuredVideo && !featuredImage?.asset ? 'Required' : true
        })
    },
    {
      title: 'Featured Video',
      name: 'featuredVideo',
      type: 'vimeoEmbed',
      description: 'Alternate to featured image',
      validation: Rule =>
        Rule.custom((featuredVideo, context) => {
          const featuredImage = !!context.parent.featuredImage?.asset
          return !featuredImage && !featuredVideo?.url ? 'Required' : true
        })
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img',
      description: 'Large image shown at top of exhibition detail page',
      validation: Rule =>
        Rule.custom((heroImage, context) => {
          const { type } = context.parent
          const isUpcoming = type === 'upcoming'
          const heroVideo = !!context.parent.heroVideo?.url
          return !isUpcoming && !heroVideo && !heroImage?.asset
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
          const { type } = context.parent
          const isUpcoming = type === 'upcoming'
          const heroImage = !!context.parent.heroImage?.asset
          return !isUpcoming && !heroImage && !heroVideo?.url
            ? 'Required'
            : true
        })
    },
    {
      title: 'Hero Text',
      name: 'heroText',
      type: 'string',
      description:
        "Defaults to artist/designer's name followed by exhibition name if left blank"
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
      title: 'Group Show Name',
      name: 'groupShowName',
      type: 'string',
      description: 'Add a display name for the artists if the exhibtion is a group show'
    },
    {
      title: 'Artists',
      name: 'artists',
      type: 'array',
      of: [
        {
          type: 'reference',
          weak: true,
          to: [{ type: 'artist' }]
        }
      ],
      validation: Rule => Rule.min(1).required()
    },
    {
      title: 'Artworks',
      name: 'artworks',
      type: 'array',
      of: [{ type: 'gridArtwork' }],
      options: {
        layout: 'grid'
      }
    },
    {
      title: 'Views',
      name: 'views',
      type: 'array',
      of: [{ type: 'view' }],
      options: {
        layout: 'grid'
      }
    },
    {
      title: 'Press',
      name: 'press',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'press' }]
        }
      ]
    },
    {
      title: 'PDF',
      name: 'pdf',
      type: 'file',
      options: {
        accept: '.pdf'
      }
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
    },
    {
      title: 'Date, Most Recent',
      by: [{ field: 'openingDate', direction: 'desc' }]
    },
    {
      title: 'Date, Least Recent',
      by: [{ field: 'openingDate', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      featuredImage: 'featuredImage',
      name: 'name'
    },
    prepare(selection) {
      const { featuredImage, name } = selection

      return {
        title: name,
        media: featuredImage
      }
    }
  }
}
