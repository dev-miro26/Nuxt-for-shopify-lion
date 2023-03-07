<template>
  <div>
    <ArtworkPage v-if="!$fetchState.pending && artwork" :artwork="artwork" />
  </div>
</template>

<script>
import artworkBySlug from '@/apollo/queries/sanity/artworkBySlug'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'

export default {
  data() {
    return {
      artwork: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: artworkBySlug,
      variables: { slug: params.artwork }
    })

    if (data.artwork) {
      this.artwork = selectPublishedOrDraft(data.artwork)
    } else {
      error({ statusCode: 404 })
    }
  }
}
</script>

<style lang="scss"></style>
