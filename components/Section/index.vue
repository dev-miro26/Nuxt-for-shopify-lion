<template>
  <section class="section">
    <div :id="anchor" class="anchor"></div>
    <component
      :is="headingTag"
      v-if="heading"
      class="section-heading text-lg"
      :class="{ left: leftAlignedBoolean }"
    >
      {{ heading }}
    </component>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    anchor: {
      type: String,
      default: ''
    },
    heading: {
      type: String,
      default: ''
    },
    headingTag: {
      type: String,
      default: 'h2'
    },
    alignment: {
      type: String,
      default: ''
    }
  },
  computed: {
    leftAlignedBoolean() {
      return this.alignment === 'left-aligned'
    }
  }
}
</script>

<style lang="scss">
.section {
  background-color: white;
  max-width: 100vw;
  padding-top: $section-spacing-mobile;
  padding-bottom: $section-spacing-mobile;
  @include breakpoint('tablet') {
    padding-top: $section-spacing;
    padding-bottom: $section-spacing;
  }

  .anchor {
    height: $anchor-offset-mobile;
    margin-top: ($anchor-offset-mobile - 1px) * -1;
    visibility: hidden;
    @include breakpoint('tablet') {
      height: $anchor-offset;
      margin-top: ($anchor-offset - 1px) * -1;
    }
  }

  .section-heading {
    text-align: center;
    margin-bottom: $section-spacing-mobile;
    @include breakpoint('tablet') {
      margin-bottom: $section-spacing;
    }
    &.left {
      text-align: unset;
      margin-left: 16px;
    }
  }
}
</style>
