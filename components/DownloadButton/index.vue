<template>
  <a
    :href="link"
    target="_blank"
    :class="['download-button text-icon-button button', { invert: invert }]"
  >
    <span v-if="label">{{ label }}</span>
    <DownloadIcon />
  </a>
</template>

<script>
import DownloadIcon from '@/assets/svg/icon_download.svg?inline'

export default {
  components: {
    DownloadIcon
  },
  props: {
    invert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.download-button {
  svg {
    path {
      fill: $white;
    }
  }
  &.invert {
    background: $white-smoke;
    color: $black;
    svg {
      path {
        fill: $black;
      }
    }
  }
}
</style>
