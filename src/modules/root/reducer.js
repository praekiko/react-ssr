import constanst from './constanst'

export const initialState = {
  locale: 'th',
}

export default (state = initialState, action) => {
  const { type, payload = {} } = action

  switch (type) {
    case constanst.SET_LOCALE: {
      return {
        ...state,
        locale: payload,
      }
    }

    default:
      return state
  }
}
