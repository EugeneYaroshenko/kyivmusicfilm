const consola = require('consola')

exports.login = function (req, res) {
  const { username, password } = req.body

  const valid = username.length && password === 'ilovefilms'

  if (!valid) {
    res.status(400).send({ error: 'Invalid name or password' })

    return
  }

  res.sendStatus(200)
}

exports.logout = async function (req, res) {
  res.json({ status: 'OK' })
}

exports.user = async function (req, res) {
  res.status(200).send({ user: req.user })
}
