import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { documentActions } from './documentSlice'

// Lấy danh sách document
function* onGetList() {
  const url = '/Document'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(documentActions.getListDocumentsSuccess(response.data))
    } else {
      yield put(documentActions.getListDocumentsFailed())
    }
  } catch (error) {
    yield put(documentActions.getListDocumentsFailed('internet'))
  }
}

export default function* documentSaga() {
  yield takeLatest(documentActions.getListDocuments, onGetList)
}
