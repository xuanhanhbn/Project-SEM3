import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { programActions } from './slice'

// Get List Program
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

// Create List Program
function* onCreateProgram(data) {
  const payload = data?.payload || {}
  const url = '/Program/create'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.data && response.status === 200) {
      yield put(programActions.onCreateProgramSuccess(response.data))
    } else {
      yield put(programActions.onCreateProgramFailed())
    }
  } catch (error) {
    yield put(programActions.onCreateProgramFailed('internet'))
  }
}

// Upload image Program
function* onUploadImage(data) {
  const payload = data?.payload
  const url = '/Attachment'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(programActions.onUploadImageProgramSuccess(response.data))
    } else {
      yield put(programActions.onUploadImageProgramFailed())
    }
  } catch (error) {
    yield put(programActions.onUploadImageProgramFailed('internet'))
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
  yield takeLatest(programActions.onUploadImageProgram, onUploadImage)
  yield takeLatest(programActions.onCreateProgram, onCreateProgram)
}
