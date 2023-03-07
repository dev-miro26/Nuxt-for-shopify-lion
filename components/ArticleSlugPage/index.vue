<template>
  <main>
    <TwoUpHero :main-title="title" :image="heroImage" :blurb="blurb" />
    <div class="top-spacing">
      <SanityContentSuite :blocks="bodyContent" />
    </div>
  </main>
</template>

<script>
// import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [helpers, meta],
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.article?.title
    },
    blurb() {
      return this.article?.blurb
    },
    heroImage() {
      return this.article?.heroImage
    },
    bodyContent() {
      return this.article?.bodyContentRaw
        ? this.formatBlockContent(this.article.bodyContentRaw)
        : null
    }
  }
}
</script>
<style lang="scss">
.top-spacing {
  @include breakpoint('tablet') {
    margin-top: 50px;
  }
}
</style>
