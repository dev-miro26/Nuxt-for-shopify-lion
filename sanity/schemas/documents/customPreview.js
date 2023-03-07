import { Preview } from '../../desk/lib/icons'

export default {
  name: 'customPreview',
  type: 'document',
  icon: Preview,
  fields: [
    {
      title: 'Internal Name',
      name: 'internalName',
      type: 'string'
    },
    {
      title: 'Internal Link',
      name: 'internalLink',
      type: 'internalLink',
      description: 'Set if preview should link to an internal page'
    },
    {
      title: 'External Link',
      name: 'externalLink',
      type: 'externalLink',
      description: 'Set if preview should link to another site'
    },
    {
      title: 'Featured Image',
      name: 'featuredImage',
      type: 'img',
      description: 'Large image shown at top of preview',
      validation: Rule =>
        Rule.custom((featuredImage, context) => {
          const featuredVideo = !!context.parent.featuredVideo?.url
          return !featuredVideo && !featuredImage?.asset ? 'Required' : true
        })
    },
    {
      title: 'Featured Video',
      name: 'featuredVideo',
      type: 'vimeoEmbed',
      description: 'Alternate to featured image',
      validation: Rule =>
        Rule.custom((featuredVideo, context) => {
          const featuredImage = !!context.parent.featuredImage?.asset
          return !featuredImage && !featuredVideo?.url ? 'Required' : true
        })
    },
    {
      title: 'Left Text',
      name: 'copyLeft',
      type: 'string',
      description: 'Small text appearing in top left'
    },
    {
      title: 'Center Text',
      name: 'copyCenter',
      type: 'string',
      description: 'Small uppercase text appearing above or below main text'
    },
    {
      title: 'Right Text',
      name: 'copyRight',
      type: 'string',
      description: 'Small text appearing in top right'
    },
    {
      title: 'Main Text',
      name: 'copyMain',
      type: 'string',
      description: 'Large uppercase text appearing in center',
      validation: Rule => Rule.required()
    }
  ],
  orderings: [
    {
      title: 'Name, A-Z',
      by: [{ field: 'internalName', direction: 'asc' }]
    },
    {
      title: 'Name, Z-A',
      by: [{ field: 'internalName', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      featuredImage: 'featuredImage',
      internalName: 'internalName'
    },
    prepare(selection) {
      const { featuredImage, internalName } = selection

      return {
        title: internalName,
        media: featuredImage
      }
    }
  }
}
