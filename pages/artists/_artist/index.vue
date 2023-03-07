<template>
  <div>
    <ProfilePage
      v-if="!$fetchState.pending && artist"
      :artist-or-designer="artist"
    />
  </div>
</template>

<script>
import artistOrDesignerBySlug from '@/apollo/queries/sanity/artistOrDesignerBySlug'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'

export default {
  data() {
    return {
      artist: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: artistOrDesignerBySlug,
      variables: { slug: params.artist }
    })

    if (data.artistOrDesigner) {
      this.artist = selectPublishedOrDraft(data.artistOrDesigner)
    } else {
      error({ statusCode: 404 })
    }
  }
}
</script>

<style lang="scss"></style>
