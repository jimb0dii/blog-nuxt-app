import Cookie from 'js-cookie'

export const state = () => ({
  loadedPosts: [],
  token: null
})

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts
  },
  addPost(state, post) {
    state.loadedPosts.push(post)
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      (post) => post.id === editedPost.id
    )
    state.loadedPosts[postIndex] = editedPost
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const res = await this.$axios.get(
        'https://nuxt-blog-app-99a59.firebaseio.com/posts.json'
      )
      const postsArray = []
      for (const key in res.data) {
        postsArray.push({ ...res.data[key], id: key })
      }
      return commit('setPosts', postsArray)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.response)
    }
  },
  addPost({ commit, state }, post) {
    const createdPost = {
      ...post,
      updatedDate: new Date()
    }
    return (
      this.$axios
        .post(
          `https://nuxt-blog-app-99a59.firebaseio.com/posts.json?auth=${state.token}`,
          createdPost
        )
        .then((res) => commit('addPost', { ...createdPost, id: res.data.name }))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    )
  },
  editPost({ commit, state }, editedPost) {
    return (
      this.$axios
        .put(
          `https://nuxt-blog-app-99a59.firebaseio.com/posts/${editedPost.id}.json?auth=${state.token}`,
          editedPost
        )
        .then((res) => {
          commit('editPost', editedPost)
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e))
    )
  },
  authenticateUser({ commit, dispatch }, authData) {
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.firebaseApiKey}`
    if (authData.isLogin) {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.firebaseApiKey}`
    }
    return this.$axios
      .post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then((result) => {
        localStorage.setItem('token', result.data.idToken)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + +result.data.expiresIn * 1000
        )
        Cookie.set('jwt', result.data.idToken)
        Cookie.set(
          'expirationDate',
          new Date().getTime() + +result.data.expiresIn * 1000
        )
        return this.$axios.post('http://localhost:3000/api/track-data', {
          data: 'autheticated '
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  setLogoutTimer({ commit }, duration) {
    setTimeout(() => {
      commit('clearToken')
    }, duration)
  },
  initAuth({ commit, dispatch }, request) {
    let token
    let expirationDate
    if (request) {
      if (!request.headers.cookie) {
        return true
      }
      const jwtCookie = request.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        return true
      }
      token = jwtCookie.split('=')[1]
      expirationDate = request.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expirationDate='))
        .split('=')[1]
      if (!jwtCookie) {
        return true
      }
    } else if (process.client) {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > +expirationDate || !token) {
      commit('clearToken')
      return true
    }
    commit('setToken', token)
  },
  logout({ commit }) {
    commit('clearToken')
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  isAuthenticated(state) {
    return state.token != null
  }
}
