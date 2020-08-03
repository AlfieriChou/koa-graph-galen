const Koa = require('koa')
const dgraph = require('dgraph-js')
const grpc = require('grpc')

const app = new Koa()

const clientStub = new dgraph.DgraphClientStub(
  'localhost:9080',
  grpc.credentials.createInsecure()
)

const schema = `
  age: int @index(int) .
  name: string @index(term) .
  friend: [uid] @reverse .
`

const op = new dgraph.Operation()
op.setSchema(schema)
op.setRunInBackground(true)

module.exports = () => {
  // extend context dgraph and migrate
  app.context.dgraph = dgraph
  app.context.dgraphClinet = new dgraph.DgraphClient(clientStub)
  app.context.dgraphClinet.alter(op)
  return app
}
