import { ExternalLink } from '../../desk/lib/icons'

export default {
  title: 'External Link',
  name: 'externalLink',
  type: 'object',
  icon: ExternalLink,
  fields: [
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: Rule =>
        Rule.required().uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
    }
  ]
}
