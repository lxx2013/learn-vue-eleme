module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'learn-vue-eleme',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1.0,minimum-scale=1.0, user-scalable=yes'
      },
      {
        hid: 'description',
        name: 'description',
        content: '使用 Vue 构建饿了么点餐页面'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/CO.png'
    }]
  },
  css: [
    '~assets/style.css'
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
