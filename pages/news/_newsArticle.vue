<template>
  <div>
    <ArticleSlugPage v-if="!$fetchState.pending && newsArticle" :article="newsArticle" />
  </div>
</template>

<script>
import articleBySlug from '@/apollo/queries/sanity/articleBySlug'

export default {
  data() {
    return {
      newsArticle: null
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: articleBySlug,
      variables: { slug: params.newsArticle }
    })

    if (data.article) {
      this.newsArticle = data.article[0]
    } else {
      error({ statusCode: 404 })
    }
  }
}
</script>

<style lang="scss"></style>
