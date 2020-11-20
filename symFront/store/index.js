import axios from 'axios'
import Cookies from 'js-cookie'

export const state = () => ({
  tracks: []
})

export const mutations = {
  SET_TRACKS: (state, payload) => {
    state.tracks = payload
  }
}

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },
  loggedInUser (state) {
    return state.auth.user
  },
  isAdmin (state){
    if(state.auth.user){
      return state.auth.user.isAdmin
    }
    
  }
}

export const actions = {
}
