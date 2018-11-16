const autoCompleteInitialState = {
  queryString: null,
  autoCompleteResults: [],
}
export const autoComplete = (state=autoCompleteInitialState, {type, data}) => {
  switch (type) {
    case 'AUTO_COMPLETE_TEXT':
      return {
        ...state,
        queryString: data
      }
    case 'SET_AUTOCOMPLETE_RESULTS':
      return {
        ...state,
        autoCompleteResults: data,
      }
    default:
      return state;
  }
}
