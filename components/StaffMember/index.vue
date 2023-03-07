<template>
  <div class="staff-member">
    <p>{{ name }}</p>
    <p>{{ position }}</p>
    <a v-if="email" :href="`mailto:${email}`">{{ email }}</a>
  </div>
</template>

<script>
import helpers from '@/lib/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    staffMember: {
      type: Object,
      required: true
    }
  },
  computed: {
    email() {
      return this.staffMember.email
    },
    name() {
      return this.formatName(this.staffMember)
    },
    position() {
      return this.staffMember.position
    }
  }
}
</script>

<style lang="scss">
.staff-member {
  line-height: initial;
  text-align: center;

  a {
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 250ms;
    &:hover {
      text-decoration-color: inherit;
    }
  }
}
</style>
