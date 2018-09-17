const rn = 'damixiansheng' //restaunrant_name
//配置部分结束*/
//***********/

var fs = require('fs')
var html  = fs.readFileSync(__dirname+`/html/${rn}.html`,'utf-8')

var cheerio=require('cheerio');
var $=cheerio.load(html);
var output = {seller:{},goods:{},ratings:{}}

//第1步:解析seller
var seller = output.seller

var activities = $('.shop-info .section:nth-of-type(3) >div>div')
var supports = [{
  "type": 4,
  "description": "已加入“外卖保”计划,食品安全保障"
},]
var diffs = []
activities.each(function(){
    let support ={}
    let text = $(this).find('>span').eq(0).text()
    if(/.*满减.*/.test(text)){
        support.type=0
    }
    else if(/.*折扣.*/.test(text)){
        support.type=1
    }
    else if(/.*特价.*/.test(text)){
        support.type=2
    }
    else if(/.*票.*/.test(text)){
        support.type=3
    }
    else if(/.*首单.*/.test(text)){
        support.type=5
    }
    support.description = $(this).find('>span').eq(1).text().trim()
    if(diffs.indexOf(support.description) == -1){
        supports.push(support)
        diffs.push(support.description)
    }
})
seller.supports = supports

var pics = []
$('.shop-info >.section:nth-of-type(4) a').each(function(){
    pics.push($(this).find('img').attr('src').replace('//','http://'))
})
seller.pics = pics

var infos = {}
$('.shop-info >div section:nth-of-type(1) li').each(function(i){
    if(i==0){
        seller.bulletin = $(this).text()
    }
    else{
        let lists = [' ','品类','商家电话','地址','营业时间']
        infos[lists[i]] = $(this).find('span').eq(1).text().trim()
    }
})
console.log(infos)
seller.infos = infos


//第2步,解析 goods
//第3步,解析 ratings

//倒数第1步,爬取营业资质链接

//最后一步, 数据输出为文件
fs.writeFileSync(__dirname+`/${rn}.js`,'module.exports='+JSON.stringify(output,null,2),'utf-8')


