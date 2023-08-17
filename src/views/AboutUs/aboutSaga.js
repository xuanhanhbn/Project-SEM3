import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { aboutActions } from './aboutSlice'

// Lấy danh sách document
function* onGetList() {
  const url = '/Document'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(aboutActions.getListAbout(response.data))
    } else {
      yield put(aboutActions.getListAboutFailed())
    }
  } catch (error) {
    yield put(aboutActions.getListAboutFailed('internet'))
  }
}

// CREATE
function* onCreate(data) {
  const payload = data?.payload
  const url = '/Document'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(aboutActions.onCreateAboutSuccess(response.data))
    } else {
      yield put(aboutActions.onCreateAboutFailed())
    }
  } catch (error) {
    yield put(aboutActions.onCreateAboutFailed('internet'))
  }
}

export default function* aboutSaga() {
  yield takeLatest(aboutActions.getListAbout, onGetList)
  yield takeLatest(aboutActions.onCreateAbout, onCreate)
}
