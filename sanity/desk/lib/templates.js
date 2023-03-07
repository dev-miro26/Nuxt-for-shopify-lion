import T from '@sanity/base/initial-value-template-builder'
import { Designer, ProjectArtist } from './icons'
import { colors } from '../../lib/colors'

export default [
  // includes all default initial value templates except 'Media Tag'
  ...T.defaults().filter(template => template.spec.id !== 'media.tag'),

  // creates additional template for designers
  T.template({
    id: 'designer',
    title: 'Designer',
    schemaType: 'artist',
    icon: Designer,
    value: {
      accentColor: colors.lightCyan,
      artworksLabel: 'Work',
      category: 'designer'
    }
  }),

  // creates additional template for project artists
  T.template({
    id: 'project-artist',
    title: 'Project Artist',
    schemaType: 'artist',
    icon: ProjectArtist,
    value: {
      category: 'projectArtist'
    }
  })
]
