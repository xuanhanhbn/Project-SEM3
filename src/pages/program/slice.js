import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  isUploadImage: false,
  isClose: false,
  isCloseError: false,
  isUpdate: false,
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
    onGetDetailProgram(state) {
      state.isLoading = true
    },
    onGetDetailProgramFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onGetDetailProgramSuccess(state, action) {
      state.isLoading = false
      state.isSuccess = true
      state.dataDetail = action.payload || []
    },

    onUpdateProgram(state) {
      state.isLoading = true
    },
    onUpdateProgramFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    onUpdateProgramSuccess(state, action) {
      state.isLoading = false
      state.isUpdate = true
    },

    onCloseProgram(state) {
      state.isLoading = true
    },
    onCloseProgramFailed(state, action) {
      state.isLoading = false
      state.dataError = action.payload || {}
      state.errorMessage = ''
      state.isCloseError = true
    },
    onCloseProgramSuccess(state, action) {
      state.isLoading = false
      state.isClose = true
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
      state.isClose = false
      state.isCloseError = false
      state.isUpdate = false
    }
  }
})

export const programActions = programList.actions

export const makeSelectProgram = state => state.program

export default programList.reducer
