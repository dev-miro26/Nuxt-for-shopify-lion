<template>
  <div>
    <a :href="link">
      <SanityImage :image="icon" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    socialLink: {
      type: Object,
      required: true
    }
  },
  computed: {
    link() {
      return this.socialLink.link?.url
    },
    icon() {
      return this.socialLink.icon
    }
  }
}
</script>

<style lang="scss" scoped></style>
