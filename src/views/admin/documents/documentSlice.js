import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  dataDocument: [],
  dataError: {}
}

const document = createSlice({
  name: 'document',
  initialState,
  reducers: {
    getListDocuments(state) {
      state.isLoading = true
    },
    getListDocumentsFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListDocumentsSuccess(state, action) {
      state.isLoading = false
      state.dataDocument = action.payload || []
      state.isSuccess = true
    },

    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    }
  }
})

export const documentActions = document.actions

export const makeSelectDocument = state => state.document

export default document.reducer
