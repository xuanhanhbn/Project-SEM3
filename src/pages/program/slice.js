import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  dataList: []
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
    }
  }
})

export const programActions = programList.actions

export const makeSelectProgram = state => state.program

export default programList.reducer
