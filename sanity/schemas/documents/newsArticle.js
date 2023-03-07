import { Article } from '../../desk/lib/icons'

export default {
  name: 'newsArticle',
  type: 'document',
  icon: Article,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: Rule => Rule.required()
    },
    {
      title: 'Blurb',
      name: 'blurb',
      type: 'string'
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'img'
    },
    {
      title: 'Body Content',
      name: 'bodyContent',
      type: 'blockContentSuite'
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    },
    {
      title: 'Artist',
      name: 'artist',
      type: 'reference',
      to: [{ type: 'artist' }]
    }
  ]
}
