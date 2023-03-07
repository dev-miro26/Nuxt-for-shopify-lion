<template>
  <nuxt-link :to="path" class="grid-location-card collection-grid-item">
    <div class="location-image-crop">
      <SanityImage :image="image" />
    </div>
    <div class="location-card-details">
      <p>{{ name }}</p>
      <div>
        <p>{{ street }}</p>
        <p>{{ city }}, {{ state }} {{ zipcode }}</p>
      </div>
      <div>
        <p>{{ hours }}</p>
        <nuxt-link v-if="visitLinkText" to="/visit">
          <p>{{ visitLinkText }}</p>
        </nuxt-link>
        <p>{{ email }}</p>
        <p>{{ phone }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  computed: {
    address() {
      return this.location.address
    },
    city() {
      return this.address.city
    },
    email() {
      return this.location?.email
    },
    hours() {
      return this.location.hours
    },
    image() {
      return this.location.heroImage
    },
    name() {
      return this.location.shortName
    },
    path() {
      return `/about/locations/${this.slug}`
    },
    phone() {
      return this.location.phone
    },
    state() {
      return this.address.state
    },
    street() {
      return this.address.street
    },
    slug() {
      return this.location.slug.current
    },
    zipcode() {
      return this.address.zipcode
    },
    visitLinkText() {
      return this.location.visitLinkText
    }
  }
}
</script>

<style lang="scss">
.grid-location-card {
  .location-card-details {
    padding-top: 16px;
    display: grid;
    gap: css-pixels(20px);
    text-align: left;
    @include breakpoint('tablet') {
      gap: 6px;
    }
  }
}
</style>
