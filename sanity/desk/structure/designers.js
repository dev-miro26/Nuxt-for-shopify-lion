import S from '@sanity/desk-tool/structure-builder'
import { Designer } from '../lib/icons'

export default S.listItem()
  .title('Designers')
  .icon(Designer)
  .child(
    S.documentList()
      .title('Designers')
      .schemaType('artist')
      .filter('category == "designer"')
      .menuItems(S.orderingMenuItemsForType('artist'))
      .initialValueTemplates([S.initialValueTemplateItem('designer')])
  )
