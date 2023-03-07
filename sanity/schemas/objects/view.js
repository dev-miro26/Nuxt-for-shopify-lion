import { View } from '../../desk/lib/icons'

export default {
  name: 'view',
  type: 'object',
  icon: View,
  fields: [
    {
      title: 'Artworks',
      name: 'artworks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artwork' }],
          weak: true,
          options: {
            filter: ({ document }) => {
              const ids = document.artworks.map(
                gridArtwork => gridArtwork.artwork?._ref
              )
              return {
                filter: '_id in $ids',
                params: { ids: ids }
              }
            }
          }
        }
      ],
      description: 'Artworks included in this view'
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'img',
      validation: Rule => Rule.required()
    },
    {
      title: 'Desktop Overlay',
      name: 'overlayDesktop',
      type: 'image',
      description:
        'Should be SVG with transparent background and dimensions matching Photo'
    },
    {
      title: 'Mobile Overlay',
      name: 'overlayMobile',
      type: 'image',
      description:
        'Should be SVG with transparent background, slightly larger text than Desktop Overlay, and dimensions matching Photo'
    }
  ],
  preview: {
    select: {
      photo: 'photo'
    },
    prepare(selection) {
      const { photo } = selection

      return {
        title: 'Exhibition View',
        media: photo
      }
    }
  }
}
