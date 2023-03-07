<template>
  <header id="main-nav-container" class="main-nav">
    <nav id="main-nav" class="split-nav">
      <MainNavItems class="nav-group" />
      <MainNavTabs class="nav-group" />
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
#main-nav-container {
  @include breakpoint('tablet', max) {
    display: none;
  }
}
</style>
