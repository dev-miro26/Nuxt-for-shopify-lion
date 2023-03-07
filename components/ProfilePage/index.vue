<template>
  <div class="profile-page">
    <div id="sub-nav-container">
      <SubNav>
        <SubNavLink path="#">{{ fullName }}</SubNavLink>
        <p class="sub-nav sub-nav-item">|</p>
        <SubNavLink v-if="displayedArtworks" :path="`#${artworksAnchor}`">
          {{ artworksLabel }}
        </SubNavLink>
        <SubNavLink v-if="exhibitions" path="#exhibitions">
          Exhibitions
        </SubNavLink>
        <SubNavLink v-if="biography" path="#biography">Biography</SubNavLink>
        <SubNavLink v-if="press" path="#press">Press</SubNavLink>
      </SubNav>
    </div>
    <main>
      <TwoUpHero
        :main-title="fullName"
        :image="heroImage"
        :blurb-block="blurb"
        :top="shortDescription"
      />
      <div class="sections-container">
        <Section
          v-if="displayedArtworks"
          :anchor="artworksAnchor"
          :heading="artworksLabel"
          class="section-margin"
        >
          <div class="artwork-grid">
            <GridArtwork
              v-for="(artwork, ix) in displayedArtworks"
              :key="ix"
              :node="artwork"
            />
          </div>
          <div v-if="showViewMoreButton" class="view-more-btn-container">
            <button class="view-more-button" @click="loadMoreArtworks()">
              <h4>View More</h4>
            </button>
          </div>
        </Section>
        <Section
          v-if="exhibitions"
          anchor="exhibitions"
          heading="Exhibitions"
          alignment="left-aligned"
        >
          <div class="artist-profile-exhibition-grid">
            <ExhibitionPreview
              v-for="(exhibition, ix) in exhibitions"
              :key="ix"
              :exhibition="exhibition"
              variation="artistProfile"
            />
          </div>
        </Section>
        <Section v-if="series" heading="Projects">
          <SeriesPreview
            v-for="(singleSeries, ix) in series"
            :key="ix"
            :series="singleSeries"
          />
        </Section>
        <Section v-if="biography" anchor="biography" heading="Biography">
          <div class="flow-grid">
            <ImageBlock v-if="biographyImage" :image="biographyImage" />
            <SanityContentSuite :blocks="biography" />
            <span v-if="cvUrl" class="auto">
              <DownloadButton label="CV" :link="cvUrl" />
            </span>
          </div>
        </Section>
        <Section v-if="press" anchor="press" heading="Press ">
          <div class="page-container-wide">
            <div>
              <Press
                v-for="(item, ix) in press"
                :key="ix"
                :press-item="item"
                :ix="ix"
              />
            </div>
          </div>
        </Section>
      </div>
    </main>
  </div>
</template>

<script>
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [helpers, meta],
  props: {
    artistOrDesigner: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      artworksInGrid: 6
    }
  },
  computed: {
    // only shows view more btn if there are more artworks to be shown
    showViewMoreButton() {
      return this.artistOrDesigner?.artworks?.length > this.artworksInGrid
    },
    artworksAnchor() {
      return this.artworksLabel?.toLowerCase()
    },
    artworksLabel() {
      return this.artistOrDesigner?.artworksLabel
    },
    displayedArtworks() {
      return this.artistOrDesigner?.artworks?.length
        ? this.artistOrDesigner.artworks.slice(0, this.artworksInGrid)
        : null
    },
    biography() {
      return this.artistOrDesigner?.bio
        ? this.formatBlockContent(this.artistOrDesigner.bio)
        : null
    },
    biographyImage() {
      return this.artistOrDesigner?.bioImage
    },
    blurb() {
      return this.artistOrDesigner?.blurb
        ? this.formatBlockContent(this.artistOrDesigner.blurb)
        : null
    },
    cvUrl() {
      return this.artistOrDesigner?.cv?.asset?.url
    },
    exhibitions() {
      return this.artistOrDesigner?.exhibitions?.length
        ? this.artistOrDesigner.exhibitions
        : null
    },
    series() {
      return this.artistOrDesigner?.series?.length
        ? this.artistOrDesigner.series
        : null
    },
    fullName() {
      return this.formatName(this.artistOrDesigner)
    },
    heroHeadline() {
      return this.artistOrDesigner?.heroHeadline || this.fullName
    },
    heroImage() {
      return this.artistOrDesigner?.heroImage
    },
    heroSubline() {
      return this.artistOrDesigner?.heroSubline
    },
    heroVideo() {
      return this.artistOrDesigner?.heroVideo?.url
    },
    meta() {
      return this.artistOrDesigner?.meta
    },
    metaImageFallback() {
      return this.formatMetaImageUrl(this.heroImage)
    },
    metaTitleFallback() {
      return this.formatName(this.artistOrDesigner)
    },
    press() {
      return this.artistOrDesigner?.press?.length
        ? this.artistOrDesigner.press
        : null
    },
    shortDescription() {
      return this.artistOrDesigner?.shortDescription
    }
  },
  methods: {
    loadMoreArtworks() {
      this.artworksInGrid += 6
    }
  }
}
</script>

<style lang="scss">
.profile-page {
  .artist-profile-exhibition-grid {
    display: grid;
    @include breakpoint('mobile') {
      gap: 16px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .sub-nav {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-y: hidden;

    .sub-nav-item {
      flex-shrink: 0;
      &:last-child {
        padding-right: css-pixels(40px);
      }
    }

    @include breakpoint('mobile') {
      overflow: hidden;

      .sub-nav-item {
        &:last-child {
          padding-right: 0px;
        }
      }
    }
  }
}
</style>
