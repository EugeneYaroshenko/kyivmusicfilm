const consola = require('consola')
const Film = require('../models/filmModel')

exports.index = async function (req, res) {
  consola.info('here')
  try {
    const films = await Film.find({})

    consola.success(`films were retrieved successfully`)
    consola.info(films)
    return res.status(200).send({ data: films })
  } catch (err) {
    consola.error(`$error retrieving films: ${err}`)
    return res.status(400).send({ error: err })
  }
}

exports.new = async function (req, res) {
  try {
    const film = new Film()
    film.general = req.body.general
    film.showings = req.body.showings

    const savedFilm = await film.save()

    consola.success(`film with id ${req.params.film_id} was created successfully`)
    return res.status(200).send({ data: savedFilm })
  } catch (err) {
    consola.error(`error saving new film: ${err}`)
    return res.status(400).send({ error: err })
  }
}

exports.update = async function (req, res) {
  try {
    const film = await Film.findById(req.params.film_id)

    if (film) {
      film.general = req.body.general
      film.showing = req.body.showings

      const updatedFilm = await film.save()

      consola.success(`film with id ${req.params.film_id} was updated successfully`)
      return res.status(200).send({ data: updatedFilm })
    } else {
      throw new Error(`Film with id ${req.params.film_id} could not be found`)
    }
  } catch (err) {
    consola.error(`error updating film: ${err}`)
    return res.status(400).send({ error: err })
  }
}

exports.delete = async function (req, res) {
  try {
    const removedFilm = await Film.remove({ _id: req.params.film_id })

    consola.success(`film with id ${req.params.film_id} was removed successfully`)
    return res.status(200).send({ data: removedFilm })
  } catch (err) {
    consola.error(`error removing film: ${err}`)
    return res.status(400).send({ error: err })
  }
}
