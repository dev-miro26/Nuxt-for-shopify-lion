import { InternalLink } from '../../desk/lib/icons'

export default {
  title: 'Internal Link',
  name: 'internalLink',
  type: 'object',
  icon: InternalLink,
  fields: [
    {
      title: 'Path',
      name: 'url',
      type: 'url',
      description: 'e.g. /artists or /exhibitions/exhibition-name',
      validation: Rule =>
        Rule.required().uri({
          allowRelative: true,
          relativeOnly: true
        })
    }
  ]
}
