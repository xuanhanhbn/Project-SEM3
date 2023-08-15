import { call, put, takeLatest } from 'redux-saga/effects'
import { ticketEmployeeActions } from './ticketEmployeeSlice'
import { getApiDefault, postApiDefault } from './api'
import { putApiDefault, putApiNoData } from './components/Actions/api'

// Lấy danh sách Ticket
function* onGetList(data) {
  const status = data?.payload

  const url =
    data && data?.payload ? `EmployeeTicket?status=${status?.status}&page=0&size=10` : 'EmployeeTicket?page=0&size=10'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(ticketEmployeeActions.getListTicketSuccess(response.data))
    } else {
      yield put(ticketEmployeeActions.getListTicketFailed())
    }
  } catch (error) {
    yield put(ticketEmployeeActions.getListTicketFailed('internet'))
  }
}

function* onGetListMyTicket(data) {
  const status = data?.payload

  const url =
    data && data?.payload
      ? `/EmployeeTicket/AssignedTickets?status=${status?.status}&page=0&&size=16`
      : '/EmployeeTicket/AssignedTickets?page=0&&size=16'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(ticketEmployeeActions.getListMyTicketSuccess(response.data))
    } else {
      yield put(ticketEmployeeActions.getListMyTicketFailed())
    }
  } catch (error) {
    yield put(ticketEmployeeActions.getListMyTicketFailed('internet'))
  }
}

// Assign
function* onChangeAssign(data) {
  const payload = data?.payload
  const url = '/EmployeeTicket/Assign'
  try {
    const response = yield call(putApiDefault, url, payload)
    if (response && response.status === 200) {
      yield put(ticketEmployeeActions.onChangeAssignSuccess(response.data))
    } else {
      yield put(ticketEmployeeActions.onChangeAssignFailed())
    }
  } catch (error) {
    yield put(ticketEmployeeActions.onChangeAssignFailed('internet'))
  }
}

// onChangeProcessing
function* onChangeProcessing(data) {
  const payload = data?.payload?.ticketId
  const url = `/EmployeeTicket/Processing/${payload}`
  try {
    const response = yield call(putApiNoData, url)
    if (response && response.status === 200) {
      yield put(ticketEmployeeActions.onChangeProcessingSuccess(response.data))
    } else {
      yield put(ticketEmployeeActions.onChangeProcessingFailed())
    }
  } catch (error) {
    yield put(ticketEmployeeActions.onChangeProcessingFailed('internet'))
  }
}

// onChangeComplete
function* onChangeComplete(data) {
  const payload = data?.payload?.ticketId
  const url = `/EmployeeTicket/Complete/${payload}`
  try {
    const response = yield call(putApiNoData, url)
    if (response && response.status === 200) {
      yield put(ticketEmployeeActions.onChangeCompleteSuccess(response.data))
    } else {
      yield put(ticketEmployeeActions.onChangeCompleteFailed())
    }
  } catch (error) {
    yield put(ticketEmployeeActions.onChangeCompleteFailed('internet'))
  }
}

// Reopen

function* onChangeReopen(data) {
  const payload = data?.payload?.ticketId
  const url = `/EmployeeTicket/Reopen/${payload}`
  try {
    const response = yield call(putApiNoData, url)
    if (response && response.status === 200) {
      yield put(ticketEmployeeActions.onChangeReopenSuccess(response.data))
    } else {
      yield put(ticketEmployeeActions.onChangeReopenFailed())
    }
  } catch (error) {
    yield put(ticketEmployeeActions.onChangeReopenFailed('internet'))
  }
}

// onChangeClose
function* onChangeClose(data) {
  const payload = data?.payload?.ticketId
  const url = `/CustomerTicket/Close/${payload}`
  try {
    const response = yield call(putApiNoData, url)
    if (response && response.status === 200) {
      yield put(ticketEmployeeActions.onChangeCloseSuccess(response.data))
    } else {
      yield put(ticketEmployeeActions.onChangeCloseFailed())
    }
  } catch (error) {
    yield put(ticketEmployeeActions.onChangeCloseFailed('internet'))
  }
}

export default function* ticketEmployeeSaga() {
  yield takeLatest(ticketEmployeeActions.getListTicket, onGetList)
  yield takeLatest(ticketEmployeeActions.getListMyTicket, onGetListMyTicket)
  yield takeLatest(ticketEmployeeActions.onChangeAssign, onChangeAssign)
  yield takeLatest(ticketEmployeeActions.onChangeProcessing, onChangeProcessing)
  yield takeLatest(ticketEmployeeActions.onChangeComplete, onChangeComplete)
  yield takeLatest(ticketEmployeeActions.onChangeReopen, onChangeReopen)
  yield takeLatest(ticketEmployeeActions.onChangeClose, onChangeClose)
}
