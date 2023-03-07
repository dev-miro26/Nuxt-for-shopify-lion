<template>
  <div>
    <div class="faq-title-container">
      <h3>
        {{ faqTitle }}
      </h3>
    </div>
    <div class="faq-body-container">
      <SanityContentTextSuite :blocks="faqBody" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    faq: {
      type: Object,
      required: true
    }
  },
  computed: {
    faqTitle() {
      return this.faq?.title
    },
    faqBody() {
      return this.faq?.bodyRaw
    }
  }
}
</script>

<style lang="scss">
.faq-title-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 25px;
}
.faq-body-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 2;
  .content-blocks.text-suite p {
    text-align: center;
    max-width: unset;
  }
}
</style>
