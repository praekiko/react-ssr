import constanst from './constanst'

const setLocale = locale => ({
  type: constanst.SET_LOCALE,
  payload: locale,
})

export default {
  setLocale,
}
