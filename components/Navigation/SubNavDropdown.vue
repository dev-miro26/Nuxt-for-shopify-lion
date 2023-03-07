<template>
  <div class="sub-nav-dropdown-container">
    <button
      :class="['sub-nav-item sub-nav-dropdown', { expanded: isExpanded }]"
      @click="toggleIsExpanded"
      @enter="toggleIsExpanded"
    >
      <span>
        <slot />
      </span>
      <img
        v-if="icon"
        src="~/assets/svg/icon_chevron.svg"
        class="dropdown-icon"
      />
    </button>
    <div
      v-if="isExpanded"
      class="sub-nav-dropdown-outside"
      @click="toggleIsExpanded"
    />
    <transition name="fade">
      <div
        v-if="isExpanded"
        :class="['sub-nav-dropdown-items', { grid: grid }]"
        @click="toggleIsExpanded"
      >
        <SubNavDropdownItem
          v-for="(item, ix) in items"
          :key="ix"
          :item="item"
          :disabled="!item.link"
        >
          {{ item.label }}
        </SubNavDropdownItem>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    grid: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleIsExpanded() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss">
.sub-nav-dropdown-container {
  background: inherit;
  color: inherit;

  .sub-nav-dropdown {
    border: none;
    background: inherit;
    color: inherit;
    padding: 0px;
    outline: none;
    cursor: pointer;
    &:focus-visible {
      outline: 1px dotted $dark-gray;
    }

    .dropdown-icon {
      transition: transform 350ms 100ms;
      margin-left: $text-sm-tablet * 0.8;
      width: $text-sm-tablet * 0.8;
      @include breakpoint('desktop') {
        width: $text-sm-laptop;
      }
    }

    &.expanded {
      .dropdown-icon {
        transform: rotate(-180deg);
        transition: transform 350ms;
      }
    }
  }

  .sub-nav-dropdown-items {
    position: absolute;
    display: grid;
    padding: css-pixels(13px) 0px;
    background: inherit;
    color: inherit;
    @include breakpoint('tablet') {
      padding: 6.5px 0px;
    }

    &.grid {
      grid-template-columns: repeat(5, 1fr);
      padding: unset;
      .sub-nav-dropdown-item {
        height: $sub-nav-height-mobile;
        @include breakpoint('tablet') {
          height: $sub-nav-height;
        }
      }
    }
  }

  .sub-nav-dropdown-outside {
    background: transparent;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
