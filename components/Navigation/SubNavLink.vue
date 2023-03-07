<template>
  <nuxt-link :to="path" class="sub-nav-item sub-nav-link">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss"></style>
