<template>
  <footer id="footer">
    <!-- <EmailCapture /> -->

    <div id="footer-info" class="footer-section">
      <div id="contact-locations">
        <FooterLocation
          v-for="(location, ix) in locations"
          :key="ix"
          :location="location"
        />
      </div>
      <div v-for="(group, ix) in linkGroups" :key="ix" class="footer-links">
        <LinkHandler
          v-for="(link, index) in group"
          :key="index"
          :to="handleInternalLink(link)"
          :href="handleExternalLink(link)"
        >
          {{ link.title }}
        </LinkHandler>
      </div>
    </div>

    <div id="footer-contact" class="footer-section">
      <p>Art Life &copy; 2023</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  computed: {
    ...mapGetters({
      footer: 'settings/getFooter'
    }),
    email() {
      return this.footer?.email
    },
    linkGroups() {
      return this.chunkArray(this.footerLinks, 3)
    },
    footerLinks() {
      return this.footer?.footerLinks
    },
    locations() {
      return this.footer?.locations
    }
  },
  methods: {
    chunkArray(array, size) {
      const result = []
      for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size)
        result.push(chunk)
      }
      return result
    },
    handleInternalLink(link) {
      if (link?.internalLink) {
        return link.internalLink.url
      } else {
        return null
      }
    },
    handleExternalLink(link) {
      if (link?.externalLink) {
        return link.externalLink.url
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
#footer {
  background: $white;
  .footer-section {
    padding: css-pixels(40px);
    @include breakpoint('tablet') {
      padding: 20px;
    }
    a {
      text-decoration: underline;
      text-decoration-color: transparent;
      transition: text-decoration-color 250ms;
      &:hover {
        text-decoration-color: inherit;
      }
    }
  }

  // Locations + Links Info
  #footer-info {
    color: $black;
    display: flex;
    flex-direction: column;
    gap: css-pixels(40px);
    @include breakpoint('tablet') {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
    }

    #contact-locations {
      display: grid;
      gap: css-pixels(40px);
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  #footer-contact {
    display: flex;
    justify-content: flex-end;
  }
}

.ctct-inline-form .g-recaptcha {
  display: none !important;
}
</style>
