import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
var store = () => new Vuex.Store({
  state: {
    globalBlur: false,
    detailShow:false,
    restaurants:{},
    selectedFoods:{}
  },
  getters:{},
  mutations: {
    toggle_globalBlur(state) {
      state.globalBlur = !state.globalBlur
    },
    toggle_detailShow(state) {
      state.detailShow = !state.detailShow
    },
    update(state,{name1,name2,o}){
      //console.log(arguments)
      //console.log(name1,name2,o)
      if(!state.restaurants[name1]){
        state.restaurants[name1] = {};
      }
      state.restaurants[name1][name2] = o;
    },
    food(state,food){
      state.selectedFoods[food.name] = food
    }
  },
  actions: {},

})



export default store
