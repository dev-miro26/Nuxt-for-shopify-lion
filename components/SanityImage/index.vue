<template>
  <img v-if="assetId" :src="lqip" :data-srcset="srcset" :data-src="src" data-sizes="auto" :alt="alt"
    :class="imgClasses" />
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    auto: {
      type: Boolean,
      default: true
    },
    image: {
      type: Object,
      required: true
    }
  },
  computed: {
    alt() {
      return this.image?.alt
    },
    assetId() {
      return this.image?.asset?.id
    },
    lqip() {
      // 🙈 transparent pixel for now
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    },
    params() {
      return this.auto ? '?auto=format&q=60' : ''
    },
    src() {
      return this.formatSrc(this.assetId, this.params)
    },
    srcset() {
      return this.widths.map(width => `${this.src}&w=${width} ${width}w`).join()
    },
    widths() {
      return [160, 320, 640, 768, 1024, 1366, 1600, 1960]
    },
    imgOrientation() {
      return this.determineOrientation(this.assetId)
    },
    imgClasses() {
      return `lazyload ${this.imgOrientation}`
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  background-repeat: cover;
  background-size: 100% 200px;
}
</style>