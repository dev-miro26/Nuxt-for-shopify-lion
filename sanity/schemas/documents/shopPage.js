import { Page } from '../../desk/lib/icons'

export default {
  name: 'shopPage',
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
      title: 'Shop Navigation',
      name: 'navigation',
      type: 'shopNav'
    }
  ]
}
