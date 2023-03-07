import { Series } from '../../desk/lib/icons'
import { colors } from '../../lib/colors'
import { blackAndWhite, grayscale, pastels } from '../../lib/palettes'

export default {
  name: 'series',
  type: 'document',
  icon: Series,
  fields: [
    {
      title: 'Series Name',
      name: 'name',
      type: 'string',
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
      title: 'Description',
      name: 'description',
      type: 'string',
      description: "e.g. 'Featured Series'"
    },
    {
      title: 'Featured Image',
      name: 'featuredImage',
      type: 'img',
      description: 'Large image shown at top of series preview',
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
      description:
        "Defaults to artist/designer's name followed by series name if left blank"
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
      title: 'Artists',
      name: 'artists',
      type: 'array',
      of: [
        {
          type: 'reference',
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
      title: 'Press',
      name: 'press',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'press' }],
          options: {
            filter: ({ document }) => {
              const id = document._id.replace('drafts.', '')
              return {
                filter: 'relatedSeries[]._ref == $id',
                params: { id: id }
              }
            }
          }
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
