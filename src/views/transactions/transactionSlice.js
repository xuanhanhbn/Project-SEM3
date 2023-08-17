import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isCreate: false,
  isError: false,
  dataTransaction: [],
  dataError: {}
}

const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getListTransaction(state) {
      state.isLoading = true
    },
    getListTransactionFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListTransactionSuccess(state, action) {
      state.isLoading = false
      state.dataTransaction = action.payload || []
      state.isSuccess = true
    },
    createTransaction(state) {
      state.isLoading = true
    },
    createTransactionFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    createTransactionSuccess(state, action) {
      state.isLoading = false
      state.isCreate = true
    },
    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isCreate = false
    }
  }
})

export const transactionActions = transaction.actions

export const makeSelectTransaction = state => state.transaction

export default transaction.reducer
