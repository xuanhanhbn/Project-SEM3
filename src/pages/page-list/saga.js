import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { pageListActions } from './slice'

// Lấy danh sách document
function* onGetList() {
  const url = '/Document'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(pageListActions.getListPageSuccess(response.data))
    } else {
      yield put(pageListActions.getListPageFailed())
    }
  } catch (error) {
    yield put(pageListActions.getListPageFailed('internet'))
  }
}

// CREATE
function* onCreate(data) {
  const payload = data?.payload
  const url = '/Document'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(pageListActions.onCreatePageSuccess(response.data))
    } else {
      yield put(pageListActions.onCreatePageFailed())
    }
  } catch (error) {
    yield put(pageListActions.onCreatePageFailed('internet'))
  }
}

export default function* pageSaga() {
  yield takeLatest(pageListActions.getListPage, onGetList)
  yield takeLatest(pageListActions.onCreatePage, onCreate)
}
