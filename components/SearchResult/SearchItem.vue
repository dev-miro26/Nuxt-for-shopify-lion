<template>
  <nuxt-link v-if="hasSlug" :to="link" class="search-item">
    <SanityImage
      v-if="image"
      :image="image"
      :class="{ 'article-crop': isArticle }"
    />
    <ShopifyImage v-if="imageURL" :algolia-image-url="imageURL" />
    <div class="result-text">
      <p v-if="isArtwork" class="artwork-search-grid">
        {{ item.artist.firstName }} {{ item.artist.lastName }},
        <span class="artwork-search-grid-title">{{ text }},</span>
        {{ item.year }}
      </p>
      <p v-else>{{ text }}</p>
    </div>

    <!-- isArtist -->
    <p v-if="isArtist" class="result-text click-above">
      Click above to learn more about {{ text }}
    </p>

    <!-- isExhibition -->
    <p v-if="dateRange" class="result-text date-range">{{ dateRange }}</p>
    <p v-if="isExhibition" class="result-text location">
      {{ location }}
    </p>
  </nuxt-link>
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    item: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  computed: {
    link() {
      return this.item.type === 'artist' && this.item.slug
        ? `/${this.item.category}s/${this.item.slug.current}`
        : this.item.type === 'artwork' &&
          this.item.artist.category !== 'projectArtist' &&
          this.item.slug
        ? `/${this.item.artist.category}s/${this.item.artist.slug.current}/artworks/${this.item.slug.current}`
        : this.item.type === 'artwork' &&
          this.item.artist.category === 'projectArtist' &&
          this.item.slug
        ? `/${this.item.artist.slug.current}/artworks/${this.item.slug.current}`
        : this.item.type === 'exhibition' && this.item.slug
        ? `/design/exhibitions/${this.item.slug.current}`
        : this.item.type === 'newsArticle' && this.item.slug
        ? `/news/${this.item.slug.current}`
        : //is product
        this.item.handle
        ? `/shop/products/${this.item.handle}`
        : '/'
    },
    image() {
      return this.item.featuredImage
        ? this.item.featuredImage
        : this.item.images && this.item.images.length
        ? this.item.images[0]
        : this.item.heroImage
        ? this.item.heroImage
        : this.item.heroVideo
        ? this.item.heroVideo.videoThumbnail
        : null
    },
    //is product
    imageURL() {
      return this.item.product_image ? this.item.product_image : null
    },
    text() {
      return this.item.type === 'artist' &&
        this.item.firstName &&
        this.item.lastName
        ? `${this.item.firstName} ${this.item.lastName}`
        : this.item.type === 'artist' && this.item.firstName
        ? `${this.item.firstName}`
        : this.item.type === 'artist' && this.item.lastName
        ? `${this.item.lastName}`
        : this.item.type === 'artwork'
        ? `${this.item.title}`
        : this.item.type === 'exhibition'
        ? `${this.item.name}`
        : this.item.type === 'newsArticle'
        ? this.item.title
        : //is product
        this.item.vendor
        ? `${this.item.title}`
        : ''
    },
    dateRange() {
      return this.formatDateRange(this.item.openingDate, this.item.closingDate)
    },
    location() {
      return this.item.location.name ? this.item.location.name : ''
    },
    isExhibition() {
      return this.item.type === 'exhibition'
    },
    isArticle() {
      return this.item.type === 'newsArticle'
    },
    isArtist() {
      return this.item.type === 'artist'
    },
    isArtwork() {
      return this.item.type === 'artwork'
    },
    hasSlug() {
      return this.item?.slug?.current || this.item?.handle
    }
  }
}
</script>

<style scoped lang="scss">
.article-crop {
  object-fit: cover;
  @include breakpoint('tablet') {
    height: 80%;
  }
}

.search-item {
  display: block;
  @include breakpoint('tablet') {
    padding-bottom: 80px;
  }
}

.result-text {
  padding-top: 5px;
  font-size: $text-md-middle;
  @include breakpoint('tablet') {
    font-size: $text-md-desktop;
  }

  &.click-above,
  &.date-range,
  &.location {
    font-size: $text-sm-middle;
    @include breakpoint('tablet') {
      font-size: $text-sm-desktop;
    }
  }

  &.click-above,
  &.date-range {
    padding-top: 30px;
  }

  .artwork-search-grid {
    font-size: $text-sm-desktop;

    &-title {
      font-style: italic;
    }
  }
}

.artwork-grid {
  .search-item {
    padding-bottom: 10px;
  }
}
</style>
