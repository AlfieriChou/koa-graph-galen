const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const Router = require('koa-router')

const initializeApp = require('./lib/initializeApp')

const app = initializeApp()

const router = new Router()

router
  .get('/', async (ctx) => {
    ctx.body = 'Hello World'
  })

app
  .use(koaLogger())
  .use(koaBody({}))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
