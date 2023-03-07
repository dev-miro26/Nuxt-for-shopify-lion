import React from 'react'
import BlockImagePreview from 'part:@sanity/components/previews/block-image'
import { Video } from '../../desk/lib/icons'
import styles from './styles.css'

const VideoBlock = ({ value }) => {
  const src = value?.url
  const sizeClass = value?.size < 1 ? styles.halfWidth : styles.fullWidth
  const containerClass = `${styles.videoBlock} ${sizeClass}`

  const DefaultPreview = <BlockImagePreview media={Video} />

  const VideoPreview = (
    <div className={containerClass}>
      <video className={styles.iframe} controls>
        <source src={src} />
      </video>
    </div>
  )

  return src ? VideoPreview : DefaultPreview
}

export default VideoBlock
