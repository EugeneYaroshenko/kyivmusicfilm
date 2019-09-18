const router = require('express').Router()
const filmController = require('./controllers/filmController')

router.route('/films')
  .get(filmController.index)
  .post(filmController.new)

router.route('/films/:film_url')
  .get(filmController.view)

router.route('/films/:film_id')
  .post(filmController.update)
  .delete(filmController.delete)

module.exports = router
