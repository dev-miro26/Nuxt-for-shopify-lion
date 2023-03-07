<template>
  <nuxt-link v-if="path" :to="path">
    <SanityImage :image="image" />
    <h4>{{ artworkDetails }}</h4>
  </nuxt-link>

  <SanityImage v-else :image="image" />
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  computed: {
    artistOrDesigner() {
      return this.artwork?.artist
    },
    artworkDetails() {
      return `${this.artwork?.title}, ${this.artwork?.year}`
    },
    artistOrDesignerPath() {
      return this.getArtistOrDesignerPath(this.artistOrDesigner)
    },
    artwork() {
      return this.node?.artwork
    },
    artworkSlug() {
      return this.artwork?.slug?.current
    },
    projectArtistPath() {
      const slug = this.artistOrDesigner?.slug?.current
      return this.artistOrDesigner?.category === 'projectArtist' ? slug : null
    },
    path() {
      return this.artistOrDesignerPath && this.artworkSlug
        ? `${this.artistOrDesignerPath}/artworks/${this.artworkSlug}`
        : this.projectArtistPath && this.artworkSlug
        ? `/${this.projectArtistPath}/artworks/${this.artworkSlug}`
        : null
    },
    image() {
      return this.getSelectedArtworkImage(this.node)
    }
  }
}
</script>

<style></style>
