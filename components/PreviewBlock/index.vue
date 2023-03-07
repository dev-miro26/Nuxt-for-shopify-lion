<template>
  <div class="preview-container">
    <div :class="containerClasses">
      <div :class="imageCropClass">
        <VimeoPlayer v-if="video" :video="video" is-bg-video />
        <SanityImage v-else :image="image" />
      </div>
    </div>
    <DetailsBlock
      :attribution="attribution"
      :exhibition-name="exhibitionName"
      :path="path"
      :variation="variation"
      :opening-date="openingDate"
      :closing-date="closingDate"
    />
  </div>
</template>

<script>
export default {
  props: {
    attribution: {
      type: String,
      default: ''
    },
    openingDate: {
      type: String,
      default: ''
    },
    closingDate: {
      type: String,
      default: ''
    },
    exhibitionName: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: null
    },
    link: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    thin: {
      type: Boolean,
      default: false
    },
    variation: {
      type: String,
      default: ''
    },
    video: {
      type: String,
      default: null
    }
  },
  computed: {
    containerClasses() {
      return ['preview-image-container', { thin: this.thin }]
    },
    imageCropClass() {
      return this.variation === 'homePage'
        ? 'hero-image-crop'
        : 'exhibition-image-crop'
    }
  }
}
</script>

<style lang="scss">
.preview-container {
  .preview-image-container {
    width: 100%;
    margin: 0 auto;
    &.thin {
      padding: 16px;
    }
  }
  .details-block {
    @include breakpoint('tablet', max) {
      padding-bottom: css-pixels(120px);
    }
  }
}
</style>
