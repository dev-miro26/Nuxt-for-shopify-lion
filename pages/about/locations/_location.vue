<template>
  <div>
    <div v-if="!$fetchState.pending && location">
      <div id="sub-nav-container">
        <SubNav>
          <SubNavLink
            v-for="(item, ix) in locationsNav"
            :key="ix"
            :path="item.link"
          >
            {{ item.label }}
          </SubNavLink>
        </SubNav>
      </div>
      <main>
        <Hero :image="heroImage" :video="heroVideo" />
        <QuoteBlock v-if="blurb" :main="blurb" />
        <div class="sections-container">
          <Section>
            <div class="location-detail-block">
              <h4>{{ shortName }}</h4>
              <h4>{{ street }}</h4>
              <h4>{{ city }} {{ state }}, {{ zip }}</h4>
              <h4>{{ hours }}</h4>
            </div>
            <SanityContentSuite v-if="about" :blocks="about" />
          </Section>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import locationBySlug from '@/apollo/queries/sanity/locationBySlug'
import locationsNav from '@/apollo/queries/sanity/locationsNav'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [helpers, meta],
  data() {
    return {
      location: null
    }
  },
  async fetch() {
    const { app, error, params, store } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: locationBySlug,
      variables: { slug: params.location }
    })

    if (data.location) {
      this.location = selectPublishedOrDraft(data.location)
    } else {
      error({ statusCode: 404 })
    }

    const navResponse = await client.query({ query: locationsNav })
    store.commit('subnav/setLocationsNav', navResponse.data.page.locations)
  },
  computed: {
    ...mapGetters({
      locationsNav: 'subnav/getLocationsNav'
    }),
    about() {
      return this.location?.about
        ? this.formatBlockContent(this.location.about)
        : null
    },
    address() {
      return this.location?.address
    },
    blurb() {
      return this.location?.blurb
        ? this.formatBlockContent(this.location.blurb)
        : null
    },
    city() {
      return this.address?.city
    },
    heroImage() {
      return this.location?.heroImage
    },
    heroVideo() {
      return this.location?.heroVideo?.url
    },
    hours() {
      return this.location?.hours
    },
    metaImageFallback() {
      return this.formatMetaImageUrl(this.heroImage)
    },
    metaTitleFallback() {
      return this.shortName
    },
    shortName() {
      return this.location?.shortName
    },
    state() {
      return this.address?.state
    },
    street() {
      return this.address?.street
    },
    zip() {
      return this.address?.zipcode
    }
  }
}
</script>

<style lang="scss">
.location-detail-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}
</style>
