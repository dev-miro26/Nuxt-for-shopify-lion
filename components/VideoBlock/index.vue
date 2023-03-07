<template>
  <div :class="['video-block', containerSizeClass]">
    <VimeoPlayer
      :video="url"
      :class="sizeClass"
      :thumbnail="thumbnail"
      controls
    />
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 0.5
    }
  },
  computed: {
    url() {
      return this.video?.url
    },
    thumbnail() {
      return this.video?.videoThumbnail
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
.video-block {
  video {
    border: none;
    outline: none;
    width: 100%;
  }
}
</style>
