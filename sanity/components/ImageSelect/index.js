import React, { useEffect, useState } from 'react'
import client from 'part:@sanity/base/client'
import FormField from 'part:@sanity/components/formfields/default'
import { withDocument, withValuePath } from 'part:@sanity/form-builder'
import PatchEvent, { set } from 'part:@sanity/form-builder/patch-event'
import styles from './styles.css'

const ImageSelect = props => {
  const [artworkId, setArtworkId] = useState(null)
  const [artworkImages, setArtworkImages] = useState(null)

  // get reference to currently selected gridArtwork item
  const gridArtworkPath = props.getValuePath()
  const gridArtworkId = gridArtworkPath.find(x => x._key)?._key
  const gridArtwork = props.document.artworks.find(
    gridArtwork => gridArtwork._key === gridArtworkId
  )

  // get id of artwork selected in gridArtwork item
  const id = gridArtwork?.artwork?._ref || null

  // update state if artwork was changed
  id !== artworkId && setArtworkId(id)

  useEffect(() => {
    const getArtworkImages = async () => {
      const query = '*[_type == "artwork" && _id == $id]'
      const params = { id: artworkId }
      const response = await client.fetch(query, params)
      const artwork = response[0]
      const images = artwork?.images
      setArtworkImages(images)
    }

    getArtworkImages()
  }, [artworkId])

  const getClasses = image => {
    const isSelected = image._key === props.value
    return [styles.imageBorder, isSelected && styles.selected].join(' ')
  }

  const getImageUrl = image => {
    const assetId = image.asset._ref
    const fileName = assetId.split('-').slice(1, -1).join('-')
    const fileFormat = assetId.split('-').pop()
    const file = [fileName, fileFormat].join('.')
    return `https://cdn.sanity.io/images/ay1kdiap/production/${file}?auto=format&w=200`
  }

  const handleSelect = image => {
    props.onChange(PatchEvent.from(set(image._key)))
  }

  const DefaultPreview = (
    <FormField label={props.type.title} description={'Select an artwork'} />
  )

  const ImageSelectPreview = (
    <FormField label={props.type.title}>
      <div className={styles.imagesContainer}>
        {artworkImages?.map((image, ix) => (
          <div key={ix} className={styles.imageContainer}>
            <div
              className={getClasses(image)}
              onClick={() => handleSelect(image)}
            >
              <img src={getImageUrl(image)} className={styles.image} />
            </div>
          </div>
        ))}
      </div>
    </FormField>
  )

  return artworkImages ? ImageSelectPreview : DefaultPreview
}

export default withDocument(withValuePath(ImageSelect))
