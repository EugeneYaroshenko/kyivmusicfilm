const consola = require('consola')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: 'wtk1QCx2vJgYGzuJKKG8GQ9l37LBQn+c1jbaEqJhL+A',
  accessKeyId: 'FR7C7VO5O5AP74WTRQAV'
                  })

const spaceEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com')
const s3 = new aws.S3({ endpoint: spaceEndpoint })

multer({
         limits: { fieldSize: 25 * 1024 * 1024 }
       })

const uploadToSpace = multer({
                               storage: multerS3({
                                                   s3: s3,
                                                   bucket: 'kyivmusicfilmassets',
                                                   acl: 'public-read',
                                                   contentType: multerS3.AUTO_CONTENT_TYPE,
                                                   key: function (request, file, cb) {
                                                     cb(null, file.originalname)
                                                   }
                                                 })
                             }).array('photos', 1)

exports.upload = function (req, res) {
  uploadToSpace(req, res, function (error) {
    if (error) {
      consola.error(error)
      res.status(400).send({ error: 'Image was not saved' })
    }

    if (req.files && req.files[0]) {
      consola.success('File uploaded successfully.')
      res.status(200).send({ location: req.files[0].location })
    } else {
      res.status(400).send({ error: 'No file was returned' })
    }
  })
}
