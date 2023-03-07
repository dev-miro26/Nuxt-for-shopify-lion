import { Text } from '../../desk/lib/icons'

export default {
  title: 'Instruction Block',
  name: 'instructionBlock',
  type: 'object',
  icon: Text,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Instructions',
      name: 'instructions',
      type: 'array',
      of: [
        {
          type: 'instruction'
        }
      ],
      validation: Rule => Rule.max(3)
    },
  ]
}
