import S from '@sanity/desk-tool/structure-builder'
import { Exhibition } from '../lib/icons'

export default S.listItem()
  .title('Exhibitions')
  .icon(Exhibition)
  .child(
    S.list()
      .title('Exhibitions')
      .showIcons(false)
      .items([
        // All
        S.documentTypeListItem('exhibition').title('All'),

        // Current
        S.listItem()
          .title('Current')
          .child(
            S.documentList()
              .title('Current')
              .schemaType('exhibition')
              .filter('type == "current"')
              .menuItems(S.orderingMenuItemsForType('exhibition'))
          ),

        // Past
        S.listItem()
          .title('Past')
          .child(
            S.documentList()
              .title('Past')
              .schemaType('exhibition')
              .filter('type == "past"')
              .menuItems(S.orderingMenuItemsForType('exhibition'))
          ),

        // Upcoming
        S.listItem()
          .title('Upcoming')
          .child(
            S.documentList()
              .title('Upcoming')
              .schemaType('exhibition')
              .filter('type == "upcoming"')
              .menuItems(S.orderingMenuItemsForType('exhibition'))
          )
      ])
  )
