<template>
  <nav :id="id" :class="classes">
    <slot />
  </nav>
</template>

<script>
export default {
  props: {
    invert: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [{ nav: !this.invert }, 'sub-nav', 'hide-scrollbar']
    },
    id() {
      return `sub-nav-${this.style}`
    },
    style() {
      return this.invert ? 'dark' : 'light'
    }
  }
}
</script>

<style lang="scss">
.sub-nav {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .sub-nav-item {
    font-size: 14px;
    display: flex;
    align-items: center;
    height: $sub-nav-height-mobile;
    @include breakpoint('tablet') {
      height: $sub-nav-height;
    }
  }
}

#sub-nav-light {
  background: $white-smoke;
  color: $black;

  .sub-nav-dropdown-item,
  .sub-nav-link {
    &:hover,
    &.nuxt-link-exact-active {
      color: black;
      text-decoration: underline;
    }
  }

  & > :not(:first-child) {
    margin-left: 24px;
  }
}

#sub-nav-dark {
  background: $black;
  color: $white;

  .sub-nav-item {
    padding: 0px css-pixels(40px);
    @include breakpoint('tablet') {
      padding: 0px 20px;
    }
  }

  .sub-nav-dropdown-item,
  .sub-nav-link {
    &:hover,
    &.nuxt-link-exact-active {
      background: $white-smoke;
      color: $black;
    }
  }

  .dropdown-icon {
    filter: invert(1);
  }
}
</style>
