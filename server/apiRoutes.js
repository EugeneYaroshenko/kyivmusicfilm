const router = require('express').Router()
const filmController = require('./controllers/filmController')
const authController = require('./controllers/authController')
const googleController = require('./controllers/googleController')
const assetsController = require('./controllers/assetsController')

router.route('/films')
  .get(filmController.index)
  .post(filmController.new)

router.route('/films/:film_url')
  .get(filmController.view)

router.route('/films/:film_id')
  .post(filmController.update)
  .delete(filmController.delete)

router.route('/auth/login')
  .post(authController.login)

router.route('/auth/logout')
  .post(authController.logout)

router.route('/auth/user')
  .get(authController.user)

router.route('/data')
  .get(googleController.getData)

router.route('/upload')
  .post(assetsController.upload)

module.exports = router
