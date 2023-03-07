import { Artwork } from '../../desk/lib/icons'

export default {
  name: 'artwork',
  type: 'document',
  icon: Artwork,
  fields: [
    {
      title: 'Artist / Designer',
      name: 'artist',
      type: 'reference',
      weak: true,
      to: [{ type: 'artist' }],
      validation: Rule => Rule.required()
    },
    {
      title: 'Title',
      name: 'title',
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
        source: 'title'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Year',
      name: 'year',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Inventory Number',
      name: 'inventoryNumber',
      type: 'string'
    },
    {
      title: 'Medium',
      name: 'medium',
      type: 'string'
    },
    {
      title: 'Dimensions',
      name: 'dimensions',
      type: 'string'
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'img' }],
      options: {
        layout: 'grid'
      },
      validation: Rule => Rule.min(1).required()
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'tags'
    },
    {
      title: 'Artwork Description',
      name: 'description',
      type: 'blockContentLite',
      description: 'You can add a longer description to artwork here'
    },
    {
      title: 'Additional Details',
      name: 'details',
      type: 'blockContentLite',
      description: 'e.g. In collaboration with...'
    },
    {
      title: 'Related Artworks',
      name: 'relatedArtworks',
      type: 'array',
      of: [{ type: 'artwork' }]
    }
  ],
  orderings: [
    {
      title: 'Title, A-Z',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Title, Z-A',
      by: [{ field: 'title', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      featuredImage: 'images.0',
      title: 'title'
    },
    prepare(selection) {
      const { featuredImage, title } = selection

      return {
        title: title,
        media: featuredImage
      }
    }
  }
}
