import Constants from './constants'

export const readModel = {
  ReadModelStoreKey: '', // CONTRACT_ADDRESS:READ_MODEL_NAME
  ReadModelType: 'MercuryEventStore', // READ_MODEL_NAME
  LastEvent: null, // Last Event Index Processed
  BirthDate: '',
  Name: '',
  Role: ''
}

const handlers = {
  [Constants.EVENT_STORE_RECEIVED]: (state, transmuteEvent) => {
    return Object.assign({}, state, {
      EventStore: transmuteEvent
    })
  }, 
}

export const reducer = (state = readModel, transmuteEvent) => {
  // console.log('transmuteEvent: ', transmuteEvent)
  if (handlers[transmuteEvent.Type]) {
    return handlers[transmuteEvent.Type](state, transmuteEvent)
  }
  return state
}
