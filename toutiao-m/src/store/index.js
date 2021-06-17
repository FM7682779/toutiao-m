import { createStore } from 'vuex'
import { getStorage, setStorage } from '@/utils/storage'
import { USER_KEY } from '@/utils/constdata'

export default createStore({
  state: {
    user: getStorage(USER_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setStorage(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
