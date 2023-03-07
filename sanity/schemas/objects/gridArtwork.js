import ImageSelect from '../../components/ImageSelect'
import { Artwork } from '../../desk/lib/icons'

export default {
  title: 'Grid Artwork',
  name: 'gridArtwork',
  type: 'object',
  icon: Artwork,
  fields: [
    {
      title: 'Artwork',
      name: 'artwork',
      type: 'reference',
      to: [{ type: 'artwork' }],
      options: {
        filter: ({ document }) => {
          if (document._type == 'artist') {
            const id = document._id.replace('drafts.', '')
            return {
              filter: 'artist._ref == $id',
              params: { id: id }
            }
          }
          if (document._type === 'exhibition' || document._type === 'series') {
            const ids = document.artists.map(artist => artist._ref)
            return {
              filter: 'artist._ref in $ids',
              params: { ids: ids }
            }
          }
        }
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Selected Image',
      name: 'selectedImageId',
      type: 'string',
      inputComponent: ImageSelect
    }
  ],
  preview: {
    select: {
      images: 'artwork.images',
      selectedImageId: 'selectedImageId',
      title: 'artwork.title'
    },
    prepare(selection) {
      const { images, selectedImageId, title } = selection
      const image = images?.find(image => image._key === selectedImageId)?.asset

      return {
        title: title,
        media: image
      }
    }
  }
}
