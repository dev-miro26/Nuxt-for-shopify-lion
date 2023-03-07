<template>
  <main>
    <div v-for="(item, ix) in items" :key="ix">
      <ExhibitionPreview :exhibition="item" variation="homePage" />
    </div>
  </main>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss"></style>
