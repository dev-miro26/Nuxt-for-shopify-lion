import { Address } from '../../desk/lib/icons'

export default {
  title: 'Address',
  name: 'address',
  type: 'object',
  icon: Address,
  fields: [
    {
      title: 'Street',
      name: 'street',
      type: 'string'
    },
    {
      title: 'City',
      name: 'city',
      type: 'string'
    },
    {
      title: 'State',
      name: 'state',
      type: 'string'
    },
    {
      title: 'Zipcode',
      name: 'zipcode',
      type: 'string'
    }
  ]
}
