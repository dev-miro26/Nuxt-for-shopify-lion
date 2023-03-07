import { ExternalLink } from '../../desk/lib/icons'

export default {
  title: 'Footer Link',
  name: 'footerLink',
  type: 'object',
  icon: ExternalLink,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Internal Link',
      name: 'internalLink',
      type: 'internalLink'
    },
    {
      title: 'External Link',
      name: 'externalLink',
      type: 'externalLink'
    },
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      const { title } = selection

      return {
        title
      }
    }
  }
}
