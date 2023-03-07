<template>
  <main></main>
</template>

<script>
import pdfBySlug from '@/apollo/queries/sanity/pdfBySlug'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [meta],
  data() {
    return {
      pdf: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: pdfBySlug,
      variables: { slug: params.pdf || '' }
    })

    if (data.pdf) {
      this.pdf = selectPublishedOrDraft(data.pdf)
    } else {
      error({ statusCode: 404 })
    }
  },
  fetchOnServer: false,
  computed: {
    pdfUrl() {
      return this.pdf?.file?.asset?.url
    }
  },
  watch: {
    pdfUrl() {
      window.location = this.pdfUrl
    }
  }
}
</script>

<style lang="scss"></style>
