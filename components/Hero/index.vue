<template>
  <div id="hero">
    <div class="hero-content hero-image-crop">
      <VimeoPlayer v-if="video" :video="video" is-bg-video />
      <SanityImage v-else-if="image" :image="image" />
      <div v-if="hasCopy" :class="copyContainerClasses">
        <div class="fixed-copy">
          <h1 v-if="hasHeadlineCopy" class="headline">
            <span v-if="accentCopy" class="primary">{{ accentCopy }}</span>
            <span v-if="headlineCopy">{{ headlineCopy }}</span>
            <span v-for="(line, ix) in multilineCopy" :key="ix">
              {{ line }}
            </span>
          </h1>
          <h2 v-if="sublineCopy" class="subline">{{ sublineCopy }}</h2>
        </div>
      </div>
      <SanityContentLite
        v-if="caption"
        :blocks="caption"
        :classes="captionContainerClasses"
      />
    </div>
    <OverlayContainer v-if="showHeroButtons" wrap>
      <nuxt-link
        v-if="showAppointmentButton"
        :to="appointmentPath"
        class="button"
      >
        Schedule an appointment
      </nuxt-link>
      <DownloadButton v-if="pdfUrl" label="PDF" :link="pdfUrl" />
    </OverlayContainer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    accentCopy: {
      type: String,
      default: ''
    },
    allowAppointments: {
      type: Boolean,
      default: false
    },
    appointmentType: {
      type: String,
      default: ''
    },
    copyColor: {
      type: String,
      default: 'white'
    },
    headlineCopy: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: null
    },
    multilineCopy: {
      type: Array,
      default: null
    },
    pdf: {
      type: Object,
      default: null
    },
    sublineCopy: {
      type: String,
      default: ''
    },
    video: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      acuityEnabled: 'settings/getAcuityEnabled'
    }),
    appointmentPath() {
      const params = this.appointmentType
        ? `?location=${this.appointmentType}`
        : ''
      return '/visit' + params
    },
    caption() {
      return this.image?.caption
        ? this.formatBlockContent(this.image.caption)
        : null
    },
    captionColor() {
      return this.captionColorHex
        ? this.getTextColorFromHex(this.captionColorHex)
        : ''
    },
    captionColorHex() {
      return this.image?.captionColor
    },
    captionContainerClasses() {
      return `hero-caption-container text-xs ${this.captionColor}`
    },
    copyContainerClasses() {
      return `hero-copy-container ${this.copyColor}`
    },
    hasCopy() {
      return this.hasHeadlineCopy || this.sublineCopy
    },
    hasHeadlineCopy() {
      return this.accentCopy || this.headlineCopy || this.multilineCopy
    },
    pdfUrl() {
      return this.pdf?.asset?.url
    },
    showAppointmentButton() {
      return this.acuityEnabled && this.allowAppointments
    },
    showHeroButtons() {
      return this.showAppointmentButton || this.pdfUrl
    }
  }
}
</script>

<style lang="scss">
#hero {
  position: relative;

  .hero-content {
    position: relative;
    background: $dark-gray;
    z-index: -1;

    .hero-copy-container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0px css-pixels(40px);

      .fixed-copy {
        position: fixed;
        display: grid;
        gap: css-pixels(20px);
        width: 100%;
        padding: 0px css-pixels(40px);
        word-break: break-word;
        z-index: 2;
        @include breakpoint('tablet') {
          gap: 40px;
        }
        @include breakpoint('middle', max) {
          font-size: 10vw;
        }

        .headline {
          display: grid;
          text-transform: uppercase;
        }
      }
    }

    .hero-caption-container {
      position: absolute;
      bottom: css-pixels(40px);
      left: css-pixels(40px);
      right: css-pixels(40px);
      z-index: 1;
      @include breakpoint('tablet') {
        bottom: 20px;
        left: 20px;
        width: 55vw;
      }
    }

    // 🎨 text color options
    .black {
      color: $black;
    }
    .primary {
      color: $flamingo;
    }
    .white {
      color: $white;
    }
  }
}
</style>
