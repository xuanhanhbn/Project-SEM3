import { call, put, takeLatest } from 'redux-saga/effects'
import { ticketActions } from './ticketSlice'
import { getApiDefault, postApiDefault } from './api'
import { putApiDefault } from './components/Actions/api'

// Lấy danh sách Ticket
function* onGetList(data) {
  const payload = data?.payload
  const status = payload?.status

  const url =
    data && data?.payload ? `CustomerTicket?status=${status}&page=0&size=10` : '/CustomerTicket?page=0&&size=16'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(ticketActions.getListTicketSuccess(response.data))
    } else {
      yield put(ticketActions.getListTicketFailed())
    }
  } catch (error) {
    yield put(ticketActions.getListTicketFailed('internet'))
  }
}

function* onGetListMyTicket() {
  const url = '/CustomerTicket/AssignedTickets?page=0&&size=16'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(ticketActions.getListMyTicketSuccess(response.data))
    } else {
      yield put(ticketActions.getListMyTicketFailed())
    }
  } catch (error) {
    yield put(ticketActions.getListMyTicketFailed('internet'))
  }
}

// Assign
function* onChangeAssign(data) {
  const payload = data?.payload
  const url = '/CustomerTicket/Assign'
  try {
    const response = yield call(putApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(ticketActions.onChangeAssignSuccess(response.data))
    } else {
      yield put(ticketActions.onChangeAssignFailed())
    }
  } catch (error) {
    yield put(ticketActions.onChangeAssignFailed('internet'))
  }
}

// onChangeProcessing
function* onChangeProcessing(data) {
  const payload = data?.payload
  const url = '/CustomerTicket/Processing'
  try {
    const response = yield call(putApiDefault, url, payload)
    console.log('res: ', response)
    if (response && response.status === 200) {
      yield put(ticketActions.onChangeProcessingSuccess(response.data))
    } else {
      yield put(ticketActions.onChangeProcessingFailed())
    }
  } catch (error) {
    yield put(ticketActions.onChangeProcessingFailed('internet'))
  }
}

// onChangeComplete
function* onChangeComplete(data) {
  const payload = data?.payload
  const url = '/CustomerTicket/Complete'
  try {
    const response = yield call(putApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(ticketActions.onChangeCompleteSuccess(response.data))
    } else {
      yield put(ticketActions.onChangeCompleteFailed())
    }
  } catch (error) {
    yield put(ticketActions.onChangeCompleteFailed('internet'))
  }
}

// Lấy danh sách Ticket
function* onChangeReopen(data) {
  const payload = data?.payload
  const url = '/CustomerTicket/Reopen'
  try {
    const response = yield call(putApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(ticketActions.onChangeReopenSuccess(response.data))
    } else {
      yield put(ticketActions.onChangeReopenFailed())
    }
  } catch (error) {
    yield put(ticketActions.onChangeReopenFailed('internet'))
  }
}

// onChangeClose
function* onChangeClose(data) {
  const payload = data?.payload
  const url = '/CustomerTicket/Close'
  try {
    const response = yield call(putApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(ticketActions.onChangeCloseSuccess(response.data))
    } else {
      yield put(ticketActions.onChangeCloseFailed())
    }
  } catch (error) {
    yield put(ticketActions.onChangeCloseFailed('internet'))
  }
}

export default function* ticketSaga() {
  yield takeLatest(ticketActions.getListTicket, onGetList)
  yield takeLatest(ticketActions.getListMyTicket, onGetListMyTicket)

  yield takeLatest(ticketActions.onChangeAssign, onChangeAssign)
  yield takeLatest(ticketActions.onChangeProcessing, onChangeProcessing)
  yield takeLatest(ticketActions.onChangeComplete, onChangeComplete)
  yield takeLatest(ticketActions.onChangeReopen, onChangeReopen)
  yield takeLatest(ticketActions.onChangeClose, onChangeClose)
}
