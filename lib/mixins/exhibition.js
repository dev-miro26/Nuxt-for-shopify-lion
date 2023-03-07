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
      return this.exhibition?.artists
    },
    attribution() {
      return !this.isGroupShow ? this.artistOrDesignerName : this.groupShowName
    },
    closingDate() {
      return this.exhibition?.closingDate
    },
    dateRange() {
      return this.formatDateRange(this.openingDate, this.closingDate)
    },
    exhibitionName() {
      return this.exhibition?.name
    },
    groupShowName() {
      return this.exhibition?.groupShowName
    },
    isGroupShow() {
      return this.artistsOrDesigners?.length > 1
    },
    location() {
      return this.exhibition?.location?.name
    },
    openingDate() {
      return this.exhibition?.openingDate
    }
  }
}
