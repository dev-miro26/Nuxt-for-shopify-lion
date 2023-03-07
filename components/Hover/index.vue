<template>
  <aside class="hover-container">
    <slot />
  </aside>
</template>

<script>
export default {}
</script>

<style lang="scss">
.hover-container {
  display: flex;
  justify-content: flex-end;
  position: sticky;
  bottom: css-pixels(40px);
  margin: css-pixels(40px);
  @include breakpoint('tablet') {
    bottom: 20px;
    margin: 20px;
  }

  & > :not(:first-child) {
    margin-left: css-pixels(40px);
    @include breakpoint('tablet') {
      margin-left: 20px;
    }
  }
}
</style>
