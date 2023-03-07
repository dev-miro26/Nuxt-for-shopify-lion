import { PDF } from '../../desk/lib/icons'

export default {
  name: 'pdf',
  type: 'document',
  icon: PDF,
  fields: [
    {
      title: 'Internal Name',
      name: 'internalName',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'pdfCategory' }]
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: "Click 'Generate' to auto-generate a slug for this page",
      options: {
        source: 'internalName'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Related Artists',
      name: 'relatedArtists',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artist' }]
        }
      ]
    },
    {
      title: 'Related Exhibitions',
      name: 'relatedExhibitions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'exhibition' }]
        }
      ]
    },
    {
      title: 'Related Series',
      name: 'relatedSeries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'series' }]
        }
      ]
    },
    {
      title: 'File',
      name: 'file',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      validation: Rule => Rule.required()
    }
  ]
}
