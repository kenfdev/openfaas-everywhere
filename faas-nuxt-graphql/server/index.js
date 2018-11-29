const fs = require('fs')
fs.closeSync(fs.openSync('/tmp/.lock', 'w'))

const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')

const bodyParser = require('body-parser')
const { schema } = require('./graphql/schema')

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

app.set('port', port)

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
