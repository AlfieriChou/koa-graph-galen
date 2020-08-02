const Koa = require('koa')
const dgraph = require('dgraph-js')
const grpc = require('grpc')

const app = new Koa()

const clientStub = new dgraph.DgraphClientStub(
  'localhost:9080',
  grpc.credentials.createInsecure()
)

const schema = `
  test_age: int @index(int) .
  test_name: string @index(term) .
  test_friend: [uid] .
`

const op = new dgraph.Operation()
op.setSchema(schema)
op.setRunInBackground(true)

module.exports = () => {
  // extend context dgraph and migrate
  app.context.dgraph = new dgraph.DgraphClient(clientStub)
  app.context.dgraph.alter(op)
  return app
}
