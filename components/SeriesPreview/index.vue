<template>
  <PreviewBlock
    :center="center"
    :image="featuredImage"
    :main="main"
    :path="path"
    :tag="tag"
    :right="description"
    :video="featuredVideo"
  />
</template>

<script>
import helpers from '@/lib/mixins/helpers'
import series from '@/lib/mixins/series'

export default {
  mixins: [helpers, series],
  props: {
    series: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: 'h2'
    }
  },
  computed: {
    center() {
      return this.isCollaborativeSeries ? this.attribution : this.seriesName
    },
    description() {
      return this.series?.description || 'Projects'
    },
    featuredImage() {
      return this.series?.featuredImage
    },
    featuredVideo() {
      return this.series?.featuredVideo?.url
    },
    main() {
      return this.isCollaborativeSeries ? this.seriesName : this.attribution
    },
    path() {
      return `/series/${this.slug}`
    },
    slug() {
      return this.series?.slug?.current
    }
  }
}
</script>

<style lang="scss"></style>
