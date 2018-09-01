const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const serve = require('koa-static')

var router = new Router()
router.get('/', ctx => {
    console.log(ctx.request)
    console.log(`path${ctx.request.path}`)
    if (ctx.request.accepts('html')) {
        ctx.response.type = 'text/html'
        ctx.response.body = "<img src = '/static/touma2.jpg'>"
    }
})
router.get('/api/food',(ctx)=>{
  ctx.body = {food1:'food1',food2:'food2'}
})
app.use(async function (ctx,next) {
  ctx.res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
  await next()
})
app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve(__dirname))
app.listen(3000)