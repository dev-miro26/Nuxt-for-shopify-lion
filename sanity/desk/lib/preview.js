export default document => {
  const baseUrl = 'https://artlife-bean.netlify.app/'
  const isHome = document._type === 'homePage'
  const isAbout = document._type === 'aboutPage'
  const isConsignment = document._type === 'consignmentPage'
  const isArtistsPage = document._type === 'artistsPage'
  const isCurrentExhibitions = document._type === 'exhibitionsPageCurrent'
  const isPastExhibitions = document._type === 'exhibitionsPagePast'
  const isUpcomingExhibitions = document._type === 'exhibitionsPageUpcoming'
  const isArtist = document._type === 'artist' && document.category === 'artist'
  const isExhibition = document._type === 'exhibition'
  const isLocation = document._type === 'location'
  const isNews = document._type === 'news'
  const isPdf = document._type === 'pdf'
  const isShopCollection = document._type === 'shopCollection'
  const isTextPage = document._type === 'textPage'

  // Home page
  if (isHome) {
    return baseUrl
  }

  // About page
  if (isAbout) {
    return baseUrl + 'about'
  }

  //Consigment page
  if (isConsignment) {
    return baseUrl + 'sell'
  }

  // Artists page
  if (isArtistsPage) {
    return baseUrl + 'artists'
  }

  // Artist page
  if (isArtist && document.slug.current) {
    return baseUrl + `artists/${document.slug.current}`
  }

  // Current Exhibitions page
  if (isCurrentExhibitions) {
    return baseUrl + 'exhibitions/current'
  }

  // Past Exhibitions page
  if (isPastExhibitions) {
    return baseUrl + 'exhibitions/past'
  }
  // Upcoming Exhibitions page
  if (isUpcomingExhibitions) {
    return baseUrl + 'exhibitions/upcoming'
  }

  // Exhibition page
  if (isExhibition && document.slug.current) {
    return baseUrl + `exhibitions/${document.slug.current}`
  }

  // Location page
  if (isLocation && document.slug.current) {
    return baseUrl + `about/locations/${document.slug.current}`
  }

  // News page
  if (isNews) {
    return baseUrl + 'news'
  }

  // News article
  if (isNews && document.slug.current) {
    return baseUrl + `news/${document.slug.current}`
  }

  // PDF page
  if (isPdf && document.slug.current) {
    return baseUrl + `pdf/${document.slug.current}`
  }

  // Shop Collection page
  if (isShopCollection && document.handle) {
    return baseUrl + `shop/${document.handle}`
  }

  // Text page
  if (isTextPage && document.slug.current) {
    return baseUrl + `${document.slug.current}`
  }
}
