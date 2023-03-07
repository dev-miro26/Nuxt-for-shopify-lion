import QuoteBlock from '../../components/QuoteBlock'
import { Text } from '../../desk/lib/icons'

export default {
  title: 'Quote Block',
  name: 'quoteBlock',
  type: 'object',
  icon: Text,
  fields: [
    {
      title: 'Quote',
      name: 'quote',
      type: 'blockContentLite',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      quote: 'quote'
    },
    prepare(selection) {
      const { quote } = selection
      return {
        quote: quote
      }
    },
    component: QuoteBlock
  }
}
