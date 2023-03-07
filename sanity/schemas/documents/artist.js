import { Artist } from '../../desk/lib/icons'
import { colors } from '../../lib/colors'
import { blackAndWhite, grayscale, pastels } from '../../lib/palettes'

const handleValidation = (Rule, error = 'Required') =>
  Rule.custom((value, context) => {
    const { category } = context.parent
    const isProjectArtist = category === 'projectArtist'
    return !isProjectArtist && !value ? error : true
  })

export default {
  name: 'artist',
  type: 'document',
  icon: Artist,
  fields: [
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: [
          {
            title: 'Artist',
            value: 'artist'
          },
          {
            title: 'Designer',
            value: 'designer'
          },
          {
            title: 'Project Artist',
            value: 'projectArtist'
          }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'First Name',
      name: 'firstName',
      type: 'string'
    },
    {
      title: 'Last Name',
      name: 'lastName',
      type: 'string',
      description: 'Or mononymn if artist/designer goes by a single name',
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
        source: document => {
          const { firstName, lastName } = document
          return [firstName, lastName].join(' ')
        }
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Featured Image',
      name: 'featuredImage',
      type: 'img',
      description: 'Artist image seen on artist or designer index page',
      validation: Rule => handleValidation(Rule)
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img',
      description: 'Large image shown at top of artist or designer detail page',
      validation: Rule =>
        Rule.custom((heroImage, context) => {
          const { category } = context.parent
          const isProjectArtist = category === 'projectArtist'
          const heroVideo = !!context.parent.heroVideo?.url
          return !isProjectArtist && !heroVideo && !heroImage?.asset
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
          const { category } = context.parent
          const isProjectArtist = category === 'projectArtist'
          const heroImage = !!context.parent.heroImage?.asset
          return !isProjectArtist && !heroImage && !heroVideo?.url
            ? 'Required'
            : true
        })
    },
    {
      title: 'Hero Headline',
      name: 'heroHeadline',
      type: 'string',
      description: "Defaults to artist or designer's name if left blank"
    },
    {
      title: 'Hero Subline',
      name: 'heroSubline',
      type: 'string',
      description: 'e.g. b. 1930 – d. 2002'
    },
    {
      title: 'Blurb',
      name: 'blurb',
      type: 'blockContentLite',
      description: 'Short description or quote shown below hero'
    },
    {
      title: 'Artworks Label',
      name: 'artworksLabel',
      type: 'string',
      description:
        'How should we refer to what this artist or designer produces?',
      options: {
        list: ['Artwork', 'Work']
      },
      validation: Rule => handleValidation(Rule)
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
      title: 'Exhibitions',
      name: 'exhibitions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'exhibition' }],
          weak: true
        }
      ]
    },
    {
      title: 'Biography Image',
      name: 'bioImage',
      type: 'img'
    },
    {
      title: 'Biography',
      name: 'bio',
      type: 'blockContentSuite'
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
      title: 'CV',
      name: 'cv',
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
  initialValue: {
    artworksLabel: 'Artwork',
    category: 'artist',
  },
  orderings: [
    {
      title: 'Name, A-Z',
      by: [
        { field: 'lastName', direction: 'asc' },
        { field: 'firstName', direction: 'asc' }
      ]
    },
    {
      title: 'Name, Z-A',
      by: [
        { field: 'lastName', direction: 'desc' },
        { field: 'firstName', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      featuredImage: 'featuredImage',
      firstName: 'firstName',
      lastName: 'lastName'
    },
    prepare(selection) {
      const { featuredImage, firstName, lastName } = selection
      const fullName = [firstName, lastName].join(' ')

      return {
        title: fullName,
        media: featuredImage
      }
    }
  }
}
