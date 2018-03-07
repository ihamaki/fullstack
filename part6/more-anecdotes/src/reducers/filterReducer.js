const initialFilter = ''

const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    filter
  }
}

export default filterReducer