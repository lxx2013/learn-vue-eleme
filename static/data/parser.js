//该文件把从 batch_shop拿到的 json 数据转化为前端需要的数据格式,存在 static/data 目录中,目前格式为*.js 后期要存入 mongo 
const NAME = 'yangguofu'
const fs = require('fs')
const utils = require('./utils') //修改 string

const input = JSON.parse(fs.readFileSync(__dirname+`/json/${NAME}.json`))
var output = { seller: {}, goods: [], ratings: [] }

//seller 部分
;( function (){
    var seller = output.seller , rst = input.rst
    seller.name = rst.name
    seller.distance = rst.distance
    seller["deliveryTime"]= rst.order_lead_time
    seller["score"]= rst.rating 
    seller["serviceScore"]= 4.1 
    seller["foodScore"]= 4.3 
    seller["rankRate"]= (69.2+parseFloat((Math.random()*5))).toFixed(1)
    seller["minPrice"]= rst.float_minimum_order_amount
    seller["deliveryPrice"]= rst.float_delivery_fee
    seller["ratingCount"]= rst.rating_count
    seller["sellCount"]= rst.recent_order_num
    seller["avatar"] = rst.image_path.getUrl()
    seller["big-avatar"] = rst.shop_sign.image_hash.getUrl() || seller.avatar
    seller["bulletin"] = rst.description || '暂无简介'
    seller["koubei-recommend"] = rst.is_premium
    //数组部分
    seller.activities = [...new Set(rst.activities.map(x =>{
        return {icon_name:x.icon_name,description:x.description,icon_color:x.icon_color}
    }))]
    seller.activities.push(
        {
          "icon_name": "发票",
          "description": "该商家支持发票,请下单写好发票抬头",
          "icon_color": "920783"
        },
        {
          "icon_name": "保险",
          "description": "已加入“外卖保”计划,食品安全保障",
          "icon_color": "00cc99"
        },
    )
    seller.pics = rst.albums.map(x=>x.cover_image_hash.getUrl())
    seller.infos = {'地址':rst.address,'商家电话':rst.phone.match(/\d{11}/g)[0],"品类" : "其他菜系,包子粥店",
    "营业时间":rst.opening_hours[0],}
    seller.certificate = []
    //需要修改前端的部分
    seller.latitude= rst.latitude || 30.602098
    seller.longitude=rst.longitude || 114.509348
    seller.description = '蜂鸟专送'

    //保留 certificate 信息
    try {
        var input_cer = require(__dirname + `/${NAME}.js`)
        output.seller.certificate = input_cer.seller.certificate
    }
    catch (err) {
        console.log(`No ${rn}.js file `, err)
    }
})()

//ratings 部分
;(function (){
    var or = output.ratings , ir=input.ratings
    for(let i of ir){
        var r = {}
        r.username = i.username
        r.rateTime = (new Date(i.rated_at)).valueOf()+parseInt((Math.random() * 24 * 3600 * 1000))
        r.text = i.rating_text
        r.reply = i.reply
        r.avatar = i.avatar?i.avatar.getUrl():'http://7xr4g8.com1.z0.glb.clouddn.com/'
        r.score = i.rating
        r.rateType = i.rating>3.5?0:1
        r.deliveryTime = (Math.random() * (output.seller.deliveryTime-7) * 2+14).toFixed(0)
        r.recommend = i.food_ratings.filter(x=>x.rating==5).map(x => x.rate_name)
        or.push(r)
    }
})()

//goods 部分
;(function(){
    output.goods = input.menu
})()

fs.writeFileSync(__dirname+`/${NAME}.js`,"module.exports =\n "+ JSON.stringify(output,null,2))