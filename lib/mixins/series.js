import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  computed: {
    artistOrDesignerName() {
      return this.artistsOrDesigners?.length
        ? this.formatName(this.artistsOrDesigners[0])
        : ''
    },
    artistsOrDesigners() {
      return this.series?.artists
    },
    attribution() {
      return !this.isCollaborativeSeries ? this.artistOrDesignerName : ''
    },
    isCollaborativeSeries() {
      return this.artistsOrDesigners?.length > 1
    },
    seriesName() {
      return this.series?.name
    }
  }
}
