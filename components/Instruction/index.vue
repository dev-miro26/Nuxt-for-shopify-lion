<template>
  <div class="instruction">
    <div class="instruction-image profile-image-crop">
      <SanityImage :image="image" />
    </div>
    <h4>{{ heading }}</h4>
    <SanityContentLite :blocks="description" />
  </div>
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    instruction: {
      type: Object,
      required: true
    }
  },
  computed: {
    description() {
      return this.instruction?.description
        ? this.formatBlockContent(this.instruction.description)
        : null
    },
    heading() {
      return this.instruction?.heading
    },
    image() {
      return this.instruction?.image
    }
  }
}
</script>

<style lang="scss">
.instruction {
  display: flex;
  flex-direction: column;

  &-image {
    margin-bottom: 24px;
  }

  h2 {
    margin-bottom: 10px;
  }

  p {
    line-height: 2;
    @include breakpoint('tablet', max) {
      margin-bottom: 24px;
    }
  }
}
</style>
