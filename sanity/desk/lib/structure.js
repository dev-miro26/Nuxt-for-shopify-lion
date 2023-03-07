import S from '@sanity/desk-tool/structure-builder'
import { Library } from './icons'
import {
  Artists,
  Artworks,
  CustomPreviews,
  Exhibitions,
  Locations,
  NewsArticles,
  Pages,
  PDFs,
  Press,
  ProjectArtists,
  Series,
  ShopCollections,
  StaffMembers,
  PDFCategories
} from '../structure'

export default () =>
  S.list()
    .title('Dashboard')
    .items([
      // Library
      S.listItem()
        .title('Library')
        .icon(Library)
        .child(
          S.list()
            .title('Library')
            .items([
              Artists,
              Artworks,
              CustomPreviews,
              Exhibitions,
              Locations,
              Pages,
              PDFs,
              PDFCategories,
              Press,
              ProjectArtists,
              Series,
              ShopCollections,
              StaffMembers
            ])
        ),

      // Settings
      S.documentListItem().schemaType('settings').id('settings'),

      S.divider(),

      // Sections
      Pages,
      Exhibitions,
      Artists,
      Artworks,
      Locations,
      PDFs,
      NewsArticles
    ])
