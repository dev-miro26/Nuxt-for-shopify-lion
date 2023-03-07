<template>
  <div class="artist-hero-grid">
    <div class="artist-detail-left">
      <SanityImage :image="image"></SanityImage>

      <div class="artist-detail-right">
        <div class="artist-detail-text">
          <h2 v-if="mainTitle">
            <a :href="url">{{ mainTitle }}</a>
          </h2>
          <SanityContentLite v-if="blurbBlock.length" :blocks="blurbBlock" />
          <p v-if="blurb">{{ blurb }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainTitle: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: null
    },
    blurbBlock: {
      type: Array,
      default: () => [],
      required: false
    },
    blurb: {
      type: String,
      default: '',
      required: false
    },
    top: {
      type: String,
      default: ''
    }
  },
  computed: {
    url() { return this.image.url }

  }
}
</script>

<style lang="scss" scoped>
.artist-hero-grid {
  margin: 16px;
  // display: grid;
  // grid-gap: 16px;

  @include breakpoint('mobile') {
    grid-template-columns: repeat(2, 1fr);

    .artist-detail-left {
      position: relative !important;
      display: flex;
      justify-content: center;
      width: 100%;

      .artist-detail-text {
        h2:hover {
          color: #dd3333;
        }
      }

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .artist-detail-right {
      padding: 0 20px 0 20px;
      top: 10%;
      background-color: rgba(255, 255, 255, 0.6);
      position: absolute;
      width: 80%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 16px;
    }
  }
}
</style>
