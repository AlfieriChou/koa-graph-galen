const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')

const initializeApp = require('./lib/initializeApp')
const router = require('./router')

const app = initializeApp()

app
  .use(koaLogger())
  .use(koaBody({}))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
