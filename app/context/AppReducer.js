export const initialState = {
  date: '',
  fromCity: '',
  toCity: '',
  type: '',
  description: '',
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'add_application':
      return {
        ...state,
        [action.field]: action.payload,
      }
    case 'apdate':
      return {
        ...state,
        state:action.payload
      }
    case 'reset':
      return initialState
  }
}
