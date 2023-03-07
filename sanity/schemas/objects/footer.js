import { Info } from '../../desk/lib/icons'

export default {
  title: 'Global Footer',
  name: 'footer',
  type: 'object',
  icon: Info,
  fields: [
    {
      title: 'Locations',
      name: 'locations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'location' }]
        }
      ]
    },
    {
      title: 'Footer Links',
      name: 'footerLinks',
      type: 'array',
      of: [{ type: 'footerLink' }],
      validation: Rule => Rule.max(12).warning('Maximum of 12 links allowed')
    },
    {
      title: 'Social Links',
      name: 'socialLinks',
      type: 'array', 
      of: [{
        type: 'socialLink'
      }]
    },
    {
      title: 'General Email',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Copyright Text',
      name: 'copyrightText',
      type: 'string'
    }
  ]
}
