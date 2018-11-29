const { makeExecutableSchema } = require('graphql-tools')
const { resolvers } = require('./resolvers')

const typeDefs = `
    type LangStats {
        language: String!
        count: Int!
        logoUrl: String!
    }
    type Query {
        nodejs(year: Int): LangStats
        go(year: Int): LangStats
        python(year: Int): LangStats
        ruby(year: Int): LangStats
        csharp(year: Int): LangStats
        php(year: Int): LangStats
    }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = {
  schema
}
