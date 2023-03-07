<template>
  <div class="view-modal">
    <div class="view-image-container">
      <SanityImage :image="photo" />
      <div v-if="hasOverlay" :class="['overlay', { hidden: !showDetails }]">
        <SanityImage :image="mobileOverlay" class="hide-on-tablet-up" />
        <SanityImage :image="desktopOverlay" class="hide-on-tablet-down" />
      </div>
      <OverlayContainer top>
        <button class="icon-button" @click="$emit('close-modal')">
          <img src="~/assets/svg/icon_close.svg" />
        </button>
      </OverlayContainer>
      <OverlayContainer>
        <InquireButton
          :subject="subject"
          :email="email"
          class="hide-on-tablet-down"
        />
        <button v-if="hasArtworks" class="icon-button" @click="toggleDetails">
          <img v-if="showDetails" src="~/assets/svg/icon_minus.svg" />
          <img v-else src="~/assets/svg/icon_plus.svg" />
        </button>
      </OverlayContainer>
    </div>
    <div class="view-details-container">
      <OverlayContainer top wrap class="hide-on-tablet-up">
        <InquireButton :subject="subject" :email="email" />
      </OverlayContainer>
      <transition name="fade">
        <div v-if="showDetails" class="view-artwork-details">
          <ArtworkDetail
            v-for="(artwork, ix) in artworks"
            :key="ix"
            :artwork="artwork"
            :index="ix"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import helpers from '@/lib/mixins/helpers'
export default {
  mixins: [helpers],
  props: {
    view: {
      type: Object,
      required: true
    },
    inquireData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showDetails: false
    }
  },
  computed: {
    artworks() {
      return this.view.artworks
    },
    desktopOverlay() {
      return this.view.overlayDesktop
    },
    hasArtworks() {
      return this.artworks?.length
    },
    email() {
      return this.inquireData?.email
    },
    hasOverlay() {
      return this.desktopOverlay && this.mobileOverlay
    },
    mobileOverlay() {
      return this.view.overlayMobile
    },
    photo() {
      return this.view.photo
    },
    subject() {
      return this.inquireData?.subject?.name && this.inquireData?.subject?.year
        ? `${this.inquireData.subject.name} ${this.inquireData.subject.year}`
        : this.inquireData?.subject?.name
        ? `${this.inquireData.subject.name}`
        : 'I would like more info'
    }
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails
    }
  }
}
</script>

<style lang="scss">
.view-modal {
  position: fixed;
  top: $main-nav-height-mobile;
  left: 0;
  right: 0;
  height: calc(100vh - #{$main-nav-height-mobile});
  background: $white;
  overflow: scroll;
  z-index: 99;
  @include breakpoint('tablet') {
    top: $main-nav-height;
    height: calc(100vh - #{$main-nav-height});
  }

  .view-image-container {
    position: relative;
    display: flex;
    justify-content: center;
    height: calc(100vh - #{$main-nav-height-mobile});
    @include breakpoint('tablet') {
      height: calc(100vh - #{$main-nav-height});
    }
    .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: opacity 250ms;
      &.hidden {
        opacity: 0;
      }
    }
    img {
      width: 75%;
      object-fit: cover;
    }
  }

  .view-details-container {
    position: relative;
    .view-artwork-details {
      display: grid;
      gap: css-pixels(40px);
      max-width: 1280px;
      margin: auto;
      padding: 0px css-pixels(125px) css-pixels(80px);
      @include breakpoint('tablet') {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 80px;
        row-gap: 40px;
        padding: 40px;
      }
    }
  }
}
</style>
