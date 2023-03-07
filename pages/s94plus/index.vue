<template>
  <div v-if="!$fetchState.pending">
    <div id="sub-nav-container">
      <SubNav>
        <SubNavLink v-for="(item, ix) in plusNav" :key="ix" :path="item.link">
          {{ item.label }}
        </SubNavLink>
      </SubNav>
    </div>
    <main>
      <Hero :image="heroImage" :video="heroVideo" />
      <QuoteBlock v-if="blurb" :main="blurb" />
      <div class="sections-container">
        <Section anchor="mission">
          <SanityContentSuite v-if="mission" :blocks="mission" />
        </Section>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import plusPage from '@/apollo/queries/sanity/plusPage'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [helpers, meta],
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const { app } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({ query: plusPage })
    this.page = data.page
  },
  computed: {
    ...mapGetters({
      plusNav: 'subnav/getPlusNav'
    }),
    blurb() {
      return this.page?.blurb ? this.formatBlockContent(this.page.blurb) : null
    },
    heroImage() {
      return this.page?.heroImage
    },
    heroVideo() {
      return this.page?.heroVideo?.url
    },
    mission() {
      return this.page?.mission
        ? this.formatBlockContent(this.page.mission)
        : null
    }
  }
}
</script>

<style lang="scss"></style>
