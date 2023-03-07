<template>
  <div>
    <!-- <PreviewFeed v-if="!$fetchState.pending" :items="feed" /> -->
    <div v-if="showEmailPopup">
      <modal class="email-signup" name="emailSignup">
        <div @click="closeModal" class="modal-close-button">
          <img src="~/assets/svg/icon_close.svg" alt="" />
        </div>
        <span class="topText">
          For Access to Exclusive Artworks, Limited Edition Releases and Events please join ArtLife's Mailing List.
        </span>
        <EmailCapture />
      </modal>
    </div>
    <carousel :per-page="1" :loop="true" :navigationEnabled="true">
      <slide v-for="(image, idx) in images" v-bind:key="image.id + idx">
        <img :src="image.url" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import homePage from '@/apollo/queries/sanity/homePage'
import meta from '@/lib/mixins/meta'
export default {
  mixins: [meta],
  data() {
    return {
      page: null,
      images: [],
      showEmailPopup: true,
    }
  },
  methods: {
    closeModal() {
      this.$modal.hide('emailSignup')
    }
  },
  async fetch() {
    const { app } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({ query: homePage })
    this.page = data.page
    if (this.page?.feed) {
      // let artworks = this.page?.feed[0].artworks;
      // this.images = artworks.map(artwork => {
      //   return artwork.artwork.images[0].asset;
      // })
      let views = this.page?.feed[0].views;
      this.images = views.map(view => {
        return view.photo.asset;
      })
    }
  },
  computed: {
    feed() {
      return this.page?.feed
    },
  },
  mounted() {
    const emailPopup = localStorage.getItem('artlife-email-popup');
    if (!emailPopup) {
      this.$modal.show('emailSignup')
      localStorage.setItem('artlife-email-popup', new Date())
    } else {
      this.showEmailPopup = false;
    }
  }
}
</script>
<style lang="scss">
.VueCarousel-slide {
  // max-height: calc(100vh - 546px);
  max-height: calc(100vh - 90px);

  img {
    height: 100%;
    object-fit: contain;
  }
}

.VueCarousel-pagination {
  position: absolute;
  bottom: 0;
}

.VueCarousel-navigation {
  .VueCarousel-navigation-prev {
    left: 30px !important;
  }

  .VueCarousel-navigation-next {
    right: 30px !important;
  }
}

.email-signup {
  // display: none;
}

.vm--modal {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .topText {
    padding: 24px;
    padding-bottom: 0;
  }
}

.modal-close-button {
  display: flex;
  justify-content: flex-end;

  img {
    width: 24px;
    cursor: pointer;
    height: 24px;
    padding-top: 8px;
    padding-right: 8px;
  }
}</style>