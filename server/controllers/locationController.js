const consola = require('consola')
const axios = require('axios')

exports.location = async function (req, res) {

  try {
    const geolocationAPI = 'https://geoip-db.com/json/'

    const result = await axios.get(geolocationAPI)
    consola.info('here', result.data)

    res.status(200).send({ geoLocation: result.data })
  } catch (e) {
    consola.info(e)
    res.status(400).send({ error: e })
  }
}
