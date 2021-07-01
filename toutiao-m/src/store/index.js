import { createStore } from 'vuex'
import { getStorage, setStorage } from '@/utils/storage'
import { USER_KEY } from '@/utils/constdata'

export default createStore({
  state: {
    user: getStorage(USER_KEY),
    cachePage: ['LayoutIndex']
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setStorage(USER_KEY, state.user)
    },
    addcachePage(state, data) {
      if (!state.cachePage.includes(data)) {
        state.cachePage.push(data)
      }
    },
    removeCachePage(state, data) {
      if (state.cachePage.indexOf(data) !== -1) {
        state.cachePage.splice(state.cachePage.indexOf(data), 1)
      }
    }

  },
  actions: {
  },
  modules: {
  }
})
