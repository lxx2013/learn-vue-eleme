import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
var store = () => new Vuex.Store({
  state: {
    globalBlur: false,
    detailShow:false,
    restaurants:{},
    selectedFoods:{},
    cartJump:false
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
      Vue.set(state.selectedFoods,food.name,food)
    },
    cartClear(state){
      state.selectedFoods={}
    },
    cartJump(state,t){
      t= t | 500
      state.cartJump = true;
      setTimeout(()=>state.cartJump=false,t);
    }
  },
  actions: {},

})



export default store
