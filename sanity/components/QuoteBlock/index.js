import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import BlockImagePreview from 'part:@sanity/components/previews/block-image'
import { Text } from '../../desk/lib/icons'
import styles from './styles.css'

const QuoteBlock = ({ value }) => {
  const DefaultPreview = <BlockImagePreview media={Text} />

  const QuotePreview = (
    <div className={styles.quoteBlock}>
      <BlockContent blocks={value.quote} />
    </div>
  )

  return value?.quote ? QuotePreview : DefaultPreview
}

export default QuoteBlock
