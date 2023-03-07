<template>
  <nuxt-link :to="path" class="collection-grid-item">
    <div class="profile-image-crop">
      <SanityImage :image="image" />
    </div>
    <p class="text-md">{{ name }}</p>
  </nuxt-link>
</template>

<script>
import helpers from '@/lib/mixins/helpers'
export default {
  mixins: [helpers],
  props: {
    profile: {
      type: Object,
      required: true
    },
    variation: {
      type: String,
      default: ''
    }
  },
  computed: {
    image() {
      return this.variation === 'artist'
        ? this.profile.featuredImage
        : this.profile.heroImage
    },
    name() {
      return this.variation === 'artist'
        ? this.formatName(this.profile)
        : this.profile.title
    },
    // ? not sure if I need to change the computed path value
    path() {
      return this.variation === 'artist'
        ? this.getArtistOrDesignerPath(this.profile)
        : `/news/${this.profile.slug.current}`
    }
  }
}
</script>

<style lang="scss"></style>
