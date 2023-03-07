<template>
  <div :class="containerClasses">
    <SanityImage :image="image" :class="sizeClass" />
    <SanityContentLite
      v-if="caption"
      :blocks="caption"
      :classes="captionClasses"
    />
  </div>
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    image: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 0.5
    }
  },
  computed: {
    caption() {
      return this.image.caption
        ? this.formatBlockContent(this.image.caption)
        : null
    },
    captionClasses() {
      return `caption text-xs ${this.sizeClass}`
    },
    containerClasses() {
      return `image-block ${this.containerSizeClass}`
    },
    containerSizeClass() {
      return `${this.sizeClass}-container`
    },
    sizeClass() {
      return this.size < 1 ? 'half-width' : 'full-width'
    }
  }
}
</script>

<style lang="scss">
.image-block {
  .caption {
    margin-top: css-pixels(40px);
    @include breakpoint('tablet') {
      margin-top: 20px;
    }
  }
}
</style>
