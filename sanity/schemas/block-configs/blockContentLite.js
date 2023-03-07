export default {
  name: 'blockContentLite',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' }
        ],
        annotations: [
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'internalLink'
          },
          {
            title: 'External Link',
            name: 'externalLink',
            type: 'externalLink'
          }
        ]
      }
    }
  ]
}
