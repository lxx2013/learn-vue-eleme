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
    seller["deliveryTime"]= 38 
    seller["score"]= 4.2 
    seller["serviceScore"]= 4.1 
    seller["foodScore"]= 4.3 
    seller["rankRate"]= 69.2 
    seller["minPrice"]= 20 
    seller["deliveryPrice"]= 4 
    seller["ratingCount"]= 24 
    seller["sellCount"]= 90 
    seller["avatar"] = rst.image_path.getUrl()
    seller["big-avatar"] = rst.shop_sign.image_hash.getUrl() || seller.avatar
    seller["bulletin"] = rst.description || '暂无简介'
    //数组部分
    seller.supports = rst.activities
    seller.pics = []
    seller.infos = {'地址':rst.address,'商家电话':rst.phone.match(/\d{11}/g)[0],"品类" : "其他菜系,包子粥店",
    "营业时间":rst.opening_hours[0],}
    seller.certificate = []
    //需要修改前端的部分
    seller.latitude= rst.latitude
    seller.longitude=rst.longitude
    seller.description = '蜂鸟专送'
})()

fs.writeFileSync(__dirname+`/${NAME}.js`,"module.exports =\n "+ JSON.stringify(output,null,2))