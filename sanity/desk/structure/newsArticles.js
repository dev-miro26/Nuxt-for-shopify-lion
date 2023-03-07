import S from '@sanity/desk-tool/structure-builder'
import { Article } from '../lib/icons'

export default S.documentTypeListItem('newsArticle')
  .title('News Articles')
  .icon(Article)
