<template>
  <div>
    <h2 v-if="items.length" class="uppercase">{{ displayTitle }}</h2>
    <div :class="gridVariation">
      <SearchItem v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import SearchItem from './SearchItem.vue'
export default {
  components: { SearchItem },
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    items: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  computed: {
    gridVariation() {
      return this.title === 'artwork' ? 'artwork-grid' : 'collection-grid'
    },
    displayTitle() {
      return this.title === 'newsArticle' ? 'Articles' : this.title
    }
  }
}
</script>

<style scoped lang="scss">
.uppercase {
  text-transform: capitalize;
  font-size: 5rem;
  padding-top: 100px;
  padding-bottom: 40px;
}

.artwork-grid-container {
  @include breakpoint('tablet') {
    position: relative;
    display: table;
    width: 100vw;
    right: 78%;

    .artwork-grid,
    .uppercase {
      width: 100%;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      left: -50%;
    }
  }
}
</style>
