export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
    }
    let o = {
        'M+':(date.getMonth()+1)+'',
        'd+':date.getDate()+'',
        'h+':date.getHours()+'',
        'm+':date.getSeconds()+''
    }
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            fmt = fmt.replace(RegExp.$1,(o[k].length!=1 ? o[k] : '0'+o[k]));
        }
    }
    return fmt;
}

export function calculateDistance(lat1, lng1, lat2, lng2) { //latitude //langitude
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
};

// 作者：LexHu
// 链接：https://www.zhihu.com/question/46808125/answer/145571739
// 来源：知乎
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

export default{
    formatDate,
    calculateDistance
}
