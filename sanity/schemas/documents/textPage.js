import { Page } from '../../desk/lib/icons'

export default {
  name: 'textPage',
  type: 'document',
  icon: Page,
  fields: [
    {
      title: 'Internal Name',
      name: 'internalName',
      type: 'string'
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
      title: 'Content',
      name: 'content',
      type: 'blockContentTextSuite'
    },
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      internalName: 'internalName',
      slug: 'slug'
    },
    prepare(selection) {
      const { internalName, slug } = selection
      const subtitle = slug?.current ? `/${slug.current}` : ''

      return {
        title: internalName,
        subtitle: subtitle
      }
    }
  }
}
