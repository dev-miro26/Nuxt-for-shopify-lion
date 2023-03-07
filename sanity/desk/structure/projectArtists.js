import S from '@sanity/desk-tool/structure-builder'
import { ProjectArtist } from '../lib/icons'

export default S.listItem()
  .title('Project Artists')
  .icon(ProjectArtist)
  .child(
    S.documentList()
      .title('Project Artists')
      .schemaType('artist')
      .filter('category == "projectArtist"')
      .menuItems(S.orderingMenuItemsForType('artist'))
      .initialValueTemplates([S.initialValueTemplateItem('project-artist')])
  )
