<template>
  <div>
    <div v-if="!$fetchState.pending && series">
      <div id="sub-nav-container">
        <SubNav>
          <SubNavLink v-if="artworks" path="#artwork">Artwork</SubNavLink>
          <SubNavLink v-if="about" path="#text">Text</SubNavLink>
          <SubNavLink v-if="press" path="#press">Press</SubNavLink>
          <SubNavLink v-if="artistOrDesignerPath" :path="artistOrDesignerPath">
            {{ artistOrDesignerName }}
          </SubNavLink>
          <SubNavDropdown
            v-if="isCollaborativeSeries"
            :items="artistPages"
            icon
          >
            Artist Pages
          </SubNavDropdown>
        </SubNav>
      </div>
      <main>
        <Hero
          :image="heroImage"
          :multiline-copy="heroText"
          :pdf="pdf"
          :video="heroVideo"
        />
        <DetailsBlock :center="seriesName" :main="blurb" upcase-center />
        <div class="sections-container">
          <Section
            v-if="artworks"
            anchor="artwork"
            heading="Artwork"
            class="section-margin"
          >
            <div class="artwork-grid">
              <GridArtwork
                v-for="(artwork, ix) in artworks"
                :key="ix"
                :node="artwork"
              />
            </div>
          </Section>
          <Section v-if="about" anchor="text">
            <SanityContentSuite :blocks="about" />
          </Section>
          <Section v-if="press" anchor="press" heading="Press">
            <Press
              v-for="(item, ix) in press"
              :key="ix"
              :press-item="item"
              :ix="ix"
            />
          </Section>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import seriesBySlug from '@/apollo/queries/sanity/seriesBySlug'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'
import series from '@/lib/mixins/series'

export default {
  mixins: [helpers, meta, series],
  data() {
    return {
      series: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: seriesBySlug,
      variables: { slug: params.series || '' }
    })

    if (data.series) {
      this.series = selectPublishedOrDraft(data.series)
    } else {
      error({ statusCode: 404 })
    }
  },
  computed: {
    about() {
      return this.series?.about
        ? this.formatBlockContent(this.series.about)
        : null
    },
    artistOrDesignerPath() {
      return !this.isCollaborativeSeries
        ? this.getArtistOrDesignerPath(this.artistsOrDesigners[0])
        : null
    },
    artistPages() {
      return this.getArtistPagesDropdown(this.artistsOrDesigners)
    },
    artworks() {
      return this.series?.artworks?.length ? this.series.artworks : null
    },
    attributionAndSeriesNames() {
      return !this.isCollaborativeSeries
        ? [this.attribution, this.seriesName]
        : [this.seriesName]
    },
    blurb() {
      return this.series?.blurb
        ? this.formatBlockContent(this.series.blurb)
        : null
    },
    heroImage() {
      return this.series?.heroImage
    },
    heroText() {
      return this.heroTextOverride || this.attributionAndSeriesNames
    },
    heroTextOverride() {
      return this.series?.heroText ? [this.series.heroText] : null
    },
    heroVideo() {
      return this.series?.heroVideo?.url
    },
    // metaDescriptionFallback() {
    //   // TODO: set this up to pull from blurb
    //   return this.shortDescription
    // },
    metaImageFallback() {
      return this.formatMetaImageUrl(this.heroImage)
    },
    metaTitleFallback() {
      return this.seriesName
    },
    pdf() {
      return this.series?.pdf
    },
    press() {
      return this.series?.press?.length ? this.series.press : null
    }
  }
}
</script>

<style lang="scss"></style>
