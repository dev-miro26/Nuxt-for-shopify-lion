<template>
  <div id="full-screen-video-container" @click="toggleMuted">
    <div class="hide-on-mobile-down">
      <VimeoPlayer
        v-if="desktopVersion"
        id="full-screen-video-desktop"
        :video="desktopVersion"
        class="video-container"
        autoplay
        :muted="muted"
      />
    </div>
    <div class="hide-on-mobile-up">
      <VimeoPlayer
        v-if="mobileVersion"
        id="full-screen-video-mobile"
        :video="mobileVersion"
        class="video-container hide-on-mobile-up"
        autoplay
        :muted="muted"
      />
    </div>
    <OverlayContainer top>
      <button class="icon-button">
        <img v-if="muted" src="~/assets/svg/icon_sound_off.svg" />
        <img v-else src="~/assets/svg/icon_sound_on.svg" />
      </button>
      <button class="icon-button" @click="closeVideo">
        <img src="~/assets/svg/icon_close.svg" />
      </button>
    </OverlayContainer>
  </div>
</template>

<script>
export default {
  props: {
    desktopVersion: {
      type: String,
      default: ''
    },
    mobileVersion: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      muted: true
    }
  },
  beforeMount() {
    document.body.classList.add('no-scroll')
  },
  beforeDestroy() {
    document.body.classList.remove('no-scroll')
  },
  methods: {
    closeVideo() {
      this.$store.commit('intro/setPlayed')
    },
    toggleMuted() {
      this.muted = !this.muted
    }
  }
}
</script>

<style lang="scss">
#full-screen-video-container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background-color: $black;

  .video-container {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    video {
      width: 100%;
      height: 100%;
    }
  }

  .icon-button {
    filter: invert(0.7);
  }
}
</style>
