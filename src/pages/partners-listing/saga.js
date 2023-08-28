import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { partnerActions } from './slice'

// Get List Partner
function* onGetListPartner() {
  const url = '/Partner?page=0&size=20'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.data && response.status === 200) {
      yield put(partnerActions.onGetListPartnerSuccess(response.data))
    } else {
      yield put(partnerActions.onGetListPartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onGetListPartnerFailed('internet'))
  }
}

// Remove Partner
function* onRemovePartner(data) {
  const payload = data?.payload
  const url = '/User/change-password'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.data) {
      yield put(partnerActions.onRemovePartnerSuccess(response.data))
    } else {
      yield put(partnerActions.onRemovePartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onRemovePartnerFailed('internet'))
  }
}

// CREATE Partner
function* onCreatePartner(data) {
  const payload = data?.payload
  const url = '/Partner/create'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.data) {
      yield put(partnerActions.onCreatePartnerSuccess(response.data))
    } else {
      yield put(partnerActions.onCreatePartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onCreatePartnerFailed('internet'))
  }
}

function* onUploadImagePartner(data) {
  const payload = data?.payload
  const url = '/Attachment'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(partnerActions.onUploadImagePartnerSuccess(response.data))
    } else {
      yield put(partnerActions.onUploadImagePartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onUploadImagePartnerFailed('internet'))
  }
}

export default function* partnerSaga() {
  yield takeLatest(partnerActions.onRemovePartner, onRemovePartner)
  yield takeLatest(partnerActions.onGetListPartner, onGetListPartner)
  yield takeLatest(partnerActions.onUploadImagePartner, onUploadImagePartner)
  yield takeLatest(partnerActions.onCreatePartner, onCreatePartner)
}
