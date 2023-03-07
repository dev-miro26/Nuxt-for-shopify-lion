<template>
  <ExhibitionsPage v-if="!$fetchState.pending" :page="page" include-years />
</template>

<script>
import exhibitionsPage from '@/apollo/queries/sanity/exhibitionsPage'

export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const { app } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: exhibitionsPage,
      variables: { id: 'exhibitionsPagePast' }
    })

    this.page = data.page
  }
}
</script>

<style lang="scss"></style>
