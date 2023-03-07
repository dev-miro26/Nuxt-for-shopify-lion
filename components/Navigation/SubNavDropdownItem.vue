<template>
  <div :class="['sub-nav-dropdown-item', { disabled: disabled }]">
    <nuxt-link v-if="path" :to="path">
      <slot />
    </nuxt-link>
    <span v-else>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    path() {
      return this.item.link
    }
  }
}
</script>

<style lang="scss">
.sub-nav-dropdown-item {
  display: flex;
  align-items: stretch;
  height: $sub-nav-height-mobile * 0.8;
  @include breakpoint('tablet') {
    height: $sub-nav-height-mobile;
  }

  :first-child {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px css-pixels(40px);
    @include breakpoint('tablet') {
      padding: 0px 20px;
    }
  }

  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
