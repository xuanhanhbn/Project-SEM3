/*
 *
 * PersonalCustomerCreate reducer
 *
 */
import * as types from './constant'

export const initialState = {
  isLoading: false,
  errorMessage: '',
  successMessage: '',
  isCreateSuccess: false,
  responseUpdate: {},
  responseCreate: {}
}

const reducer = (state = initialState, action) => {
  // action: {type:.. payload:..}
  switch (action.type) {
    case 'UPDATE_CART':
      return { ...state, cart: action.payload, isLoading: true }
    case 'SHOW_LOADING':
      return { ...state, isLoading: true }
    case 'HIDE_LOADING':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default reducer
