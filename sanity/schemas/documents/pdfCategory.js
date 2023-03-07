import { PDF } from '../../desk/lib/icons'

export default {
  name: 'pdfCategory',
  type: 'document',
  icon: PDF,
  fields: [
    {
      title: 'Category Name',
      name: 'categoryName',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}
