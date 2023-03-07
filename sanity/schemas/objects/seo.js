import { Info } from '../../desk/lib/icons'

export default {
  title: 'SEO',
  name: 'seo',
  type: 'object',
  icon: Info,
  fields: [
    {
      title: 'Meta Title',
      name: 'title',
      type: 'string',
      description: "Appears after 'ARTLIFE | ' in page title (40-50 characters)"
    },
    {
      title: 'Meta Description',
      name: 'description',
      type: 'text',
      description: 'Brief description of page content (50-160 characters)',
      rows: 3
    },
    {
      title: 'Meta Image',
      name: 'image',
      type: 'image',
      description: 'Image used when link is shared on social media or iMessage'
    }
  ]
}
