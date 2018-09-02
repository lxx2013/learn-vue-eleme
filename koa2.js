const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const serve = require('koa-static')
const appData = require('./static/data.js')

var router = new Router()
router.get('/', ctx => {
    console.log(ctx.request)
    console.log(`path${ctx.request.path}`)
    if (ctx.request.accepts('html')) {
        ctx.response.type = 'text/html'
        ctx.response.body = "<img src = '/static/touma2.jpg'>"
    }
})
router.get('/api/seller',(ctx)=>{
  ctx.body = appData.seller
})
router.get('/api/goods',(ctx)=>{
  ctx.body = appData.goods
})
router.get('/api/ratings',(ctx)=>{
  ctx.body = appData.ratings
})
app.use(async function (ctx,next) {
  ctx.res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve(__dirname))
app.listen(8101)