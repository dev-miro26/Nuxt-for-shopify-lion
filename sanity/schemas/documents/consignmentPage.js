import { Page } from '../../desk/lib/icons'

export default {
  name: 'consignmentPage',
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
      title: 'About',
      name: 'about',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'blockContentLite'
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img',
      description: 'Large image shown at top of consignment page',
    },
    {
      title: 'Instruction Blocks',
      name: 'instructionBlocks',
      type: 'array',
      of: [
        {
          type: 'instructionBlock'
        }
      ]
    }, {
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [
        { type: 'faq' }
      ]
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ]
}
