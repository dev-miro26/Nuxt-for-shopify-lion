export default {
  name: 'blockContentSuite',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Body', value: 'normal' }
      ],
      lists: [
        { title: 'Bulleted List', value: 'bullet' },
        { title: 'Numbered List', value: 'number' }
      ],
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
    },
    {
      type: 'imageBlock'
    },
    {
      type: 'quoteBlock'
    },
    {
      type: 'videoBlock'
    }
  ]
}
