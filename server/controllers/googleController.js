const consola = require('consola')
const { google } = require('googleapis')
const fs = require('fs')
const Promise = require('bluebird')

const CLIENT_ID = '891338467923-6q433mlbhs6l2qm489tgbfm3686far95.apps.googleusercontent.com'
const CLIENT_SECRET = '2eueq-DkGQxRjHzGAhU4fOqD'
const REDIRECT_URIS = ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost']
const TOKEN_PATH = './server/token.json'

const readFile = Promise.promisify(fs.readFile)

const authorizeGoogleAPIUser = function () {
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS[0]);

  return readFile(TOKEN_PATH).then((token) => {
    oAuth2Client.setCredentials(JSON.parse(token))

    return Promise.resolve(oAuth2Client)
  }).catch((error) => {
    return consola.info('Error while authorizing user: ', error)
  })
}

const getCinemasForLocation = function (getValuesAsync, locationName) {
  return getValuesAsync(
    {
      spreadsheetId: '1VxlW5N2EQ3x0XaHqTwQnheY58fAlfqoUtcNy_nYj9Bo',
      range: `${locationName}!A2:Z`,
      majorDimension: 'ROWS'
    }
  ).then((result) => {
    const rows = result.data.values

    if (rows && rows.length) {
      const cinemas = rows.map(row => {
        return {
          name: row[0],
          position: {
            lat: +row[1],
            lng: +row[2]
          },
          address: row[3]
        }
      })

      return [{
        location: locationName,
        cinema_array: cinemas
      }]
    } else {
      return [{}]
    }
  }).catch((error) => {
    consola.info('The API returned an error: ', error)
  })
}

exports.getData = function (req, res) {
  return authorizeGoogleAPIUser().then((auth) => {
    const sheets = google.sheets({ version: 'v4', auth })
    const getValuesAsync = Promise.promisify(sheets.spreadsheets.values.get.bind(sheets))

    return getValuesAsync(
      {
        spreadsheetId: '1VxlW5N2EQ3x0XaHqTwQnheY58fAlfqoUtcNy_nYj9Bo',
        range: 'Locations!A2:Z',
        majorDimension: 'ROWS'
      }
    ).then((result) => {
      const rows = result.data.values

      if (rows.length) {
        let allPromises = []
        let allLocations = []
        let allCinemas = []


        rows.forEach(row => {
          const city = {
            name: row[0].toLowerCase(),
            UI_NAME: row[1],
            position: {
              lat: +row[2],
              lng: +row[3]
            }
          }
          allLocations.push(city)

          allPromises.push(getCinemasForLocation(getValuesAsync, city.name).then((cinemas) => {
            allCinemas = [...allCinemas, ...cinemas]
          }))
        })

        Promise.all(allPromises).then(() => {
          return res.status(200).send({ locations: allLocations, cinemas: allCinemas })
        })
      }
    }).catch((error) => {
      consola.info('The API returned an error: ', error)
      return res.status(400).send({ error: error })
    })
  })
}
