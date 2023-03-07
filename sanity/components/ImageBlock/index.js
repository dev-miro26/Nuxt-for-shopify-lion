import React from 'react'
import BlockImagePreview from 'part:@sanity/components/previews/block-image'
import { Image } from '../../desk/lib/icons'
import styles from './styles.css'

const ImageBlock = ({ value }) => {
  const sizeClass = value?.size < 1 ? styles.halfWidth : styles.fullWidth

  const DefaultPreview = <BlockImagePreview media={Image} />

  const ImagePreview = (
    <div className={styles.imageBlock}>
      <img src={value?.image} className={sizeClass} />
    </div>
  )

  return value?.image ? ImagePreview : DefaultPreview
}

export default ImageBlock
