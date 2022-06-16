import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  // this is where all the data for the app is stored
  state: {
    dataFromMutations: [] 
  },
  // these are the methods that can change the data (only synchronous code)( commit mutation )
  mutations: {
    getDataFromActions(state, getDataFromDb){
      state.dataFromMutations = getDataFromDb
    }
  },
  // this can have async code once thats done we can commit a mutation in here ( dispatching )
  actions: {
    getDataFromDb({ commit }){
      axios.get('http://localhost:3000/projects')
        .then(response => {
          commit('getDataFromActions', response.data);  
        })  
    },  
  },
  // we can can get data from state
  getters: {
    
  },
  // breakup the store to modules with individual state, mutation, getters
  modules: {
  }
})

