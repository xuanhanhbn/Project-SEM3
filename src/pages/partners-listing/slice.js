import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isRemove: false,
  isError: false,
  isCreate: false,
  isUploadImage: false,
  dataList: [],
  dataImage: {}
}

const partnerListing = createSlice({
  name: 'partnerListing',
  initialState,
  reducers: {
    onGetListPartner(state) {
      state.isLoading = true
    },
    onGetListPartnerFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onGetListPartnerSuccess(state, action) {
      state.isLoading = false
      state.isSuccess = true
      state.dataList = action.payload || []
    },

    onCreatePartner(state) {
      state.isLoading = true
    },
    onCreatePartnerFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onCreatePartnerSuccess(state, action) {
      state.isLoading = false
      state.isCreate = true
    },

    onUploadImagePartner(state) {
      state.isLoading = true
    },
    onUploadImagePartnerFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onUploadImagePartnerSuccess(state, action) {
      state.isLoading = false
      state.isUploadImage = true
      state.dataImage = action.payload || {}
    },

    onRemovePartner(state) {
      state.isLoading = true
    },
    onRemovePartnerFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onRemovePartnerSuccess(state, action) {
      state.isLoading = false
      state.isRemove = true
    },

    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isRemove = false
      state.isUploadImage = false
      state.isCreate = false
    }
  }
})

export const partnerActions = partnerListing.actions

export const makeSelectPartner = state => state.partner

export default partnerListing.reducer
