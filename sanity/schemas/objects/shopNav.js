export default {
  title: 'Shop Navigation',
  name: 'shopNav',
  type: 'object',
  fields: [
    {
      title: 'Regular Collections',
      name: 'regularCollections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'shopCollection' }]
        }
      ]
    },
    {
      title: 'Featured Collections',
      name: 'featuredCollections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'shopCollection' }]
        }
      ]
    }
  ]
}
