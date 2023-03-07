import { Page } from '../../desk/lib/icons'
import { blackAndWhite } from '../../lib/palettes'

export default {
  name: 'homePage',
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
      title: 'Feed',
      name: 'feed',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'exhibition' }]
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
