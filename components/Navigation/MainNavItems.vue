<template>
  <div id="main-nav-items">
    <nuxt-link to="/artists" :class="['text-md', isActive(isArtistRoute)]">
      Artists
    </nuxt-link>
    <nuxt-link
      v-if="exhibitionsNav[0]"
      :to="exhibitionsNav[0].link"
      :class="['text-md', isActive(isExhibitionRoute)]"
    >
      Exhibitions
    </nuxt-link>
    <nuxt-link
      v-if="shopNav[0]"
      :to="shopNav[0].link"
      :class="['text-md', isActive(isShopRoute)]"
    >
      Shop
    </nuxt-link>
    <nuxt-link to="/sell" :class="['text-md', isActive(isSellRoute)]">
      Sell
    </nuxt-link>
    <nuxt-link to="/about" :class="['text-md', isActive(isAboutRoute)]">
      About
    </nuxt-link>
    <nuxt-link to="/news" :class="['text-md', isActive(isNewsRoute)]">
      News
    </nuxt-link>
    <nuxt-link to="/contact" :class="['text-md', isActive(isContactRoute)]">
      Contact
    </nuxt-link>
    <nuxt-link to="/search" class="search-icon">
      <SearchIcon />
    </nuxt-link>
  </div>
</template>

<script>
import SearchIcon from '@/assets/svg/zoom_1.svg?inline'
import nav from '@/lib/mixins/nav'

export default {
  components: {
    SearchIcon
  },
  mixins: [nav]
}
</script>

<style lang="scss"></style>
