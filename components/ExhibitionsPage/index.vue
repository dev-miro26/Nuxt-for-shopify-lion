<template>
  <div id="exhibitions-page">
    <div id="sub-nav-container">
      <SubNav>
        <SubNavLink
          v-for="(item, ix) in exhibitionsNav"
          :key="ix"
          :path="item.link"
        >
          {{ item.label }}
        </SubNavLink>
      </SubNav>
      <!--Remove for launch-->
      <!-- <SubNav v-if="includeYears" invert>
        <SubNavDropdown :items="years" grid icon>
          Year {{ selectedYear }}
        </SubNavDropdown>
      </SubNav> -->
    </div>
    <main>
      <Hero
        v-if="!hasExhibitions"
        :image="fallbackImage"
        :headline-copy="fallbackText"
        :video="fallbackVideo"
      />
      <ExhibitionPreview
        v-for="exhibition in filteredExhibitions"
        v-else
        :key="exhibition.id"
        :exhibition="exhibition"
        variation="exhibitions"
      />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [helpers, meta],
  props: {
    includeYears: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      exhibitionsNav: 'subnav/getExhibitionsNav'
    }),
    exhibitions() {
      return this.includeYears
        ? this.sortByOpeningDate(this.page?.exhibitions)
        : this.page?.exhibitions
    },
    exhibitionsYears() {
      return this.getExhibitionsYears(this.exhibitions)
    },
    fallbackImage() {
      return this.page?.heroImage
    },
    fallbackText() {
      return this.page?.heroText
    },
    fallbackTextColor() {
      return this.getTextColorFromHex(this.fallbackTextColorHex)
    },
    fallbackVideo() {
      return this.page?.heroVideo?.url
    },
    filteredExhibitions() {
      return this.includeYears &&
        this.exhibitionsYears.includes(this.$route.query.filter)
        ? this.filterExhibitions(this.exhibitions)
        : this.exhibitions
    },
    hasExhibitions() {
      return this.exhibitions?.length
    },
    selectedYear() {
      return this.exhibitionsYears.includes(this.$route.query.filter)
        ? this.$route.query.filter
        : null
    },
    years() {
      return this.exhibitionsYears.map(year => ({
        label: year,
        link: `?filter=${year}`
      }))
    }
  },
  methods: {
    filterExhibitions(exhibitions) {
      return exhibitions.filter(
        exhibition =>
          this.getYear(exhibition.openingDate) === this.$route.query.filter ||
          this.getYear(exhibition.closingDate) === this.$route.query.filter
      )
    },
    getExhibitionsYears(exhibitions) {
      const allYears = exhibitions.flatMap(exhibition => [
        exhibition.openingDate ? exhibition.openingDate.slice(0, 4) : null,
        exhibition.closingDate ? exhibition.closingDate.slice(0, 4) : null
      ])
      const uniqueYears = Array.from(new Set(allYears))
      return uniqueYears.filter(year => year).sort((a, b) => b - a)
    }
  }
}
</script>

<style lang="scss">
#exhibitions-page {
  #sub-nav-container {
    text-transform: capitalize;
  }
  #sub-nav-light {
    // retains active style for Past sub nav item when filtering by year
    .nuxt-link-active {
      opacity: 0.5;
    }
  }
}
</style>
