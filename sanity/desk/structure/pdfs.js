import S from '@sanity/desk-tool/structure-builder'
import { PDF } from '../lib/icons'

export default S.listItem()
  .title('PDFs')
  .icon(PDF)
  .child(
    S.list()
      .title('PDFs')
      .showIcons(false)
      .items([
        S.listItem()
          .title('All')
          .child(S.documentTypeList('pdf').title('All PDFs')),
        S.listItem()
          .title('By Category')
          .child(
            S.documentTypeList('pdfCategory')
              .title('Categories')
              .child(id =>
                S.documentList()
                  .title('PDFs')
                  .schemaType('pdf')
                  .params({ id: id })
                  .filter('category._ref == $id')
              )
          ),
        S.listItem()
          .title('Uncategorized')
          .child(
            S.documentList()
              .title('PDF')
              .schemaType('pdf')
              .filter('_type == "pdf" && !defined(category)')
          )
      ])
  )
