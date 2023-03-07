<template>
  <header id="mobile-nav-container" class="main-nav">
    <nav id="mobile-nav">
      <div class="split-nav">
        <div id="mobile-nav-icons" class="nav-group">
          <div class="mobile-icon-container">
            <transition name="fade">
              <img
                v-show="dropdownOpen"
                src="~/assets/svg/icon_close.svg"
                class="mobile-icon"
                @click="closeDropdown"
              />
            </transition>
            <transition name="fade">
              <img
                v-show="!dropdownOpen"
                src="~/assets/svg/icon_menu.svg"
                class="mobile-icon"
                @click="openDropdown"
              />
            </transition>
          </div>
          <nuxt-link to="/search">
            <img
              src="~/assets/svg/zoom_1.svg"
              class="mobile-icon"
              @click="closeDropdown"
            />
          </nuxt-link>
        </div>
      </div>
      <MainNavTabs class="split-nav" @click.native="closeDropdown" />
      <transition name="fade">
        <div
          v-if="dropdownOpen"
          id="mobile-nav-dropdown"
          class="hide-scrollbar"
        >
          <MainNavItems class="nav-group" @click.native="closeDropdown" />
        </div>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false
    }
  },
  methods: {
    closeDropdown() {
      this.dropdownOpen = false
      document.body.classList.remove('mobile-no-scroll')
    },
    openDropdown() {
      this.dropdownOpen = true
      document.body.classList.add('mobile-no-scroll')
    }
  }
}
</script>

<style lang="scss">
#mobile-nav-container {
  @include breakpoint('tablet') {
    display: none;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: css-pixels(40px) 0;
  }

  .active-nav-item {
    a {
      font-size: $text-sm-tablet;
      &:not(.active) {
        display: none;
      }
    }
  }

  #mobile-nav-icons {
    gap: css-pixels(40px);
    align-items: center;

    .mobile-icon-container {
      width: css-pixels(74px);
      height: css-pixels(74px);
      position: relative;
      img {
        position: absolute;
      }
    }

    .mobile-icon {
      width: css-pixels(74px);
    }
  }

  #mobile-nav-dropdown {
    position: fixed;
    top: $main-nav-height-mobile - 1px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($white, 0.98);
    z-index: 99;
    overflow: auto;
    padding: 0px css-pixels(40px) css-pixels(40px);

    #main-nav-items {
      grid-auto-flow: row;
      gap: css-pixels(40px);
    }

    .search-icon {
      display: none;
    }
  }
}
</style>
