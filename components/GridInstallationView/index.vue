<template>
  <div>
    <button class="img-btn" @click="openModal">
      <SanityImage :image="view.photo" />
    </button>

    <div v-if="showModal">
      <InstallationViewModal
        :view="view"
        :inquire-data="inquireData"
        @close-modal="closeModal"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    view: {
      type: Object,
      required: true,
      default: () => {}
    },
    inquireData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    openModal() {
      this.showModal = true
      document.body.classList.add('no-scroll')
    },
    closeModal() {
      this.showModal = false
      document.body.classList.remove('no-scroll')
    }
  }
}
</script>

<style lang="scss">
.img-btn {
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0px;
  width: 100%;
  &:focus-visible {
    outline: 1px dotted $dark-gray;
  }
}
</style>
