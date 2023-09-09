import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault, putApiDefault } from './api'
import { programActions } from './slice'

// Get List Program
function* onGetList() {
  const url = '/Program?page=0&size=20'
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

// Get List Details Program
function* onGetListDetails(data) {
  const url = `/Program/${data?.payload?.programId}`
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.data && response.status === 200) {
      yield put(programActions.onGetDetailProgramSuccess(response.data))
    } else {
      yield put(programActions.onGetDetailProgramFailed())
    }
  } catch (error) {
    yield put(programActions.onGetDetailProgramFailed('internet'))
  }
}

// Close Program
function* onCloseProgram(data) {
  const id = data?.payload?.dataDetail?.programId
  const payload = data?.payload?.data
  const url = `/Program/close/${id}`
  try {
    const response = yield call(putApiDefault, url, payload)
    console.log('response: ', response)
    if (response && response.data && response.status === 200) {
      yield put(programActions.onCloseProgramSuccess(response.data))
    } else {
      yield put(programActions.onCloseProgramFailed())
    }
  } catch (error) {
    yield put(programActions.onCloseProgramFailed('internet'))
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
  yield takeLatest(programActions.onGetDetailProgram, onGetListDetails)
  yield takeLatest(programActions.onCloseProgram, onCloseProgram)
}
