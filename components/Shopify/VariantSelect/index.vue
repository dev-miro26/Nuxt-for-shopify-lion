<template>
  <div class="variant-select">
    <select class="select-button" @input="$emit('input', $event.target.value)">
      <option value="">Select</option>
      <option
        v-for="(variant, ix) in variants"
        :key="ix"
        :value="variant.price"
      >
        {{ variant.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    variants: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss"></style>
