import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  dataAbout: []
}

const pageList = createSlice({
  name: 'pageList',
  initialState,
  reducers: {
    getListPage(state) {
      state.isLoading = true
    },
    getListPageFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListPageSuccess(state, action) {
      state.isLoading = false
      state.dataAbout = action.payload || []
      state.isSuccess = true
    },

    onCreatePage(state) {
      state.isLoading = true
    },
    onCreatePageFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onCreatePageSuccess(state, action) {
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

export const pageListActions = pageList.actions

export const makeSelectPageList = state => state.page

export default pageList.reducer
