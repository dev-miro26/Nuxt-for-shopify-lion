<template>
  <div
    class="ctct-inline-form"
    data-form-id="3b99414b-2f59-4ae6-a56d-03288ba8db9f"
  ></div>
</template>

<script>
export default {
  name: 'EmailCapture',
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        hid: 'constant-contact',
        src:
          '//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js',
        defer: true,
        async: true
      },
      {
        hid: 'constant-contact-2',
        innerHTML: `
        var _ctct_m = '54ce8b0b0130d6752cb599fdbde7c9ca'
      `,
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ]
  }
}
</script>

<style lang="scss">
div.ctct-form-embed div.ctct-form-defaults p.ctct-gdpr-text {
  display: none;
}
</style>
