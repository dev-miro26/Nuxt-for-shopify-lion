<template>
  <div v-if="!$fetchState.pending">
    <main>
      <Hero :image="heroImage" :video="heroVideo" />
      <QuoteBlock v-if="blurb" :main="blurb" />
      <div class="sections-container">
        <Section
          v-if="locations"
          heading="Locations"
          class="section-margin-wide"
        >
          <div v-if="locations.length > 1" class="locations-grid">
            <GridLocationCard
              v-for="(location, ix) in locations"
              :key="ix"
              :location="location"
            />
          </div>
          <div v-else class="location">
            <GridLocationCard
              v-for="(location, ix) in locations"
              :key="ix"
              :location="location"
            />
          </div>
        </Section>
        <Section
          v-if="hasStaffMembers"
          heading="Staff"
          class="section-margin-wide"
        >
          <ImageBlock
            v-if="staffImage"
            :image="staffImage"
            class="staff-image"
          />
          <div class="collection-grid staff-grid">
            <StaffMember
              v-for="(staffMember, ix) in staffMembers"
              :key="ix"
              :staff-member="staffMember"
            />
          </div>
        </Section>
        <Section v-if="press" heading="Press">
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
</template>

<script>
import aboutPage from '@/apollo/queries/sanity/aboutPage'
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
    const { data } = await client.query({ query: aboutPage })
    this.page = data.page
  },
  computed: {
    blurb() {
      return this.page?.blurb ? this.formatBlockContent(this.page.blurb) : null
    },
    hasStaffMembers() {
      return this.staffMembers?.length > 0
    },
    heroImage() {
      return this.page?.heroImage
    },
    heroVideo() {
      return this.page?.heroVideo?.url
    },
    locations() {
      return this.page?.locations
    },
    press() {
      return this.page?.press?.length ? this.page.press : null
    },
    staffImage() {
      return this.page?.staffImage
    },
    staffMembers() {
      return this.page?.staffMembers
    }
  }
}
</script>

<style lang="scss">
.staff-image {
  padding: unset;
  margin-bottom: css-pixels(40px);
  @include breakpoint('tablet') {
    margin-bottom: 40px;
  }
}

.locations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin: auto;
  @include breakpoint('tablet') {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }
}

.location {
  margin: 0 auto;
  max-width: 33%;
  align-self: center;
}

.staff-grid {
  @include breakpoint('tablet') {
    max-width: 700px;
  }

  .staff-member {
    line-height: 1.5;
    text-align: left;
    font-weight: 500;
  }
}
</style>
