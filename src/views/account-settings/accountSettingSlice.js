import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  isChangeAvatarSuccess: false,
  dataCustomer: [],

  dataError: {}
}

const accountSetting = createSlice({
  name: 'accountSetting',
  initialState,
  reducers: {
    changePassword(state) {
      state.isLoading = true
    },
    changePasswordFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    changePasswordSuccess(state, action) {
      state.isLoading = false
      state.isSuccess = true
    },
    changeAvatar(state) {
      state.isLoading = true
    },
    changeAvatarFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    changeAvatarSuccess(state, action) {
      state.isLoading = false
      state.isChangeAvatarSuccess = true
    },

    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isChangeAvatarSuccess = false
    }
  }
})

export const settingAction = accountSetting.actions

export const makeSelectSetting = state => state.setting

export default accountSetting.reducer
