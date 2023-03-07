import S from '@sanity/desk-tool/structure-builder'
import { Artwork } from '../lib/icons'

export default S.listItem()
  .title('Artworks')
  .icon(Artwork)
  .child(
    S.list()
      .title('Artworks')
      .showIcons(false)
      .items([
        // All Artworks
        S.listItem()
          .title('All')
          .child(S.documentTypeList('artwork').title('All Artworks')),

        // Artworks by Artist
        S.listItem()
          .title('By Artist')
          .child(
            S.documentList('artist')
              .title('Artists')
              .filter('category == "artist"')
              .menuItems(S.orderingMenuItemsForType('artist'))
              .child(id =>
                S.documentList()
                  .title(`Artworks by Artist`)
                  .schemaType('artwork')
                  .filter('artist._ref == $id')
                  .params({ id: id })
              )
          ),

        // Artworks by Designer
        S.listItem()
          .title('By Designer')
          .child(
            S.documentList('artist')
              .title('Designers')
              .filter('category == "designer"')
              .menuItems(S.orderingMenuItemsForType('artist'))
              .child(id =>
                S.documentList()
                  .title(`Artworks by Designer`)
                  .schemaType('artwork')
                  .filter('artist._ref == $id')
                  .params({ id: id })
              )
          ),

        // Artworks by Project Artist
        S.listItem()
          .title('By Project Artist')
          .child(
            S.documentList('artist')
              .title('Project Artists')
              .filter('category == "projectArtist"')
              .menuItems(S.orderingMenuItemsForType('artist'))
              .child(id =>
                S.documentList()
                  .title(`Artworks by Project Artist`)
                  .schemaType('artwork')
                  .filter('artist._ref == $id')
                  .params({ id: id })
              )
          )
      ])
  )
