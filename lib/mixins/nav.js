import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      exhibitionsNav: 'subnav/getExhibitionsNav',
      shopNav: 'subnav/getShopNav'
    }),
    isAboutRoute() {
      return this.$route.name && this.$route.name.startsWith('about')
    },
    isArtistRoute() {
      return this.$route.name && this.$route.name.startsWith('artists')
    },
    isContactRoute() {
      return this.$route.name && this.$route.name.startsWith('contact')
    },
    isDesignRoute() {
      return true
    },
    isDesignerRoute() {
      return this.$route.name && this.$route.name.startsWith('designers')
    },
    isExhibitionRoute() {
      return this.$route.name && this.$route.name.includes('exhibitions')
    },
    isNewsRoute() {
      return this.$route.name && this.$route.name.startsWith('news')
    },
    isSellRoute() {
      return this.$route.name && this.$route.name.startsWith('sell')
    },
    isShopRoute() {
      return this.$route.name && this.$route.name.startsWith('shop')
    },
    isVisitRoute() {
      return this.$route.name && this.$route.name.startsWith('visit')
    }
  },
  methods: {
    isActive(boolean) {
      return { active: boolean }
    }
  }
}
