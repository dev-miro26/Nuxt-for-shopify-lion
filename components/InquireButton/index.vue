<template>
  <a :href="mailtoLink" target="_blank">
    <button class="inquire-button">Inquire</button>
  </a>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: 'info@artlife.com'
    },
    subject: {
      type: String,
      default: 'I would like more info'
    }
  },
  computed: {
    mailtoLink() {
      return `mailto:${this.email}?subject=${this.subject}`
    }
  }
}
</script>

<style lang="scss"></style>
