const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = express()
const apiRoutes = require('./apiRoutes')
const mongoose = require('mongoose')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/api', apiRoutes)
  app.use(nuxt.render)


  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', { useNewUrlParser: true })

  const db = mongoose.connection

  if (!db) {
    consola.info('Error connecting db')
  } else {
    console.info('Db connected successfully')
  }

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
