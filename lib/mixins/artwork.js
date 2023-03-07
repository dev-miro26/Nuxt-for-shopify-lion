import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  computed: {
    artistOrDesigner() {
      return this.artwork?.artist
    },
    artistOrDesignerName() {
      return this.artistOrDesigner
        ? this.formatName(this.artistOrDesigner)
        : null
    },
    dimensions() {
      return this.artwork?.dimensions
    },
    medium() {
      return this.artwork?.medium
    },
    title() {
      return this.artwork?.title
    },
    year() {
      return this.artwork?.year
    }
  }
}
