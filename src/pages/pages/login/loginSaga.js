import { call, put, takeLatest } from 'redux-saga/effects'
import { customerActions, loginPageActions } from './loginSlice'
import { getApiUser, postApiProduct } from './api'

function* onLogin(data) {
  const payload = data.payload || []
  const url = 'User/login'
  try {
    const response = yield call(postApiProduct, url, payload)
    if (response && response.status === 200) {
      yield put(loginPageActions.loginPageSuccess(response.data))
    } else {
      yield put(loginPageActions.loginPageFailed())
    }
  } catch (error) {
    yield put(loginPageActions.loginPageFailed('internet'))
  }
}
function* onGetUserInfo() {
  const url = 'User/me'
  try {
    const response = yield call(getApiUser, url)
    if (response && response.status === 200) {
      yield put(loginPageActions.userInfoSuccess(response.data))
      localStorage.setItem('dataUser', JSON.stringify(response?.data))
    } else {
      yield put(loginPageActions.userInfoFailed())
    }
  } catch (error) {
    yield put(loginPageActions.userInfoFailed('internet'))
  }
}

export default function* loginSaga() {
  yield takeLatest(loginPageActions.loginPage, onLogin)
  yield takeLatest(loginPageActions.userInfo, onGetUserInfo)
}
