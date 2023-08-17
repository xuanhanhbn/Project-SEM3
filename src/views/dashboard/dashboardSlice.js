import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  dataDashBoard: [],
  urlImage: '',

  dataError: {}
}

const dasboard = createSlice({
  name: 'dasboard',
  initialState,
  reducers: {
    getListDashBoard(state) {
      state.isLoading = true
    },
    getListDashBoardFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListDashBoardSuccess(state, action) {
      state.isLoading = false
      state.dataDashBoard = action.payload || []
      state.isSuccess = true
    },

    getUrlImage(state) {
      state.isLoading = true
    },
    getUrlImageFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getUrlImageSuccess(state, action) {
      state.isLoading = false
      state.urlImage = action.payload || ''
      state.isSuccess = true
    },
    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    }
  }
})

export const dashboardActions = dasboard.actions

export const makeSelectDashBoard = state => state.dashboard

export default dasboard.reducer
