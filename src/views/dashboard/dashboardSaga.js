import { call, put, takeLatest } from 'redux-saga/effects'
import { dashboardActions } from './dashboardSlice'
import { getApiDefault, postApiDefault } from './api'

// Lấy danh sách Dashboard
function* onGetList() {
  const url = '/Admin'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(dashboardActions.getListDashBoardSuccess(response.data))
    } else {
      yield put(dashboardActions.getListDashBoardFailed())
    }
  } catch (error) {
    yield put(dashboardActions.getListDashBoardFailed('internet'))
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.getListDashBoard, onGetList)
}
