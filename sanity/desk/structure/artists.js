import S from '@sanity/desk-tool/structure-builder'
import { Artist } from '../lib/icons'

export default S.listItem()
  .title('Artists')
  .icon(Artist)
  .child(
    S.documentList()
      .title('Artists')
      .schemaType('artist')
      .filter('category == "artist"')
      .menuItems(S.orderingMenuItemsForType('artist'))
      .initialValueTemplates([S.initialValueTemplateItem('artist')])
  )
