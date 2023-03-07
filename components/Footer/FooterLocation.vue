<template>
  <div class="footer-location">
    <p>{{ street }}</p>
    <p>{{ city }}, {{ state }} {{ zipcode }}</p>
    <p v-if="hours">{{ hours }}</p>
    <a v-if="phoneLink" :href="phoneLink">{{ phone }}</a>
    <a v-if="email" :href="`mailto:${email}`">{{ email }}</a>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  computed: {
    address() {
      return this.location?.address
    },
    city() {
      return this.address?.city
    },
    email() {
      return this.location?.email
    },
    hours() {
      return this.location?.hours
    },
    phone() {
      return this.location?.phone
    },
    phoneLink() {
      return this.phone && `tel:${this.phone}`
    },
    state() {
      return this.address?.state
    },
    street() {
      return this.address?.street
    },
    zipcode() {
      return this.address?.zipcode
    }
  }
}
</script>

<style lang="scss"></style>
