import { createSlice } from '@reduxjs/toolkit'
import { CalendarMultiple } from 'mdi-material-ui'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isLogin: false,
  dataLogin: [],
  dataError: {},
  dataUser: {}
}

const login = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    loginPage(state) {
      state.isLoading = true
    },
    loginPageFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    loginPageSuccess(state, action) {
      state.isLoading = false
      state.dataLogin = action.payload || []
      state.isLogin = true
    },
    userInfo(state) {
      state.isLoading = true
    },
    userInfoFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    userInfoSuccess(state, action) {
      state.isLoading = false
      state.dataUser = action.payload || {}
      state.isSuccess = true
    },
    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isLogin = false
    },
    cleanup(state) {
      state.dataUser = {}
    }
  }
})

export const loginPageActions = login.actions

export const makeSelectLogin = state => state.login

export default login.reducer
