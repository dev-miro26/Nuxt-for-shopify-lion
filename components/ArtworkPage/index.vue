<template>
  <div id="artwork-detail">
    <main>
      <ImageBlock
        v-if="featuredImage"
        :image="featuredImage"
        :size="imageSize"
      />
      <div class="half-width-container center">
        <h1 class="text-md half-width">{{ name }}</h1>
        <h1 class="text-lg half-width">{{ title }}</h1>
        <br />
      </div>
      <div class="full-width-container content-blocks center">
        <p v-if="year">{{ year }}</p>
        <p v-if="medium">{{ medium }}</p>
        <p v-if="dimensions">{{ dimensions }}</p>
        <SanityContentSuite v-if="details" :blocks="details" />
        <br />
        <SanityContentSuite
          v-if="description"
          :blocks="description"
          class="artwork-description"
        />
      </div>
      <ImageBlock
        v-for="(image, ix) in images"
        :key="ix"
        :image="image"
        :size="imageSize"
      />
    </main>
    <Hover>
      <InquireButton email="info@artlife.com" :subject="subject" />
    </Hover>
  </div>
</template>

<script>
import artwork from '@/lib/mixins/artwork'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [artwork, meta],
  props: {
    artwork: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageSize: 1
    }
  },
  computed: {
    details() {
      return this.artwork?.details
    },
    description() {
      return this.artwork?.description
    },
    featuredImage() {
      return this.artwork?.images?.[0]
    },
    images() {
      return this.artwork?.images?.slice(1)
    },
    inventoryNumber() {
      return this.artwork?.inventoryNumber
    },
    metaImageFallback() {
      return this.formatMetaImageUrl(this.featuredImage)
    },
    metaTitleFallback() {
      return this.artistOrDesignerName
        ? `${this.title} by ${this.artistOrDesignerName}`
        : this.title
    },
    name() {
      return this.artwork?.artist?.firstName && this.artwork?.artist?.lastName
        ? `${this.artwork.artist.firstName}  ${this.artwork.artist.lastName}`
        : this.artwork?.artist?.firstName
        ? `${this.artwork.artist.firstName}`
        : this.artwork?.artist?.lastName
        ? `${this.artwork.artist.lastName}`
        : ''
    },
    subject() {
      return this.artistOrDesignerName && this.title
        ? `Inquiry | I would like more info on ${this.title} by ${this.artistOrDesignerName}`
        : 'I would like more info'
    }
  }
}
</script>

<style lang="scss">
#artwork-detail {
  // work around to group year, medium, and dimensions with rich text details
  .content-blocks {
    gap: 0px;
  }
  img {
    max-height: 550px;
  }
}
</style>
