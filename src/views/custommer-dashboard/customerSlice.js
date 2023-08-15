import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  isCreateFailed: false,
  dataCustomer: [],
  dataDetailsCustomer: [],
  dataError: {}
}

const customer = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getListCustomer(state) {
      state.isLoading = true
    },
    getListCustomerFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListCustomerSuccess(state, action) {
      state.isLoading = false
      state.dataCustomer = action.payload || []
      state.isSuccess = true
    },

    getListDetailsCustomer(state) {
      state.isLoading = true
    },
    getListDetailsCustomerFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListDetailsCustomerSuccess(state, action) {
      state.isLoading = false
      state.dataDetailsCustomer = action.payload || []
      state.isSuccess = true
    },

    createCustomer(state) {
      state.isLoading = true
    },
    createCustomerFailed(state, action) {
      state.isLoading = false
      state.isCreateFailed = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    createCustomerSuccess(state, action) {
      state.isLoading = false
      state.isCreate = true
    },
    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isCreate = false
      state.isCreateFailed = false
    }
  }
})

export const customerActions = customer.actions

export const makeSelectCustomer = state => state.customer

export default customer.reducer
