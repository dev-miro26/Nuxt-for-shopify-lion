<template>
  <BlockContent
    :blocks="blocks"
    :class-name="classList"
    render-container-on-single-child
    :serializers="serializers"
  />
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import ImageBlock from '@/components/ImageBlock'
import QuoteBlock from '@/components/QuoteBlock'
import VideoBlock from '@/components/VideoBlock'

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
        },
        types: {
          imageBlock: ImageBlock,
          quoteBlock: QuoteBlock,
          videoBlock: VideoBlock
        }
      }
    }
  },
  computed: {
    classList() {
      return ['content-blocks suite', this.classes].join(' ')
    }
  }
}
</script>

<style lang="scss"></style>
