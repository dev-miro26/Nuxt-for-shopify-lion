import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      globalMetaDescriptionFallback: 'settings/getMetaDescription',
      globalMetaImageFallback: 'settings/getMetaImage',
      globalMetaTitleFallback: 'settings/getMetaTitle'
    }),
    meta() {
      return {
        description: '',
        image: null,
        title: ''
      }
    },
    metaDescription() {
      return (
        this.metaToUse?.description ||
        this.metaDescriptionFallback ||
        this.globalMetaImageFallback
      )
    },
    metaDescriptionFallback() {
      return this.globalMetaDescriptionFallback
    },
    metaImage() {
      return (
        this.formatMetaImageUrl(this.metaToUse?.image) ||
        this.metaImageFallback ||
        this.globalMetaImageFallback
      )
    },
    metaTitle() {
      return (
        this.metaToUse?.title ||
        this.metaTitleFallback ||
        this.globalMetaTitleFallback
      )
    },
    metaTitleFallback() {
      return this.globalMetaTitleFallback
    },
    metaToUse() {
      return this.page?.meta ? this.page.meta : this.meta
    }
  },
  methods: {
    formatMetaImageUrl(image) {
      const url = image?.asset?.url
      return url ? url + '?q=60&w=1200' : ''
    }
  },
  head() {
    return {
      title: `ARTLIFE | ${this.metaTitle}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.metaImage
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.metaImage
        },
        {
          hid: 'og:locale',
          name: 'og:locale',
          content: 'en_US'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Artlife'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Artlife | ${this.metaTitle}`
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://artlife.com/'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.metaDescription
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.metaImage
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Artlife | ${this.metaTitle}`
        }
      ],
      script:
        this.$route.name === 'visit'
          ? [
              {
                src: 'https://embed.acuityscheduling.com/js/embed.js',
                body: true
              }
            ]
          : []
    }
  }
}
