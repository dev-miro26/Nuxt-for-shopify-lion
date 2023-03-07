<template>
  <main>
    <div id="hero">
      <div class="hero-content location-image-crop">
        <SanityImage :image="heroImage" />
      </div>
    </div>
    <div class="sections-container">
      <div class="contact-detail-section">
        <h4>{{ name }}</h4>
        <h4>{{ street }}</h4>
        <h4>{{ city }}, {{ state }} {{ zip }}</h4>
        <h4>{{ phone }}</h4>
        <h4>{{ email }}</h4>
        <a :href="mailtoLink" target="_blank" class="visit-gallery">
          <h4 class="underline">Schedule a Gallery Visit</h4>
        </a>
        <div class="social-link-container">
          <SocialLink
            v-for="(socialLink, ix) in socialLinks"
            :key="ix"
            :social-link="socialLink"
            class="social-link"
          />
        </div>
      </div>
      <Section class="contact-inquiry-section">
        <InquiryForm />
      </Section>
    </div>
  </main>
</template>

<script>
import contactPage from '@/apollo/queries/sanity/contactPage'
import meta from '@/lib/mixins/meta'
import { mapGetters } from 'vuex'

export default {
  mixins: [meta],
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const { app } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({ query: contactPage })
    this.page = data.page
  },
  computed: {
    ...mapGetters({
      footer: 'settings/getFooter'
    }),
    address() {
      return this.location?.address
    },
    city() {
      return this.address?.city
    },
    email() {
      return this.location?.email
    },
    heroImage() {
      return this.page?.heroImage
    },
    location() {
      return this.page?.locations[0]
    },
    mailtoLink() {
      return `mailto:${this.email}?subject=Gallery Visit`
    },
    name() {
      return this.location?.shortName
    },
    phone() {
      return this.location?.phone
    },
    socialLinks() {
      return this.footer?.socialLinks
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
.contact-detail-section {
  margin: 0 auto;
  text-align: center;
}
.visit-gallery {
  display: inline-block;
  width: fit-content;
}
.social-link-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
  .social-link img {
    height: 20px;
    @include breakpoint('little') {
      height: 25px;
    }
    @include breakpoint('mobile') {
      height: 30px;
    }
    @include breakpoint('tablet') {
      height: 35px;
    }
    @include breakpoint('laptop') {
      height: 40px;
    }
  }
}
</style>
