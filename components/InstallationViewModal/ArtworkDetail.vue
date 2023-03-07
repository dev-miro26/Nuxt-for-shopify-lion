<template>
  <div class="view-artwork-detail">
    <nuxt-link :to="path">
      <p>{{ number }}</p>
      <p>{{ artistOrDesignerName }}</p>
      <p>{{ title }}, {{ year }}</p>
      <p>{{ medium }}</p>
      <p>{{ dimensions }}</p>
    </nuxt-link>
  </div>
</template>

<script>
import artwork from '@/lib/mixins/artwork'
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [artwork, helpers],
  props: {
    artwork: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    artistOrDesignerPath() {
      return this.getArtistOrDesignerPath(this.artistOrDesigner)
    },
    artworkSlug() {
      return this.artwork?.slug?.current
    },
    number() {
      return this.index + 1
    },
    path() {
      return this.artistOrDesignerPath && this.artworkSlug
        ? `${this.artistOrDesignerPath}/artworks/${this.artworkSlug}`
        : '/'
    }
  }
}
</script>

<style lang="scss">
.view-artwork-detail {
  display: flex;
}
</style>
