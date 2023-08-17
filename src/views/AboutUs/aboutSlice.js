import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  dataAbout: []
}

const aboutUs = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    getListAbout(state) {
      state.isLoading = true
    },
    getListAboutFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListAboutSuccess(state, action) {
      state.isLoading = false
      state.dataAbout = action.payload || []
      state.isSuccess = true
    },

    onCreateAbout(state) {
      state.isLoading = true
    },
    onCreateAboutFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onCreateAboutSuccess(state, action) {
      state.isLoading = false
      state.isSuccess = true
    },

    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    }
  }
})

export const aboutActions = aboutUs.actions

export const makeSelectAbout = state => state.about

export default aboutUs.reducer
