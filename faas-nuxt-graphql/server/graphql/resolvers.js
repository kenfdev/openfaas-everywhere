const axios = require('axios')

const GATEWAY_URL = process.env.GATEWAY_URL

const resolvers = {
  Query: {
    nodejs: async (obj, args, context, info) => {
      let query = ''
      if (args.year) {
        query += `?year=${args.year}`
      }
      const result = await axios.get(
        `${GATEWAY_URL}/function/faas-nodejs${query}`
      )
      return result.data
    },
    go: async (obj, args, context, info) => {
      let query = ''
      if (args.year) {
        query += `?year=${args.year}`
      }
      const result = await axios.get(`${GATEWAY_URL}/function/faas-go${query}`)
      return result.data
    },
    python: async (obj, args, context, info) => {
      let query = ''
      if (args.year) {
        query += `?year=${args.year}`
      }
      const result = await axios.get(
        `${GATEWAY_URL}/function/faas-python${query}`
      )
      return result.data
    },
    ruby: async (obj, args, context, info) => {
      let query = ''
      if (args.year) {
        query += `?year=${args.year}`
      }
      const result = await axios.get(
        `${GATEWAY_URL}/function/faas-ruby${query}`
      )
      return result.data
    },
    csharp: async (obj, args, context, info) => {
      let query = ''
      if (args.year) {
        query += `?year=${args.year}`
      }
      const result = await axios.get(
        `${GATEWAY_URL}/function/faas-csharp${query}`
      )
      return result.data
    },
    php: async (obj, args, context, info) => {
      let query = ''
      if (args.year) {
        query += `?year=${args.year}`
      }
      const result = await axios.get(`${GATEWAY_URL}/function/faas-php${query}`)
      return result.data
    }
  } // Query
}

module.exports = { resolvers }
