<template>
  <nuxt-link v-if="to" :to="to">
    <slot />
  </nuxt-link>
  <a v-else-if="href" :href="href" target="_blank" rel="noopener">
    <slot />
  </a>
  <span v-else>
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss"></style>
