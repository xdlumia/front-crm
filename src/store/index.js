import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** 状态定义 */
let state = {
    /**当前系统端类型，b或者c */
    currentSystemTarget:'c',
}

let mutations = {
    setCurrentSystemTarget(state,data){
        state.currentSystemTarget=data;
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    strict: true
})

export default store
