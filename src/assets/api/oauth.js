/* OAuth
 * Contains Google API calls to OAuth2 via the Google API
 */
// TODO: export some of this crap for external use
import { google } from 'googleapis'
import { data } from './project_data.js'

let OAuth2 = google.auth.OAuth2

let oauthClient = new OAuth2(
  data.CLIENT_ID,
  data.CLIENT_SECRET,
  data.REDIRECT_URL
)

// Convert this to an array if using more than one set of APIs
let scopes = 'https://www.googleapis.com/auth/calendar'

let url = oauthClient.generateAuthUrl({
  // Just being specific- this is the default access type
  // This can also be 'offline', which generates a refresh token
  access_type: 'online',

  // Accepts both string and array variables
  // Modify the scopes variable above as needed
  scope: scopes

  // Optional property to pass state parameters to the redirect URL if necessary
  // May not be using this yet
  //state: {}
})

export { oauthClient, url }