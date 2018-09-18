const rn = 'chuanjiaochufang' //restaunrant_name
//配置部分结束*/
//营业资质图片还是手动吧, eleme 很严格
//***********/

var fs = require('fs')
var html = fs.readFileSync(__dirname + `/html/${rn}.html`, 'utf-8')
var cheerio = require('cheerio');
var $ = cheerio.load(html);

/* ************************ */
/* ********工具函数********* */
/* ************************ */
cheerio.prototype.getUrl = function () {
    var url ;
    var obj = this
    if (obj.attr('src')) {
        url = obj.attr('src').replace('//', 'http://')
    }
    else if (/.*url\(("|&quot;)(.*)("|&quot;)\).*/.test($.html(obj))) {
        url =  RegExp.$2.replace('//', 'http://')
    }
    else {
        console.log('getUrl failed. The obj is:\n', $.html(obj))
    }
    return url.replace('webp','png')
}
cheerio.prototype.getNum = function () {
    return this.text().match(/\d+(\.\d+)?/g)[0]
}
cheerio.prototype.randomTime = function () {
    var date = new Date(this.text())
    date = date.valueOf() + parseInt((Math.random() * 24 * 3600 * 1000))
    return date
}
cheerio.prototype.trimText = function () {
    return this.text().replace(/\s/g,'')
}

/* ************************ */
/* ********程序开始********* */
/* ************************ */
var output = { seller: {}, goods: [], ratings: [] }
//保留 certificate 信息
try {
    var input = require(__dirname + `/${rn}.js`)
    output.seller.certificate = input.seller.certificate
}
catch (err) {
    console.log(`No ${rn}.js file `, err)
}
//第1步:解析seller
var seller = output.seller
    ; (function seller_sth() {
        var div = $('div[class^="app"]>div>div')
        seller["big-avatar"] = div.find('nav').getUrl()
        seller["avatar"] = div.find('div>div>img').getUrl()
        div = div.find('div>div:nth-of-type(2)')
        seller["name"] = div.find('h2 span:nth-of-type(1)').text();
        seller["description"] = "蜂鸟专送"
        seller["deliveryTime"] = div.find('>div span:nth-of-type(3) span').getNum();
        seller["score"] = div.find('>div span:nth-of-type(1)').getNum();
        seller["serviceScore"] = $('section[class^="overview"]>div:nth-of-type(2)').text().match(/\d+(\.\d+)?/g)[1];
        seller["foodScore"] = $('section[class^="overview"] >div:nth-of-type(2)').getNum();
        seller["rankRate"] = "99"
        seller["minPrice"] = $('a[class^="submit-btn"]').getNum();
        seller["deliveryPrice"] = $('p[class^="bottomNav-cartdelivery"]').getNum();
        seller["sellCount"] = div.find('>div span:nth-of-type(2)').getNum()
    })()
    ; (function supports() {
        var activities = $('.shop-info .section:nth-of-type(3) >div>div')
        var supports = [{
            "type": 4,
            "description": "已加入“外卖保”计划,食品安全保障"
        },]
        var diffs = []
        activities.each(function () {
            let support = {}
            let text = $(this).find('>span').eq(0).text()
            if (/.*满减.*/.test(text)) {
                support.type = 0
            }
            else if (/.*折扣.*/.test(text)) {
                support.type = 1
            }
            else if (/.*特价.*/.test(text)) {
                support.type = 2
            }
            else if (/.*票.*/.test(text)) {
                support.type = 3
            }
            else if (/.*首单.*/.test(text)) {
                support.type = 5
            }
            support.description = $(this).find('>span').eq(1).text().trim()
            if (diffs.indexOf(support.description) == -1) {
                supports.push(support)
                diffs.push(support.description)
            }
        })
        seller.supports = supports
    })()

    ; (function pic_infos() {
        var pics = []
        $('.shop-info >.section:nth-of-type(4) a').each(function () {
            pics.push($(this).find('img').getUrl())
        })
        seller.pics = pics

        var infos = {}
        $('.shop-info >div section:nth-of-type(1) li').each(function (i) {
            if (i == 0) {
                seller.bulletin = $(this).text()
            }
            else {
                let lists = [' ', '品类', '商家电话', '地址', '营业时间']
                infos[lists[i]] = $(this).find('span').eq(1).text().trim()
            }
        })
        console.log(infos)
        seller.infos = infos
    })()



    //第2步,解析 goods
    //第3步,解析 ratings
    ; (function ratings() {
        var ratings = []
        var lis = $('section[class^="overview"]+div>ul:nth-of-type(2)>li')
        lis.each(function () {
            var rate = {}
            var t = $(this)
            rate.username = t.find('h3').text()
            rate["avatar"] = "http://7xr4g8.com1.z0.glb.clouddn.com/"
            rate["rateTime"] = t.find('small').randomTime()
            rate["deliveryTime"] = (Math.random() * (seller.deliveryTime-7) * 2+14).toFixed(0),
            rate["score"]=  (()=>{
                var span = t.find('div[class^="Rating-wrapper"]+span').text()
                if(/超赞/.test(span)){
                    return 5
                }
                else if(/满意/.test(span)){
                    return 4
                }
                else if(/一般/.test(span)){
                    return 3
                }
                else if(/吐槽/.test(span)){
                    return 1
                }
                else if(/较差/.test(span)){
                    return 2
                }
                else{
                    return 5
                }
            })()
            rate["rateType"] = rate.score>=2.5? 0:1;
            for (var j of [3,4,5]) {
                var i = t.find(`div div:nth-of-type(2)>div[class^="comment-block"]:nth-of-type(${j})`)
                if(/.*span.*/.test(i.html())){
                    var recommend = []
                    i.find('span').each(function(){
                        recommend.push($(this).trimText())
                    })
                    rate.recommend = recommend
                }
                else if(/.*商家回复.*/.test(i.text())){
                    rate["reply"] = i.trimText()
                }
                else if(!rate.text){
                    rate["text"] = i.trimText()
                }
            }

            ratings.push(rate)
        })

        output.ratings = ratings
    })()


//倒数第1步,手动输入营业资质链接

//最后一步, 数据输出为文件
fs.writeFileSync(__dirname + `/${rn}.js`, 'module.exports=' + JSON.stringify(output, null, 2), 'utf-8')

