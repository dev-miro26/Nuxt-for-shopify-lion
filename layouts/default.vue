<template>
  <div class="site-container">
    <MainNav />
    <MobileNav />
    <Nuxt class="main-content" />
    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.site-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .main-content {
    flex: 1;
  }
}
</style>
