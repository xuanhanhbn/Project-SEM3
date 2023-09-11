import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault, putApiDefault, putApiNoData } from './api'
import { partnerActions } from './slice'

// Get List Partner
function* onGetListPartner() {
  const url = '/Partner?page=0&size=20'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.data && response.status === 200) {
      yield put(partnerActions.onGetListPartnerSuccess(response.data.data))
    } else {
      yield put(partnerActions.onGetListPartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onGetListPartnerFailed('internet'))
  }
}

// get detail
function* onGetListDetailPartner(data) {
  const payload = data?.payload
  const url = `/Partner/${payload?.partnerId}`
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(partnerActions.onGetListDetailPartnerSuccess(response.data))
    } else {
      yield put(partnerActions.onGetListDetailPartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onGetListDetailPartnerFailed('internet'))
  }
}

// update data detail
function* onUpdateDetailPartner(data) {
  const { key, partnerId, partnerThumbnail, type, ...rest } = data?.payload
  const payload = data?.payload?.partnerId
  const url = `/Partner/update/${payload}`
  try {
    const response = yield call(putApiDefault, url, rest)
    if (response && response.status === 200) {
      yield put(partnerActions.onUpdateDetailPartnerSuccess(response.data))
    } else {
      yield put(partnerActions.onUpdateDetailPartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onUpdateDetailPartnerFailed('internet'))
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

function* onChangeImagePartner(data) {
  const payload = data?.payload
  const url = '/Attachment'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(partnerActions.onChangeImagePartnerSuccess(response.data))
    } else {
      yield put(partnerActions.onChangeImagePartnerFailed())
    }
  } catch (error) {
    yield put(partnerActions.onChangeImagePartnerFailed('internet'))
  }
}

export default function* partnerSaga() {
  yield takeLatest(partnerActions.onRemovePartner, onRemovePartner)
  yield takeLatest(partnerActions.onGetListPartner, onGetListPartner)
  yield takeLatest(partnerActions.onUploadImagePartner, onUploadImagePartner)
  yield takeLatest(partnerActions.onCreatePartner, onCreatePartner)

  yield takeLatest(partnerActions.onGetListDetailPartner, onGetListDetailPartner)
  yield takeLatest(partnerActions.onUpdateDetailPartner, onUpdateDetailPartner)
  yield takeLatest(partnerActions.onChangeImagePartner, onChangeImagePartner)
}
