<template>
  <ColorBlock :bg-color="bgColor" class="quote-block">
    <p v-if="top" class="quote-top">{{ top }}</p>
    <div v-if="main" class="quote-main text-md">
      <SanityContentSuite :blocks="main" />
    </div>
  </ColorBlock>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    main: {
      type: Array,
      default: null
    },
    top: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.quote-block {
  text-align: center;
  margin-top: 40px;

  .quote-top {
    padding: 0px css-pixels(80px);
    @include breakpoint('mobile') {
      padding: 0px 120px;
    }
    @include breakpoint('tablet', max) {
      margin-bottom: css-pixels(40px);
    }
  }

  .quote-main {
    @include breakpoint('mobile') {
      padding: 0px 60px;
    }
    &.text-lg {
      margin: css-pixels(20px) auto;
      max-width: 1280px;
      @include breakpoint('tablet') {
        margin: 20px auto;
      }
    }
    .content-blocks {
      grid-gap: 20px;
    }
    p {
      max-width: unset;
    }
  }
}
</style>
