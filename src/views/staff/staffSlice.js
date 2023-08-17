import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  isCreate: false,
  dataStaff: [],
  dataError: {}
}

const staff = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    getListStaff(state) {
      state.isLoading = true
    },
    getListStaffFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    getListStaffSuccess(state, action) {
      state.isLoading = false
      state.dataStaff = action.payload || []
      state.isSuccess = true
    },
    createStaff(state) {
      state.isLoading = true
    },
    createStaffFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    createStaffSuccess(state, action) {
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

export const staffActions = staff.actions

export const makeSelectStaff = state => state.staff

export default staff.reducer
