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


export default{
    formatDate
}
