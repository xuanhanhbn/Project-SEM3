import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { marketingActions } from './marketingSlice'

// Lấy danh sách Topic
function* onGetList() {
  const url = '/Forum'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(marketingActions.getListTopicSuccess(response.data))
    } else {
      yield put(marketingActions.getListTopicFailed())
    }
  } catch (error) {
    yield put(marketingActions.getListTopicFailed('internet'))
  }
}

function* onCreateTopic(data) {
  const payload = data?.payload
  const url = '/Forum'
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(marketingActions.createTopicSuccess(response.data))
    } else {
      yield put(marketingActions.createTopicFailed())
    }
  } catch (error) {
    yield put(marketingActions.createTopicFailed('internet'))
  }
}

function* onRepplyTopicDetails(data) {
  const payload = data?.payload?.data
  const url = `/Forum/Reply/${data?.payload?.id}`
  try {
    const response = yield call(postApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(marketingActions.repplyTopicDetailsSuccess(response.data))
    } else {
      yield put(marketingActions.repplyTopicDetailsFailed())
    }
  } catch (error) {
    yield put(marketingActions.repplyTopicDetailsFailed('internet'))
  }
}

export default function* marketingSaga() {
  yield takeLatest(marketingActions.getListTopic, onGetList)
  yield takeLatest(marketingActions.repplyTopicDetails, onRepplyTopicDetails),
    yield takeLatest(marketingActions.createTopic, onCreateTopic)
}
