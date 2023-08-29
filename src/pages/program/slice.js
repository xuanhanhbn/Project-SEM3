import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  isUploadImage: false,
  dataList: [],
  dataImage: {}
}

const programList = createSlice({
  name: 'programList',
  initialState,
  reducers: {
    onGetListProgram(state) {
      state.isLoading = true
    },
    onGetListProgramFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onGetListProgramSuccess(state, action) {
      state.isLoading = false
      state.isSuccess = true
      state.dataList = action.payload || []
    },

    onUploadImageProgram(state) {
      state.isLoading = true
    },
    onUploadImageProgramFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onUploadImageProgramSuccess(state, action) {
      state.isLoading = false
      state.isUploadImage = true
      state.dataImage = action.payload || {}
    },

    onCreateProgram(state) {
      state.isLoading = true
    },
    onCreateProgramFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onCreateProgramSuccess(state, action) {
      state.isLoading = false
      state.isCreate = true
    },

    onRemoveProgram(state) {
      state.isLoading = true
    },
    onRemoveProgramFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onRemoveProgramSuccess(state, action) {
      state.isLoading = false
      state.isSuccess = true
    },

    clear(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isUploadImage = false
      state.isCreate = false
    }
  }
})

export const programActions = programList.actions

export const makeSelectProgram = state => state.program

export default programList.reducer
