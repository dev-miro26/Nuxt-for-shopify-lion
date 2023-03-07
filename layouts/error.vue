<template>
  <main class="page-container-wide center error-page">
    <h1 class="text-lg">Error 404</h1>
    <h2>
      <span>You attempted to load</span>
      <span>{{ url }}</span>
      <span>but this page does not exist</span>
    </h2>
  </main>
</template>

<script>
import settingsQuery from '@/apollo/queries/sanity/settings'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [meta],
  async fetch() {
    const { app, store } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: settingsQuery
    })
    store.commit('settings/setFooter', data.settings.footer)
  },
  computed: {
    url() {
      return 'www.artlife.com' + this.$route.fullPath
    }
  }
}
</script>

<style lang="scss">
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    display: block;
  }
}
</style>
