# learn-vue-eleme

> 使用 Vue 构建饿了么点餐页面

## 涉及到的知识点

 ### 1.前端
- Vue.set() Object or Arrays - [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
- Vuex 集中数据管理
- Vue 过渡动画 [transition transition-group](https://cn.vuejs.org/v2/guide/transitions.html)

### 2.移动端适配
- `border-1px` 通过 `scale` 实现
- 元素大小可使用 `lib-flexible` 或遵循建议使用 `vw`
- 结合`@media` 防止 iPhone 5 屏幕过窄而使得元素错位

### 3.后端
- `nuxt.js` 服务器渲染
- `koa2 koa-router koa-static` 简单服务器
- `nginx` 端口转发 `upstream`
- `pm2` 进程守护

### 4.其它
- eslint 配置[未完成]
- 随机图片来自于`"http://7xr4g8.com1.z0.glb.clouddn.com/" + parseInt(1+900*Math.random())`
