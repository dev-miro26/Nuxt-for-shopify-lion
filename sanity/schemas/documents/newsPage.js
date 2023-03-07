import { Page } from '../../desk/lib/icons'

export default {
  name: 'newsPage',
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
      title: 'Section Title',
      name: 'sectionTitle',
      description: 'Optional title above news article grid',
      type: 'string'
    },
    {
      title: 'Custom Section Title',
      name: 'customSectionTitle',
      description: 'Optional title above custom news article grid',
      type: 'string'
    },
    {
      title: 'Custom News Article List',
      name: 'customNewsArticleList',
      description:
        'Add specific articles to a custom list situated below news article grid',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'newsArticle' }],
          options: {
            filter: 'category == "newsArticle"'
          }
        }
      ]
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ]
}
