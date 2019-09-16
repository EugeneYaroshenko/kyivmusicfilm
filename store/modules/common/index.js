import camelCase from 'lodash/camelCase'

const requireModule = require.context(
  '.',
  true,
  /^(?!.*(actions|mutations|getters|index)).*\.js$/
)

const modules = {}

requireModule.keys().forEach((fileName) => {
  if (/\.unit\.js$/.test(fileName)) return;
  modules[camelCase(fileName.split('/')[1].replace(/(\.\/|\.js)/g, ''))] = {
    namespaced: true,
    ...requireModule(fileName).default,
    strict: process.env.NODE_ENV !== 'production'
  }
})

export default modules
