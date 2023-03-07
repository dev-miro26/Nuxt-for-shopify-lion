<template>
  <a :class="classes" :href="link" target="_blank">
    <h4>{{ publicationDate }}</h4>
    <h4>{{ title }}</h4>
    <div class="press-icon-container">
      <span class="visually-hidden">Link to article</span>
      <ArrowRight />
    </div>
  </a>
</template>

<script>
import ArrowRight from '@/assets/svg/icon_arrow_right.svg?inline'
import helpers from '@/lib/mixins/helpers'

export default {
  components: {
    ArrowRight
  },
  mixins: [helpers],
  props: {
    ix: {
      type: Number,
      required: true
    },
    pressItem: {
      type: Object,
      required: true
    }
  },
  computed: {
    classes() {
      return ['press-container', { 'first-item': this.firstItem }]
    },
    firstItem() {
      return this.ix === 0
    },
    link() {
      return this.pressItem.link
    },
    publicationDate() {
      return this.formatDate(this.pressItem.publicationDate)
    },
    title() {
      return this.pressItem.title
    }
  }
}
</script>

<style lang="scss">
.press-container {
  display: flex;
  justify-content: space-between;
  padding: 24px 16px;
  border-bottom: 1px solid $black;

  &:hover {
    color: $white;
    background: $black;
    fill: $white;

    g {
      stroke: $white;
    }
  }

  &.first-item {
    border-top: 1px solid $black;
  }

  .press-icon-container {
    display: flex;
    align-items: center;
  }
}
</style>
