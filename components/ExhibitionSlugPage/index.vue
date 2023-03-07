<template>
  <div>
    <div v-if="!$fetchState.pending && exhibition">
      <div id="sub-nav-container">
        <SubNav>
          <SubNavLink v-if="views" path="#installation-views">
            Installation Views
          </SubNavLink>
          <SubNavLink v-if="artworks" path="#artwork">Works</SubNavLink>
          <SubNavLink v-if="about" path="#text">Text</SubNavLink>
          <SubNavLink v-if="press" path="#press">Press</SubNavLink>
          <SubNavLink v-if="artistOrDesignerPath" :path="artistOrDesignerPath">
            {{ artistOrDesignerName }}
          </SubNavLink>
          <SubNavDropdown v-if="isGroupShow" :items="artistPages" icon>
            Artist Pages
          </SubNavDropdown>
        </SubNav>
      </div>
      <main>
        <Hero
          :allow-appointments="allowAppointments"
          :appointment-type="acuityId"
          :image="heroImage"
          :pdf="pdf"
          :video="heroVideo"
        />
        <DetailsBlock
          :attribution="attribution"
          :closing-date="closingDate"
          :exhibition-name="exhibitionName"
          :opening-date="openingDate"
          variation="exhibitions"
        />
        <div class="sections-container">
          <Section
            v-if="views"
            anchor="installation-views"
            heading="Installation Views"
            class="section-margin"
          >
            <div class="mosaic-grid">
              <GridInstallationView
                v-for="(view, ix) in views"
                :key="ix"
                :view="view"
                :inquire-data="inquireData"
              />
            </div>
          </Section>
          <Section
            v-if="artworks"
            anchor="artwork"
            heading="Artwork For Sale"
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
          <Section v-if="about" anchor="text" heading="About">
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
import exhibitionBySlug from '@/apollo/queries/sanity/exhibitionBySlug'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'
import exhibition from '@/lib/mixins/exhibition'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [exhibition, helpers, meta],
  data() {
    return {
      exhibition: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: exhibitionBySlug,
      variables: { slug: params.exhibition || '' }
    })

    if (data.exhibition) {
      this.exhibition = selectPublishedOrDraft(data.exhibition)
    } else {
      error({ statusCode: 404 })
    }
  },
  computed: {
    about() {
      return this.exhibition?.about
        ? this.formatBlockContent(this.exhibition.about)
        : null
    },
    acuityId() {
      return this.exhibition?.location?.acuityId
    },
    allowAppointments() {
      return this.exhibition?.allowAppointments
    },
    artistOrDesignerPath() {
      return !this.isGroupShow
        ? this.getArtistOrDesignerPath(this.artistsOrDesigners?.[0])
        : null
    },
    artistPages() {
      return this.getArtistPagesDropdown(this.artistsOrDesigners)
    },
    artworks() {
      return this.exhibition?.artworks?.length ? this.exhibition.artworks : null
    },
    attributionAndExhibitionNames() {
      return !this.isGroupShow
        ? [this.attribution, this.exhibitionName]
        : [this.exhibitionName]
    },
    blurb() {
      return this.exhibition?.blurb
        ? this.formatBlockContent(this.exhibition.blurb)
        : null
    },
    heroImage() {
      return this.exhibition?.heroImage
    },
    heroVideo() {
      return this.exhibition?.heroVideo?.url
    },
    inquireData() {
      return {
        email: this.email,
        subject: this.subjectData
      }
    },
    // metaDescriptionFallback() {
    //   // TODO: set this up to pull from blurb
    //   return this.shortDescription
    // },
    metaImageFallback() {
      return this.formatMetaImageUrl(this.heroImage)
    },
    metaTitleFallback() {
      return this.exhibitionName
    },
    pdf() {
      return this.exhibition?.pdf
    },
    press() {
      return this.exhibition?.press?.length ? this.exhibition.press : null
    },
    subjectData() {
      return {
        name: this.exhibitionName,
        year: this.openingDate.slice(0, 4)
      }
    },
    views() {
      return this.exhibition?.views?.length ? this.exhibition.views : null
    }
  }
}
</script>

<style lang="scss"></style>
