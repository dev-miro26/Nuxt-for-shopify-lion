<template>
  <div id="main-nav-tabs">
    <nuxt-link to="/">
      <span class="visually-hidden">Home</span>
      <img src="~/assets/svg/nav_logo.svg" />
    </nuxt-link>
  </div>
</template>

<script>
import nav from '@/lib/mixins/nav'

export default {
  mixins: [nav]
}
</script>

<style lang="scss"></style>
