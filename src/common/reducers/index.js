import Immutable from 'immutable'

import createSetValueReducer from './createSetValueReducer'

export default {
  locale: createSetValueReducer('LOCALE', 'th'),
}
