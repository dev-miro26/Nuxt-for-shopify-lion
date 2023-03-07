<template>
  <main v-if="!$fetchState.pending" class="page-container-wide">
    <h2 v-if="sectionTitle" class="artist-grid-title">
      {{ sectionTitle }}
    </h2>
    <div class="collection-grid">
      <GridProfileCard v-for="(artist, ix) in sortedArtists" :key="ix" :profile="artist" variation="artist" />
    </div>

    <h2 v-if="customSectionTitle" class="artist-grid-title">
      {{ customSectionTitle }}
    </h2>
    <div class="collection-grid">
      <GridProfileCard v-for="(artist, ix) in customArtists" :key="ix" :profile="designer" variation="artist" />
    </div>
  </main>
</template>



<script>
import artistsPage from '@/apollo/queries/sanity/artistsPage'
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
    const { data } = await client.query({ query: artistsPage })
    console.log("data", data)
    this.page = data.page
  },
  computed: {
    artists() {
      return this.page?.artists
    },
    customArtists() {
      return this.page?.customArtistsList
    },
    sectionTitle() {
      return this.page?.sectionTitle
    },
    customSectionTitle() {
      return this.page?.customSectionTitle
    },
    // Sort artists alphabetically by first name
    sortedArtists() {
      return this.artists
        .slice()
        .sort((a, b) =>
          a.firstName !== b.firstName ? (a.firstName < b.firstName ? -1 : 1) : 0
        )
    }
  }
}
</script>

<style lang="scss">
.page-container-wide {
  .artist-grid-title {
    max-width: 1280px;
    margin: 20px auto;
    text-align: center;
  }

  .collection-grid:not(:last-of-type) {
    padding-bottom: 56px;
  }
}
</style>
