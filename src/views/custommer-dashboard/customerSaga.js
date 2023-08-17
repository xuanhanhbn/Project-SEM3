import { call, put, takeLatest } from 'redux-saga/effects'
import { customerActions } from './customerSlice'
import { getApiDefault, postApiDefault } from './api'

// Lấy danh sách khách hàng
function* onGetList(data) {
  const payload = data && data?.payload?.search ? data?.payload?.search : ''
  const url = `/Customer?search=${payload}&page=0&size=16`
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(customerActions.getListCustomerSuccess(response.data))
    } else {
      yield put(customerActions.getListCustomerFailed())
    }
  } catch (error) {
    yield put(customerActions.getListCustomerFailed('internet'))
  }
}

function* onGetListDetails(data) {
  const payload = data?.payload
  console.log('payload: ', payload)
  const url = `CustomerTicket/TicketsByCustomer/&page=0&size=16`
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(customerActions.getListDetailsCustomerSuccess(response.data))
    } else {
      yield put(customerActions.getListDetailsCustomerFailed())
    }
  } catch (error) {
    yield put(customerActions.getListDetailsCustomerFailed('internet'))
  }
}

// Thêm mới khách hàng
function* onCreateCustomer(data) {
  const payload = data?.payload
  const url = '/Customer'
  try {
    const response = yield call(postApiDefault, url, payload)
    console.log('response: ', response)

    if (response && response.status === 200) {
      yield put(customerActions.createCustomerSuccess(response.data))
    } else {
      yield put(customerActions.createCustomerFailed())
    }
  } catch (error) {
    yield put(customerActions.createCustomerFailed('internet'))
  }
}

export default function* customerSaga() {
  yield takeLatest(customerActions.getListCustomer, onGetList)
  yield takeLatest(customerActions.createCustomer, onCreateCustomer)
  yield takeLatest(customerActions.getListDetailsCustomer, onGetListDetails)
}
