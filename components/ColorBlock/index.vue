<template>
  <div :class="['color-block', color]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgDefault() {
      return 'white'
    },
    color() {
      return this.bgColor || this.bgDefault
    }
  }
}
</script>

<style lang="scss">
.color-block {
  color: $black;
  padding: css-pixels(40px);
  @include breakpoint('tablet') {
    padding: 0 16px 16px;
  }

  // 🎨 color options
  &.aquamarine {
    background: $aquamarine;
    color: $black;
  }
  &.black {
    background: $black;
    color: $white;
    img {
      filter: invert(1);
    }
  }
  &.blush {
    background: $blush;
    color: $black;
  }
  &.cotton-candy {
    background: $cotton-candy;
    color: $black;
  }
  &.dim-gray {
    background: $dim-gray;
    color: $white;
    img {
      filter: invert(1);
    }
  }
  &.electric-blue {
    background: $electric-blue;
    color: $black;
  }
  &.green-yellow {
    background: $green-yellow;
    color: $black;
  }
  &.lavender {
    background: $lavender;
    color: $black;
  }
  &.light-cyan {
    background: $light-cyan;
    color: $black;
  }
  &.magenta {
    background: $magenta;
    color: $black;
  }
  &.mona-lisa {
    background: $mona-lisa;
    color: $black;
  }
  &.mortar {
    background: $mortar;
    color: $white;
    img {
      filter: invert(1);
    }
  }
  &.night-rider {
    background: $night-rider;
    color: $white;
    img {
      filter: invert(1);
    }
  }
  &.pale-lavender {
    background: $pale-lavender;
    color: $black;
  }
  &.papaya-whip {
    background: $papaya-whip;
    color: $black;
  }
  &.peach {
    background: $peach;
    color: $black;
  }
  &.white {
    background: $white;
    color: $black;
  }
}
</style>
