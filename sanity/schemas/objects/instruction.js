import { Text } from '../../desk/lib/icons'

export default {
  title: 'Instruction',
  name: 'instruction',
  type: 'object',
  icon: Text,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'blockContentLite'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'img',
      validation: Rule => Rule.required()
    },
  ]
}
