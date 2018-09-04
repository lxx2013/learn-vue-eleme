const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const serve = require('koa-static')
const appData = require('./static/dami.js')

var router = new Router()
router.get('/', ctx => {
    console.log(ctx.request)
    console.log(`path${ctx.request.path}`)
    if (ctx.request.accepts('html')) {
        ctx.response.type = 'text/html'
        ctx.response.body = "<img src = '/static/touma2.jpg'>"
    }
})
router.get('/api/seller/:restaurant',(ctx)=>{
  ctx.body = require(`./static/${ctx.params.restaurant}`).seller
})
router.get('/api/goods/:restaurant',(ctx)=>{
  ctx.body = require(`./static/${ctx.params.restaurant}`).goods
})
router.get('/api/ratings/:restaurant',(ctx)=>{
  ctx.body = require(`./static/${ctx.params.restaurant}`).ratings
})
app.use(async function (ctx,next) {
  ctx.res.setHeader("Access-Control-Allow-Origin", "*")
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve(__dirname))
app.listen(8101)