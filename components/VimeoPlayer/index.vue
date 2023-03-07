<template>
  <div>
    <video
      :id="id"
      :class="{ 'bg-video': isBgVideo }"
      :autoplay="autoplay || isBgVideo"
      :controls="controls"
      :loop="loop || isBgVideo"
      :muted="muted || isBgVideo"
      :poster="poster"
      playsinline
    >
      <source :src="video" />
    </video>
  </div>
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    },
    isBgVideo: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    },
    video: {
      type: String,
      required: true
    },
    thumbnail: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    assetId() {
      return this.thumbnail?.asset ? this.thumbnail.asset._ref : ''
    },
    poster() {
      return this.formatSrc(this.assetId)
    }
  }
}
</script>

<style lang="scss">
.bg-video {
  position: absolute;
  width: 100vw;
}
</style>
