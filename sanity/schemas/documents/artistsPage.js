import { Page } from '../../desk/lib/icons'

export default {
  name: 'artistsPage',
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
      title: 'Section Title',
      name: 'sectionTitle',
      description: 'Optional',
      type: 'string'
    },
    {
      title: 'Artists',
      name: 'artists',
      type: 'array',
      of: [
        {
          type: 'reference',
          weak: true,
          to: [{ type: 'artist' }],
          options: {
            filter: 'category == "artist"'
          }
        }
      ]
    },
    {
      title: 'Custom Section Title',
      name: 'customSectionTitle',
      type: 'string'
    },
    {
      title: 'Custom Artists List',
      name: 'customArtistsList',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artist' }],
          options: {
            filter: 'category == "artist"'
          }
        }
      ]
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ]
}
