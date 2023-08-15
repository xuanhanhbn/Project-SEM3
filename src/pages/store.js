import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { api } from './api'

// Customer
import customerSaga from 'src/views/custommer-dashboard/customerSaga'
import customerReducer from 'src/views/custommer-dashboard/customerSlice'

// Login
import loginReducer from './pages/login/loginSlice'
import loginSaga from './pages/login/loginSaga'

//  Transaction
import transactionSaga from 'src/views/transactions/transactionSaga'
import transactionReducer from 'src/views/transactions/transactionSlice'

// Staff
import staffSaga from 'src/views/staff/staffSaga'
import staffReducer from 'src/views/staff/staffSlice'

import accountSettingSaga from 'src/views/account-settings/accoutSettingSaga'
import accountSettingReducer from 'src/views/account-settings/accountSettingSlice'

// DASHBOARD
import dashboardSaga from 'src/views/dashboard/dashboardSaga'
import dashboardReducer from 'src/views/dashboard/dashboardSlice'

// DOCUMENT
import documentSaga from 'src/views/admin/documents/documentSaga'
import documentReducer from 'src/views/admin/documents/documentSlice'

// MARKETING
import marketingSaga from 'src/views/marketing-department/marketingSaga'
import marketingReducer from 'src/views/marketing-department/marketingSlice'

// Ticket List
import ticketSaga from 'src/views/ticket-pending/ticketSaga'
import ticketReducer from 'src/views/ticket-pending/ticketSlice'

// EMPLOYEE TICKET
import ticketEmployeeReducer from 'src/views/employee-ticket/ticketEmployeeSlice'
import ticketEmployeeSaga from 'src/views/employee-ticket/ticketEmployeeSaga'

// registry reducer
const reducers = combineReducers({
  customer: customerReducer,
  login: loginReducer,
  transaction: transactionReducer,
  staff: staffReducer,
  setting: accountSettingReducer,
  dashboard: dashboardReducer,
  document: documentReducer,
  marketing: marketingReducer,
  ticket: ticketReducer,
  ticketEmployee: ticketEmployeeReducer
})

// registry sagas
function* rootSaga() {
  yield all([
    customerSaga(),
    loginSaga(),
    accountSettingSaga(),
    dashboardSaga(),
    documentSaga(),
    marketingSaga(),
    transactionSaga(),
    staffSaga(),
    ticketSaga(),
    ticketEmployeeSaga()
  ])
}

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['theme']
// }

// const persistedReducer = persistReducer(persistConfig, reducers)

// const allSagaMiddleWare = [];

const sagaMiddleware = createSagaMiddleware({})

// const enhancers = [];
// enhancers.push(applyMiddleware(...allSagaMiddleWare));
const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
    middlewares.push(sagaMiddleware)

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default
    // }
    // middlewares.push(createDebugger())
    return middlewares
  }
})

sagaMiddleware.run(rootSaga)
const persistor = persistStore(store)

// if (module.hot) {
//   module.hot.accept('./reducers', () => {
//     store.replaceReducer(createReducer(store.injectedReducers));
//   });
// };

setupListeners(store.dispatch)

export { store, persistor }
