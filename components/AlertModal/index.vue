<template>
  <div v-if="showModal" id="alert-modal-container">
    <h2 v-if="textTitle">{{ title }}</h2>
    <p>{{ body }}</p>
    <a v-if="buttonLink" class="primary-button" :href="buttonLink">
      {{ buttonCopy }}
      <img height="20px" width="20px" src="~/assets/svg/icon_new_window.svg" />
    </a>
    <nuxt-link v-if="secondaryButtonCopy" to="/design" class="secondary-button">
      {{ secondaryButtonCopy }}
    </nuxt-link>
    <button
      v-if="closeModalCopy"
      class="close-modal-button"
      @click="closeModal"
    >
      {{ closeModalCopy }}
    </button>
    <OverlayContainer top>
      <button class="icon-button" @click="closeModal">
        <img
          height="20px"
          width="20px"
          src="~/assets/svg/icon_close_modal.svg"
        />
      </button>
    </OverlayContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['intro']),
    modal() {
      return this.intro.alertModal
    },
    showModal() {
      return !this.modal.hideAlertModal
    },
    textTitle() {
      return false
    },
    title() {
      return this.modal.title
    },
    body() {
      return this.modal.body
    },
    buttonCopy() {
      return this.modal.buttonCopy
    },
    buttonLink() {
      return this.modal.buttonLink
    },
    secondaryButtonCopy() {
      return this.modal.secondaryButtonCopy
    },
    closeModalCopy() {
      return this.modal.closeModalCopy
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('intro/setModalClosed')
    }
  }
}
</script>

<style lang="scss" scoped>
#alert-modal-container {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  color: $brown;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 30px 20px 30px;
  width: 800px;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 5;
  background: $white;
  display: flex;
  flex-direction: column;
  @include breakpoint('tablet', max) {
    width: 88vw;
    top: 55%;
  }

  .close-modal-button {
    border: none;
    background: unset;
    padding: 24px 0;
    color: inherit;
    justify-content: center;
    align-items: center;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    &:hover {
      cursor: pointer;
    }
    @include breakpoint('tablet', max) {
      width: 70vw !important;
    }
  }

  p {
    margin: 0 auto;
    padding-bottom: 28px;
    @include breakpoint('tablet') {
      margin: 0 72px;
    }
  }

  a {
    width: 400px;
    padding: 17px 20px;
    border: 1px solid $brown;
    width: 400px;
    margin: 24px auto 0 auto;
    @include breakpoint('tablet', max) {
      width: 70vw !important;
    }
  }

  .primary-button {
    text-align: center;
    background: $brown;
    color: $white;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      width: 25px;
      color: $white;
    }
  }

  .secondary-button {
    border: 1px solid $brown;
    color: $brown;
  }

  .logo {
    width: 25%;
    padding-bottom: 32px;
    padding-top: 10px;
    margin: 0 auto;
    @include breakpoint('tablet', max) {
      width: 40%;
    }
  }

  h2 {
    padding-bottom: 42px;
    padding-top: 10px;
  }
}
</style>
