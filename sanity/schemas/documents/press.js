import { Press } from '../../desk/lib/icons'
import { formatDate } from '../../lib/helpers'

export default {
  name: 'press',
  type: 'document',
  icon: Press,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Publication Date',
      name: 'publicationDate',
      type: 'date',
      options: {
        dateFormat: 'MM.DD.YYYY'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
      validation: Rule => Rule.uri()
    }
  ],
  orderings: [
    {
      title: 'Title, A-Z',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Title, Z-A',
      by: [{ field: 'title', direction: 'desc' }]
    },
    {
      title: 'Date, Oldest-Newest',
      by: [{ field: 'publicationDate', direction: 'asc' }]
    },
    {
      title: 'Date, Newest-Oldest',
      by: [{ field: 'publicationDate', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      publicationDate: 'publicationDate',
      title: 'title'
    },
    prepare(selection) {
      const { publicationDate, title } = selection
      const formattedDate = formatDate(publicationDate)
      const subtitle = `${formattedDate}`

      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
}
