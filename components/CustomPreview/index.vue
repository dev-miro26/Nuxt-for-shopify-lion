<template>
  <PreviewBlock
    :center="center"
    :image="image"
    :left="left"
    :link="link"
    :main="main"
    :path="path"
    :right="right"
    :tag="tag"
    :video="video"
  />
</template>

<script>
export default {
  props: {
    preview: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: 'h2'
    }
  },
  computed: {
    center() {
      return this.preview?.copyCenter
    },
    image() {
      return this.preview?.featuredImage
    },
    left() {
      return this.preview?.copyLeft
    },
    link() {
      return this.preview?.externalLink?.url
    },
    main() {
      return this.preview?.copyMain
    },
    path() {
      return this.preview?.internalLink?.path
    },
    right() {
      return this.preview?.copyRight
    },
    video() {
      return this.preview?.featuredVideo?.url
    }
  }
}
</script>

<style lang="scss"></style>
