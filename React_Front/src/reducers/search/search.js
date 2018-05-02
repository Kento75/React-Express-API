
export default function search(state = {
  searchWord: "",
  isProcessing: false,
  searchedList: [],
  alertMessage: "",
  count: 0,
  page: 0,
  rowSize: 0
}, action = {}){
  switch( action.type ){
    case 'CHANGE_SEARCH_WORD':
      return Object.assign({}, state, {
        searchWord: action.searchWord
      });
    case 'SEARCH_REQUEST_PROCESS':
      return Object.assign({}, state, {
        isProcessing: true
      });
    case 'SUCCESS_SEARCH':
      return Object.assign({}, state, {
        isProcessing: false,
        searchedList: action.searchedList
      });
    case 'FAILED_SEARCH':
      return Object.assign({}, state, {
        isProcessing: false,
        alertMessage: action.message
      });
    case 'CHANGE_SEARCH_ALERT_MESSAGE':
      return Object.assign({}, state, {
        alertMessage: action.message
      });
    default:
      return state;
  }
}