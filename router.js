const Router = require('koa-router')

const router = new Router()

router
  .get('/', async (ctx) => {
    ctx.body = 'Hello World'
  })
  .post('/users', async (ctx) => {
    const { name, age, friends } = ctx.request.body
    const txn = ctx.dgraphClinet.newTxn()
    try {
      const queryRes = await txn.query(`{
        users(func: eq(name, ${name})) { uid }
      }`)
      const { users } = queryRes.getJson()
      if (users.length > 0) {
        ctx.throw(400, '用户已经存在')
      }
      const mu = new ctx.dgraph.Mutation()
      mu.setSetJson({
        uid: `_:${name}`,
        name,
        age,
        friend: friends || []
      })
      const res = await txn.mutate(mu)
      await txn.commit()
      ctx.body = {
        uid: res.getUidsMap().get(name)
      }
    } catch (err) {
      await txn.discard()
      ctx.throw(400, err)
    }
  })

module.exports = router
