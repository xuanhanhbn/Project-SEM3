import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { programActions } from './slice'

// Get List Partner
function* onGetList() {
  const url = '/Program?page=0&size=10'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.data && response.status === 200) {
      yield put(programActions.onGetListProgramSuccess(response.data))
    } else {
      yield put(programActions.onGetListProgramFailed())
    }
  } catch (error) {
    yield put(programActions.onGetListProgramFailed('internet'))
  }
}

// Remove Program
function* onRemove(data) {
  const payload = data?.payload
  const url = '/User/change-password'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.data) {
      yield put(programActions.onRemoveProgramSuccess(response.data))
    } else {
      yield put(programActions.onRemoveProgramFailed())
    }
  } catch (error) {
    yield put(programActions.onRemoveProgramFailed('internet'))
  }
}

export default function* programSaga() {
  yield takeLatest(programActions.onRemoveProgram, onRemove)
  yield takeLatest(programActions.onGetListProgram, onGetList)
}
