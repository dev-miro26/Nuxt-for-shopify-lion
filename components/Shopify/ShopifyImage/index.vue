<template>
  <img v-if="src" :src="src" :alt="alt" />
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: false,
      default: () => {}
    },
    algoliaImageUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    alt() {
      return this.algoliaImageUrl ? 'Artlife Product' : this.image.altText
    },
    src() {
      return this.algoliaImageUrl
        ? this.algoliaImageUrl
        : this.image.originalSrc
    }
  }
}
</script>

<style lang="scss"></style>
