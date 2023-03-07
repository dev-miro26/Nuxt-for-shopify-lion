import colors from '@/assets/scss/_variables.scss'

export default {
  computed: {
    formattedColors() {
      // maps exported scss color variables to ensure all hex codes are 6 digits
      const formattedColors = Object.entries(colors).map(color => {
        const [name, hex] = color
        const formatHex = hex => {
          if (hex.length === 7) {
            return hex
          } else {
            const digits = hex
              .slice(1)
              .split('')
              .map(digit => digit + digit)
              .join('')
            return '#' + digits
          }
        }
        return [formatHex(hex), name]
      })
      return Object.fromEntries(formattedColors)
    }
  },
  methods: {
    formatIds(ids) {
      return ids ? ids.map(({ id }) => id) : null
    },
    formatName(person) {
      const firstName = person?.firstName
      const lastName = person?.lastName
      return [firstName, lastName].join(' ')
    },
    formatDate(date = '', includeYear = true) {
      if (date) {
        const [YYYY, MM, DD] = date.split('-')
        const formatDateParts = includeYear ? [MM, DD, YYYY] : [MM, DD]
        return date && formatDateParts.join('.')
      }
    },
    formatDateRange(startDate, endDate) {
      const includeYear = this.getYear(startDate) !== this.getYear(endDate)
      const formattedStartDate = this.formatDate(startDate, includeYear)
      const formattedEndDate = this.formatDate(endDate)
      const formattedDates = [formattedStartDate, formattedEndDate].filter(date => date) // prettier-ignore
      return formattedDates.join('–')
    },
    formatBlockContent(blockContent) {
      // workaround for limitation found with Sanity's GraphQL API
      return blockContent.map(block => {
        if (block._type === 'imageBlock') {
          return {
            ...block,
            image: {
              ...block.image,
              asset: {
                _type: block.image.asset._type,
                id: block.image.asset._ref
              }
            }
          }
        }
        if (block._type === 'quoteBlock') {
          return {
            _key: block._key,
            _type: block._type,
            main: block.quote
          }
        }
        return block
      })
    },
    formatSrc(assetId, params) {
      const fileName = assetId.split('-').slice(1, -1).join('-')
      const fileFormat = assetId.split('-').pop()
      const file = [fileName, fileFormat].join('.')
      const hasParams = params ? params : ''
      return `https://cdn.sanity.io/images/fvhcpakg/production/${file}${hasParams}`
    },
    determineOrientation(assetId) {
      const dimensions = assetId.split('-').slice(2, -1) + ''
      const height = dimensions.split('x')[1]
      const width = dimensions.split('x')[0]

      if (width > height) {
        return 'horizontal'
      } else {
        return 'vertical'
      }
    },
    getArtistOrDesignerPath(artistOrDesigner = {}) {
      const pathPrefix =
        artistOrDesigner?.category !== 'projectArtist'
          ? `${artistOrDesigner?.category}s`
          : ''
      const slug = artistOrDesigner?.slug?.current
      return pathPrefix && slug ? `/${pathPrefix}/${slug}` : ''
    },
    getArtistPagesDropdown(artistsOrDesigners = []) {
      return artistsOrDesigners.map(artistOrDesigner => ({
        label: this.formatName(artistOrDesigner),
        link: this.getArtistOrDesignerPath(artistOrDesigner)
      }))
    },
    getSelectedArtworkImage(gridArtwork) {
      const artwork = gridArtwork?.artwork
      const selectedImageId = gridArtwork?.selectedImageId

      if (artwork && selectedImageId) {
        const ix = artwork?.images?.findIndex(image => image.id === selectedImageId) // prettier-ignore
        return ix < 0 ? artwork?.images?.[0] : artwork?.images?.[ix]
      } else if (artwork) {
        return artwork?.images?.[0]
      }
    },
    getTextColorFromHex(hex) {
      return hex ? this.formattedColors[hex] : null
    },
    getYear(date) {
      return date ? date.split('-')[0] : null
    },
    sortByLastName(array) {
      return array.sort((a, b) => {
        a.toString().localeCompare(b.toString())
        const formatName = i =>
          [i.lastName, i.firstName]
            .filter(name => name)
            .map(name => name.toLowerCase())
            .join(', ')
        return formatName(a).localeCompare(formatName(b))
      })
    },
    sortByOpeningDate(exhibitions) {
      return exhibitions
        ? exhibitions.sort((a, b) => {
            return a.openingDate > b.openingDate ? -1 : 1
          })
        : []
    }
  }
}
