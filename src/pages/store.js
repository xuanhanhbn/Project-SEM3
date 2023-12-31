import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { api } from './api'

// Login
import loginReducer from './pages/login/loginSlice'
import loginSaga from './pages/login/loginSaga'

import accountSettingSaga from 'src/views/account-settings/accoutSettingSaga'
import accountSettingReducer from 'src/views/account-settings/accountSettingSlice'

// DASHBOARD
import dashboardSaga from 'src/views/dashboard/dashboardSaga'
import dashboardReducer from 'src/views/dashboard/dashboardSlice'

// ABOUT US
import aboutSaga from 'src/views/AboutUs/aboutSaga'
import aboutReducer from 'src/views/AboutUs/aboutSlice'

// PARTNER
import partnerSaga from './partners-listing/saga'
import partnerReducer from './partners-listing/slice'

// PROGRAM
import programSaga from './program/saga'
import programReducer from './program/slice'

// PAGE
import pageSaga from './page-list/saga'
import pageReducer from './page-list/slice'

// registry reducer
const reducers = combineReducers({
  login: loginReducer,
  setting: accountSettingReducer,
  dashboard: dashboardReducer,
  about: aboutReducer,
  partner: partnerReducer,
  program: programReducer,
  page: pageReducer
})

// registry sagas
function* rootSaga() {
  yield all([loginSaga(), accountSettingSaga(), dashboardSaga(), aboutSaga(), partnerSaga(), programSaga(), pageSaga()])
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
