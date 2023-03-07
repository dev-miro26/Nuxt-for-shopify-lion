<template>
  <LinkHandler v-if="includeLink" :to="path">
    <PreviewBlock
      :attribution="attribution"
      :exhibition-name="exhibitionName"
      :image="featuredImage"
      :path="path"
      :video="featuredVideo"
      :variation="variation"
      :opening-date="openingDate"
      :closing-date="closingDate"
      thin
    />
  </LinkHandler>
  <div v-else>
    <PreviewBlock
      :attribution="attribution"
      :exhibition-name="exhibitionName"
      :image="featuredImage"
      :path="path"
      :video="featuredVideo"
      :variation="variation"
      :opening-date="openingDate"
      :closing-date="closingDate"
    />
  </div>
</template>

<script>
import exhibition from '@/lib/mixins/exhibition'
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [exhibition, helpers],
  props: {
    exhibition: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: 'h2'
    },
    variation: {
      type: String,
      default: ''
    }
  },
  computed: {
    includeLink() {
      return (
        this.variation === 'exhibitions' || this.variation === 'artistProfile'
      )
    },
    openingDate() {
      return this.exhibition?.openingDate
    },
    closingDate() {
      return this.exhibition?.closingDate
    },
    featuredImage() {
      return this.exhibition?.featuredImage
    },
    featuredVideo() {
      return this.exhibition?.featuredVideo?.url
    },
    path() {
      return `/exhibitions/${this.slug}`
    },
    slug() {
      return this.exhibition?.slug?.current
    }
  }
}
</script>

<style lang="scss"></style>
