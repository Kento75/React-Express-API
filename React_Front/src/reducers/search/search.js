
export default function search(state = {
  searchWord: "",
  isProcessing: false,
  searchedList: [],
  alertMessage: "",
  count: 0,
  page: 1,
  rowSize: 10,
  filterValue: ''
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
    case 'CHANGE_FILTER_VALUE':
      return Object.assign({}, state, {
        filterValue: action.filterValue
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