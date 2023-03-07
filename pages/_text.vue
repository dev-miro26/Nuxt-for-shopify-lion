<template>
  <main v-if="!$fetchState.pending" class="page-container">
    <SanityContentTextSuite v-if="content" :blocks="content" />
  </main>
</template>

<script>
import textPageBySlug from '~/apollo/queries/sanity/textPageBySlug'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [meta],
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: textPageBySlug,
      variables: { slug: params.text }
    })

    if (data.page) {
      this.page = selectPublishedOrDraft(data.page)
    } else {
      error({ statusCode: 404 })
    }
  },
  computed: {
    content() {
      return this.page?.content
    }
  }
}
</script>

<style lang="scss"></style>
