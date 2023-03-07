// For requests made with an access token, Sanity will return
// the published version of a document first followed by a draft version.
// This function selects the draft version if it exists/we are making
// an authenticated request, or else defaults to the published one.

export default results => {
  if (!results) return null
  return results.length > 1 ? results[1] : results[0]
}
