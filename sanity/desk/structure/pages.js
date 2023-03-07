import S from '@sanity/desk-tool/structure-builder'
import { Pages } from '../lib/icons'

const exhibitionsPageCurrent = S.documentListItem()
  .schemaType('exhibitionsPage')
  .id('exhibitionsPageCurrent')

const exhibitionsPageUpcoming = S.documentListItem()
  .schemaType('exhibitionsPage')
  .id('exhibitionsPageUpcoming')

const exhibitionsPagePast = S.documentListItem()
  .schemaType('exhibitionsPage')
  .id('exhibitionsPagePast')

const exhibitionPages = S.listItem()
  .title('Exhibition Pages')
  .icon(Pages)
  .child(
    S.list()
      .title('Exhibition Pages')
      .items([
        exhibitionsPageCurrent,
        exhibitionsPageUpcoming,
        exhibitionsPagePast
      ])
  )
// Home Page
const homePage = S.documentListItem().schemaType('homePage').id('homePage')
// About Page
const aboutPage = S.documentListItem().schemaType('aboutPage').id('aboutPage')
// Consignment Page
const consignmentPage = S.documentListItem().schemaType('consignmentPage').id('consignmentPage')
// Artists Page
const artistsPage = S.documentListItem().schemaType('artistsPage').id('artistsPage')
// News Page
const newsPage = S.documentListItem().schemaType('newsPage').id('newsPage')
// Shop Page
const shopPage = S.documentListItem().schemaType('shopPage').id('shopPage')
// Contact Page
const contactPage = S.documentListItem().schemaType('contactPage').id('contactPage')

const textPages = S.documentTypeListItem('textPage')
  .title('Text Pages')
  .icon(Pages)

export default S.listItem()
  .title('Pages')
  .icon(Pages)
  .child(
    S.list()
      .title('Pages')
      .items([homePage, aboutPage, consignmentPage, artistsPage, exhibitionPages, newsPage, shopPage, contactPage, textPages])
  )
