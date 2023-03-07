import { Shop } from '../../desk/lib/icons'

export default {
  name: 'shopCollection',
  type: 'document',
  icon: Shop,
  fields: [
    {
      title: 'Internal Name',
      name: 'internalName',
      type: 'string'
    },
    {
      title: 'Display Name',
      name: 'displayName',
      type: 'string',
      description:
        'This will be the name displayed in the shop subnav menu. Must be filled for the collection to appear in the nav.',
      validation: Rule => Rule.required()
    },
    {
      title: 'Collection Handle',
      name: 'handle',
      type: 'string',
      description: "Must match the collection's handle in Shopify",
      validation: Rule => Rule.required()
    }
  ]
}
