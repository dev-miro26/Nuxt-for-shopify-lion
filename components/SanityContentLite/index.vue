<template>
  <BlockContent
    :blocks="blocks"
    :class-name="classes"
    render-container-on-single-child
    :serializers="serializers"
  />
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'

export default {
  components: {
    BlockContent
  },
  props: {
    blocks: {
      type: Array,
      default: () => []
    },
    classes: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      serializers: {
        marks: {
          externalLink: ({ children, mark }) => {
            const { url } = mark
            return (
              <a href={url} target="_blank" rel="noopener">
                {children}
              </a>
            )
          },
          internalLink: ({ children, mark }) => {
            const { path } = mark
            return <nuxt-link to={path}>{children}</nuxt-link>
          }
        }
      }
    }
  }
}
</script>

<style lang="scss"></style>
