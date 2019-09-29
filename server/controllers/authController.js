const consola = require('consola')
const jwt = require('jsonwebtoken')

exports.login = function (req, res) {
  const { username, password } = req.body

  const valid = username.length && password === 'kyivmusicfilm'

  if (!valid) {
    res.status(400).send({ error: 'Invalid name or password' })
  }

  const accessToken = jwt.sign({ username }, 'kyiv')

  res.status(200).send({ token: accessToken })
}

exports.logout = async function (req, res) {
  res.json({ status: 'OK' })
}

exports.user = async function (req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  try {
    const decodedToken = jwt.verify(token, 'kyiv')

    if (decodedToken) {
      res.status(200).send({ user: req.user })
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
}
