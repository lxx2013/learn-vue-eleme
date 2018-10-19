# learn-vue-eleme

> 使用 Vue 构建饿了么点餐页面,作为练手项目,记录一下自己的学习过程  

![](http://pe7l6i61v.bkt.clouddn.com/2018-09-23%2021.27.03.gif)![](http://pe7l6i61v.bkt.clouddn.com/2018-09-23%2021.29.24.gif)![](http://pe7l6i61v.bkt.clouddn.com/2018-09-23%2021.32.27.gif)

## 涉及到的知识点

 ### 1.前端
- Vue.set() Object or Arrays - [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
- Vuex 集中数据管理
- Vue 过渡动画 [transition transition-group](https://cn.vuejs.org/v2/guide/transitions.html)
- 基于 `JSON.parse` 和 `JSON.stringify` 实现了 `saveToLocal` 和`loadFromLocal`两个函数来访问`localStorage` , 可以保存诸如收藏之类的信息
- 应用<<CSS 世界>>中学到的 **z-index不犯二** 准则
- 计算地球上两个点的距离 

> [算法](https://www.zhihu.com/question/46808125)

```js
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
```
> [为什么要使用**半正矢公式**?](https://zh.wikipedia.org/wiki/%E5%A4%A7%E5%9C%86%E8%B7%9D%E7%A6%BB)

令 ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/8bb5db7537186e1f6dfc268b6a4b746116d02292) 分别代表球面上两点的经纬度，(s代表出发点，f代表前往点)， ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/0e95dac011503403b232574195bd8bc308d7351d)是两者差的绝对值，那么两点之间的圆心角可由[球面余弦定律(人教版高二数学选修3－3)](http://jiaofu.yousi.com/compontent/pdf/?url=http://jfpdf.yousi.com/160702070606838365.pdf#page=42)所给出:

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/659f673cc78ae3ca131ced79500c5907b2ced035)

此两点间的大圆距离 d，即可根据弧长公式得出，

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/fa0661b0420275e570db90b059bd78171d492ccd)

**在两点之间的大圆距离相对球体的半径很短时，其圆心角很小，余弦函数接近于1，按照以上的反余弦函数公式会有较大的舍入误差。** 此时可使用半正矢函数的定义和两角和的余弦函数展开式求出使用半正矢函数计算大圆距离的公式。

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/4fd2774647982be79459127cccddcc6768ec4680)

这就是在航海上运用广泛的半正矢公式，历史上会将距离和半正矢函数值的关系直接制成表格，方便使用


### 2.移动端适配
- `border-1px` 通过 `scale` 实现
- 元素大小可使用 `lib-flexible` 或遵循建议使用 `vw`
- 结合`@media` 防止 iPhone 5 屏幕过窄而使得元素错位



### 3.后端
- `nuxt.js` 服务器渲染
- `koa2 koa-router koa-static` 简单服务器
- `cheerio` 获取并解析 eleme 网站数据 
- `puppeteer`
- `nginx` 端口转发 `upstream`
- `pm2` 进程守护

### 4.其它
- eslint 配置[未完成]
- hash图片来自于`"https://picsum.photos/50/50/?image=" + parseInt(1+900*Math.random())`
- 开发时使用`frp`做内网穿透 [segmentfault 链接](https://segmentfault.com/a/1190000016205654?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly)
- 正则表达式`look-forward` 金钱分割 `$`表示以此结尾
```js
"1234567890".replace(/(\d)(?=(\d{3})+$)/g,"$1,")
//1,234,567,890
"1234567890".replace(/(\d)(?=(\d{3})+)/g,"$1,")
//1,2,3,4,5,6,7,890
```
## 已知问题
1. `nuxt` 的 `keep-alive` 有问题, 如果选择了`keep-alive`会导致 `mounted` 和 `created` 函数不执行,而 data 会重新读取初始值. 我在官方目录参与的[ Issue 链接 ](https://github.com/nuxt/nuxt.js/issues/3267)
2. `nuxt` 的 `nuxt-child transition` 的`mode`有问题, 如果设置`mode:'in-out'` 或`mode:'out-in'`均和 vue 的`transition-mode`一致, 但是**无法执行那种前一个元素离开和后一个元素进入同步进行的动画** , 这个需要等待 `nuxt`改进
3. `flex-shrink 1`对`img`子元素无效(无法让超出父元素宽度的图片组缩小),目前暂以计算属性解决
```vue
<img :style="'width: '+ 100/items.length+'vw' src="" alt="">
```

## 后续可以补充的更新
1. `z-index`管理 已完成[#2](#2)
1. 把店铺数据存入`mongo`
1. 上拉加载新数据,即`mongo 分页`