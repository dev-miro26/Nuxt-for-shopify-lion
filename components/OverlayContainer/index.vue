<template>
  <div :class="['overlay-container', position, { wrap: wrap }]">
    <div class="overlay-group">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    leftOrRight() {
      return this.left ? 'left' : 'right'
    },
    position() {
      return [this.topOrBottom, this.leftOrRight]
    },
    topOrBottom() {
      return this.top ? 'top' : 'bottom'
    }
  }
}
</script>

<style lang="scss">
.overlay-container {
  position: absolute;
  &.bottom {
    bottom: css-pixels(40px);
    @include breakpoint('tablet') {
      bottom: 20px;
    }
  }
  &.left {
    left: css-pixels(40px);
    @include breakpoint('tablet') {
      left: 20px;
    }
  }
  &.right {
    right: css-pixels(40px);
    @include breakpoint('tablet') {
      right: 20px;
    }
  }
  &.top {
    top: css-pixels(40px);
    @include breakpoint('tablet') {
      top: 20px;
    }
  }
  &.wrap {
    @include breakpoint('tablet', max) {
      position: static;
      padding: css-pixels(40px);
      display: flex;
      justify-content: flex-end;
    }
  }

  .overlay-group {
    display: inline-grid;
    grid-auto-flow: column;
    gap: css-pixels(40px);
    place-items: center;
    @include breakpoint('tablet') {
      gap: 20px;
    }
  }
}
</style>
