export default () => {
  ;(function () {
    var d = document
    var s = d.createElement('script')

    s.src = `https://code.tidio.co/${process.env.TIDIO_API_KEY}.js`
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)
  })()
}
