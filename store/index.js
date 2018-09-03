import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
var store = () => new Vuex.Store({
  state: {
    globalBlur: false,
    detailShow:false
  },
  getters:{},
  mutations: {
    toggle_globalBlur(state) {
      state.globalBlur = !state.globalBlur
    },
    toggle_detailShow(state) {
      state.detailShow = !state.detailShow
    }
  },
  actions: {},

})



export default store
