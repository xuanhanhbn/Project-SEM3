import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  isRepply: false,

  dataTopic: [],
  dataTopicDetails: [],
  dataError: {}
}

const marketing = createSlice({
  name: 'marketing',
  initialState,
  reducers: {
    getListTopic(state) {
      state.isLoading = true
    },
    getListTopicFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListTopicSuccess(state, action) {
      state.isLoading = false
      state.dataTopic = action.payload || []
      state.isSuccess = true
    },
    createTopic(state) {
      state.isLoading = true
    },
    createTopicFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    createTopicSuccess(state, action) {
      state.isLoading = false
      state.isCreate = true
    },

    repplyTopicDetails(state) {
      state.isLoading = true
    },
    repplyTopicDetailsFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    repplyTopicDetailsSuccess(state, action) {
      state.isLoading = false
      state.dataTopic = action.payload || []
      state.isRepply = true
    },

    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isRepply = false
      state.isCreate = false
    }
  }
})

export const marketingActions = marketing.actions

export const makeSelectMakerting = state => state.marketing

export default marketing.reducer
