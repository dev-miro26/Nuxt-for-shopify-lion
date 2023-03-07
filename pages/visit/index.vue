<template>
  <main class="page-container-thin flow-grid">
    <h1 class="text-lg center">Schedule an appointment</h1>
    <iframe
      :src="iframeSrc"
      title="Schedule Appointment"
      width="100%"
      height="800"
      frameBorder="0"
    />
  </main>
</template>

<script>
import meta from '@/lib/mixins/meta'

export default {
  mixins: [meta],
  computed: {
    iframeSrc() {
      const baseUrl =
        'https://app.acuityscheduling.com/schedule.php?owner=21807244'
      const params = this.$route.query.location
        ? `&appointmentType=${this.$route.query.location}`
        : ''
      return baseUrl + params
    }
  }
}
</script>

<style lang="scss"></style>
