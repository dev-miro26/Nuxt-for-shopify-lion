<template>
  <div>
    <main class="page-container-wide">
      <AisInstantSearch :search-client="searchClient" index-name="sanity_index">
        <AisSearchBox>
          <div slot-scope="{ currentRefinement, refine }">
            <input
              class="ais-SearchBox-input"
              placeholder="Type here"
              type="search"
              :value="currentRefinement"
              @keyup.enter="refine($event.currentTarget.value)"
              @keyup.delete="refine('')"
            />
          </div>
        </AisSearchBox>
        <AisIndex
          index-name="shopify_products"
          class="ais-InstantSearch-products"
        >
          <AisConfigure :hits-per-page.camel="5" />
          <AisStateResults>
            <template slot-scope="{ results: { query } }">
              <AisHits v-if="query.length">
                <AisInfiniteHits>
                  <template slot-scope="{ items, isLastPage, refineNext }">
                    <SearchResult
                      v-for="(section, name) in seperateSections(items, true)"
                      :key="name"
                      :items="section"
                      :title="name"
                    />
                    <button
                      v-if="items.length"
                      slot="loadMore"
                      :disabled="isLastPage"
                      @click="refineNext"
                    >
                      Load More Products
                    </button>
                  </template>
                </AisInfiniteHits>
              </AisHits>
              <div v-else />
            </template>
          </AisStateResults>
        </AisIndex>

        <div class="ais-InstantSearch-sanity">
          <AisStateResults>
            <AisConfigure :hits-per-page.camel="20" />
            <template slot-scope="{ results: { query } }">
              <AisHits v-if="query.length">
                <AisInfiniteHits>
                  <template slot-scope="{ items, isLastPage, refineNext }">
                    <SearchResult
                      v-for="(section, name) in seperateSections(items)"
                      :key="name"
                      :items="section"
                      :title="name"
                    />
                    <div class="view-more-btn-container">
                      <button
                        v-if="items.length"
                        slot="loadMore"
                        :disabled="isLastPage"
                        class="view-more-button"
                        @click="refineNext"
                      >
                        <h4>View More</h4>
                      </button>
                    </div>
                  </template>
                </AisInfiniteHits>
              </AisHits>
              <div v-else />
            </template>
          </AisStateResults>
        </div>
      </AisInstantSearch>
    </main>
  </div>
</template>

<script>
import {
  AisInstantSearch,
  AisHits,
  AisSearchBox,
  AisIndex,
  AisStateResults,
  AisInfiniteHits,
  AisConfigure
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

export default {
  components: {
    AisInstantSearch,
    AisHits,
    AisSearchBox,
    AisIndex,
    AisStateResults,
    AisInfiniteHits,
    AisConfigure
  },
  data() {
    return {
      searchClient: algoliasearch(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_ADMIN_API_KEY
      )
    }
  },
  methods: {
    seperateSections(sections, shopify) {
      if (shopify) return { shop: sections }
      return sections.reduce((acc, curr) => {
        if (curr?.hide) return acc
        if (curr.type === 'artist' && curr.category === 'designer') {
          acc[curr.category]
            ? acc[curr.category].push(curr)
            : (acc[curr.category] = [curr])
        } else {
          acc[curr.type] ? acc[curr.type].push(curr) : (acc[curr.type] = [curr])
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
.ais-InstantSearch {
  margin-bottom: 60px;
}

.ais-InstantSearch,
.ais-InstantSearch-products,
.ais-InstantSearch-sanity {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ais-SearchBox-submit,
.ais-SearchBox-reset {
  display: none;
}

.ais-SearchBox-input {
  text-align: center;
  border: 0px;
  border-bottom: 1px solid;
  font-size: $text-lg-tablet;
  width: 80vw;
  height: 100px;
  -webkit-appearance: none;
  border-radius: 0;
  margin: 0;
  @include breakpoint('tablet') {
    font-size: $text-lg-desktop;
    height: 150px;
  }
}

input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

.ais-InfiniteHits {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: $text-md-desktop;
}
</style>
