/* ************************ */
/* ********工具函数********* */
/* ************************ */
String.prototype.getUrl = function () {
    if(! (this instanceof String)){
        console.log('getUrl : not String',this)
        return false
    }
    if(!this || !this.length){
        return false
    }
    var url = 'http://fuss10.elemecdn.com/' 

    //c/e2/577a8a922a46ea93d363865d146a5jpeg.jpeg?imageMogr/format/webp/thumbnail/150x/
    if(/.*(jpeg|png|jpg|bmp|gif).*/.test(this)){
        url += this[0]+'/' + this[1]+this[2]+'/'+this.slice(3)+`.${RegExp.$1}`+'?imageMogr/format/png/thumbnail/150x/'
    }
    return url
}
String.prototype.getNum = function () {
    return this.text().match(/\d+(\.\d+)?/g)[0]
}
String.prototype.randomTime = function () {
    var date = new Date(this.text())
    date = date.valueOf() + parseInt((Math.random() * 24 * 3600 * 1000))
    return date
}