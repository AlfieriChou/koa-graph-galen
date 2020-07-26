const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const Router = require('koa-router')
const dgraph = require('dgraph-js')
const grpc = require('grpc')

const app = new Koa()
const router = new Router()
const clientStub = new dgraph.DgraphClientStub(
  'localhost:9080',
  grpc.credentials.createInsecure()
)

router
  .get('/', (ctx) => {
    ctx.body = 'Hello World'
  })

app.context.dgraph = new dgraph.DgraphClient(clientStub)

app
  .use(koaLogger())
  .use(koaBody({}))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
