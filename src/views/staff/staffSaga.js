import { call, put, takeLatest } from 'redux-saga/effects'
import { staffActions } from './staffSlice'
import { getApiDefault, postApiDefault } from './api'

// Lấy danh staff
function* onGetList() {
  const url = '/Employee'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(staffActions.getListStaffSuccess(response.data))
    } else {
      yield put(staffActions.getListStaffFailed())
    }
  } catch (error) {
    yield put(staffActions.getListStaffFailed('internet'))
  }
}

// Thêm mới account
function* onCreateStaff(data) {
  const payload = data?.payload
  const url = '/User/register'
  try {
    const response = yield call(postApiDefault, url, payload)
    console.log('response: ', response)

    if (response && response.status === 200) {
      yield put(staffActions.createStaffSuccess(response.data))
    } else {
      yield put(staffActions.createStaffFailed())
    }
  } catch (error) {
    yield put(staffActions.createStaffFailed('internet'))
  }
}

export default function* staffSaga() {
  yield takeLatest(staffActions.getListStaff, onGetList)
  yield takeLatest(staffActions.createStaff, onCreateStaff)
}
