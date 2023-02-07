import { login, getInfo, logout } from '@/api/bm01login/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: {},
    headImagePath: '',
    roles: [],
    // 第一次加载菜单时用到
    loadMenus: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    },
    HEAD_IMAGE_PATH: (state, headImagePath) => {
      state.headImagePath = headImagePath
    }
  },

  actions: {
    // 登录
    Login({ commit, state }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.captcha, userInfo.uuid).then(res => {
          setToken(res.token, rememberMe)
          commit('SET_TOKEN', res.token)
          setUserInfo(res.userinfo, commit)
          setHeadImagePath(commit, state)
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          commit('SET_LOAD_MENUS', true)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          setUserInfo(res, commit)
          setHeadImagePath(commit, state)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    reloadUserHeadImage({ commit, state }) {
      setHeadImagePath(commit, state)
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          logOut(commit)
          resolve()
        }).catch(error => {
          logOut(commit)
          reject(error)
        })
      })
    },

    updateLoadMenus({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', { roles: res.roles, userid: res.userid, username: res.username })
}

export const setHeadImagePath = (commit, state) => {
  commit('HEAD_IMAGE_PATH', '/api/sys/attachment/download?srcId=' + state.user.userid + '&type=USER_HEAD_IMG&isImage=true&dt=' + new Date().getTime())
}

export default user
