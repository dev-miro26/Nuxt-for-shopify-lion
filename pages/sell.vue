<template>
  <div v-if="!$fetchState.pending">
    <main id="consignment-page">
      <TwoUpHero :main-title="heading" :image="heroImage" :blurb-block="description" />
      <div class="sections-container">
        <Section v-for="(instructionBlock, ix) in instructionBlocks" :key="ix" class="section-margin">
          <InstructionBlock :instruction-block="instructionBlock" />
        </Section>
        <Section class="consignment-contact">
          <div class="consignment-contact-heading">
            <h2>Consign with us!</h2>
            <p>Fill out the form below and we will get in touch!</p>
          </div>
          <InquiryForm />
        </Section>
        <Section class="consignment-artists-section section-margin">
          <h2>Consign Works By</h2>
          <ul class="consignment-list text-h4">
            <li>Alex Katz</li>
            <li>Andy Warhol</li>
            <li>Banksy</li>
            <li>Damien Hirst</li>
            <li>David Hockney</li>
            <li>Ed Ruscha</li>
            <li>George Condo</li>
            <li>Harland Miller</li>
            <li>Hebru Brantley</li>
            <li>Invader</li>
            <li>Jean-Michel Basquiat</li>
            <li>Jonas Wood</li>
            <li>KAWS</li>
            <li>Keith Haring</li>
            <li>Nicolas Party</li>
            <li>Picasso</li>
            <li>Roy Lichtenstein</li>
            <li>Takashi Murakami</li>
            <li>Yayoi Kusama</li>
            <li>Yoshitomo Nara</li>
            <li>And more!</li>
          </ul>
        </Section>
        <Section v-if="faqs" class="section-margin faq-section">
          <h2 class="faq-section-title">FAQ</h2>
          <Faq v-for="(faq, ix) in faqs" :key="ix" :faq="faq" />
        </Section>
      </div>
    </main>
  </div>
</template>

<script>
import consignmentPage from '@/apollo/queries/sanity/consignmentPage'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [helpers, meta],
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const { app } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({ query: consignmentPage })
    this.page = data.page
  },
  computed: {
    description() {
      return this.page?.description
        ? this.formatBlockContent(this.page.description)
        : null
    },
    faqs() {
      return this.page?.faqs
    },
    heading() {
      return this.page?.about
    },
    heroImage() {
      return this.page?.heroImage
    },
    instructionBlocks() {
      return this.page?.instructionBlocks
    }
  }
}
</script>

<style lang="scss">
#consignment-page {
  .consignment-contact {
    padding-top: unset;

    &-heading {
      max-width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h2 {
        margin-bottom: 5px;
      }

      p {
        margin-bottom: 20px;
      }
    }
  }

  .consignment-artists-section {
    width: 100%;
    margin: 0 auto;

    h2 {
      text-align: center;
      margin-bottom: 40px;
    }

    .consignment-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 16px;
      grid-column-gap: 24px;
      place-items: center;

      @include breakpoint('tablet') {
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 36px;
        justify-items: left;
      }

      li:last-child {
        grid-column: span 2;
        place-items: center;

        @include breakpoint('tablet') {
          grid-column: span 4;
          justify-self: center;
        }
      }
    }
  }

  .faq-section {
    .faq-section-title {
      text-align: center;
      margin: 25px;
    }
  }
}
</style>
