<template>
  <form class="inquiry-form" @submit.prevent="handleSubmit">
    <input
      id="name"
      v-model="inquiryForm.name"
      type="text"
      name="name"
      placeholder="Name *"
      required
    />
    <input
      id="email"
      v-model="inquiryForm.email"
      type="email"
      name="email"
      placeholder="Email *"
      required
    />
    <input
      id="phone"
      v-model="inquiryForm.phone"
      type="tel"
      name="phone"
      placeholder="Phone Number"
    />
    <textarea
      id="message"
      v-model="inquiryForm.message"
      name="message"
      placeholder="Message *"
      required
    />
    <p v-if="successState" class="success-state">
      Thank you for your interest! We will be in touch.
    </p>
    <p v-if="fieldsMissing" class="fields-missing">
      Please fill in required fields
    </p>
    <p v-if="errorState" class="error-state">
      There was an issue sending your message. Please try again.
    </p>
    <recaptcha />
    <button
      v-if="!successState"
      class="button"
      type="submit"
      @click="handleSubmit"
    >
      Send Inquiry
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      errorState: false,
      fieldsMissing: false,
      inquiryForm: {
        email: '',
        message: '',
        name: '',
        phone: ''
      },
      sendingForm: false,
      successState: false
    }
  },
  methods: {
    async handleSubmit() {
      const endpoint = `/.netlify/functions/mail`
      this.sendingForm = true
      const { email, message, name, phone } = this.inquiryForm
      if (!email || !message || !name) {
        this.fieldsMissing = true
        return
      } else {
        this.fieldsMissing = false
      }
      try {
        const token = await this.$recaptcha.getResponse()
        console.log('ReCaptcha token:', token)
        const formData = {
          email,
          message,
          name,
          phone,
          token
        }
        const response = await this.$axios.$post(endpoint, formData)
        if (response === 'Message sent') {
          this.successState = true
          await this.$recaptcha.reset()
          this.resetForm()
        } else {
          this.errorState = true
          await this.$recaptcha.reset()
          this.resetForm()
        }
      } catch (error) {
        console.log(error)
        this.errorState = true
      }
      this.sendingForm = false
    },
    resetForm() {
      this.inquiryForm = { email: '', message: '', name: '', phone: '' }
      setTimeout(() => {
        this.successState = false
        this.errorState = false
      }, 2500)
    }
  }
}
</script>

<style lang="scss">
.inquiry-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 760px;
  margin: 0 auto;

  @include breakpoint('tablet', max) {
    padding: 0 16px;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid $cyan;
    resize: none;
    &::placeholder {
      color: $black;
    }
  }

  .error-state,
  .fields-missing {
    color: red;
  }
}
</style>
