import { Staff } from '../../desk/lib/icons'

export default {
  name: 'staffMember',
  type: 'document',
  icon: Staff,
  fields: [
    {
      title: 'First Name',
      name: 'firstName',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Last Name',
      name: 'lastName',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Position',
      name: 'position',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string'
    }
  ],
  orderings: [
    {
      title: 'Name, A-Z',
      by: [
        { field: 'lastName', direction: 'asc' },
        { field: 'firstName', direction: 'asc' }
      ]
    },
    {
      title: 'Name, Z-A',
      by: [
        { field: 'lastName', direction: 'desc' },
        { field: 'firstName', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      position: 'position'
    },
    prepare(selection) {
      const { firstName, lastName, position } = selection
      const fullName = [firstName, lastName].join(' ')

      return {
        title: fullName,
        subtitle: position
      }
    }
  }
}
