<template>
  <div>
    <ColorBlock
      v-if="variation === 'homePage'"
      :bg-color="bgColor"
      class="details-block"
    >
      <div class="details-left">
        <h4>{{ attribution }}</h4>
        <h4>{{ exhibitionName }}</h4>
      </div>
      <div class="details-right">
        <LinkHandler :to="path">View Now</LinkHandler>
      </div>
    </ColorBlock>
    <ColorBlock v-if="variation === 'artistProfile'">
      <br />
      <p>{{ formattedDate }}</p>
      <h4>{{ exhibitionName }} by {{ attribution }}</h4>
    </ColorBlock>
    <ColorBlock v-if="variation === 'exhibitions'" class="details-block">
      <div class="details-left">
        <h4>{{ exhibitionName }}</h4>
        <h4>{{ attribution }}</h4>
      </div>
      <div class="details-right">
        <h4>{{ formattedDate }}</h4>
      </div>
    </ColorBlock>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    attribution: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    openingDate: {
      type: String,
      default: ''
    },
    closingDate: {
      type: String,
      default: ''
    },
    exhibitionName: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    variation: {
      type: String,
      default: 'homePage'
    }
  },
  computed: {
    formattedDate() {
      return `${this.formatDate(this.openingDate)} — ${this.formatDate(
        this.closingDate
      )}`
    }
  },
  methods: {
    formatDate: date => {
      return moment(date).format('MM.DD.YYYY')
    }
  }
}
</script>

<style lang="scss">
.details-block {
  display: flex;
  justify-content: space-between;

  .details-left {
    display: flex;
    flex-direction: column;
  }

  .details-right {
    font-size: 16px;
    @include breakpoint('laptop') {
      font-size: 24px;
    }

    a {
      text-decoration: underline;
    }
  }
}
</style>
