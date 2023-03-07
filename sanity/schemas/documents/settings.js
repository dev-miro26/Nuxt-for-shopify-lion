import { Settings } from '../../desk/lib/icons'

export default {
  name: 'settings',
  type: 'document',
  icon: Settings,
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
      title: 'Global Footer',
      name: 'footer',
      type: 'footer'
    },
    {
      title: 'Global SEO',
      name: 'seo',
      type: 'seo'
    },
    {
      title: 'Acuity Scheduling',
      name: 'acuityEnabled',
      type: 'boolean',
      description: 'Globally enables/disables Acuity Scheduling'
    }
  ]
}
