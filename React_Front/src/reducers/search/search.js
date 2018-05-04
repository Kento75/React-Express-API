
export default function search(state = {
  searchWord: '',
  isProcessing: false,
  searchedList: [],
  alertMessage: '',
  columnToSort: '',
  sortDirection: 'desc',
  invertDirection:{
    asc: 'desc',
    desc: 'asc'
  },
  header: [
    {
      name: '会社コード',
      prop: 'company_code'
    },
    {
      name: '会社名',
      prop: 'company_name'
    },
    {
      name: '住所',
      prop: 'address'
    },
    {
      name: 'メールアドレス',
      prop: 'mail'
    }
  ]
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
    case 'CHANGE_SORT_MODE':
      return Object.assign({}, state, {
        columnToSort: action.columnName,
        sortDirection:
          state.columnToSort === action.columnName
            ? state.invertDirection[state.sortDirection]
            : "asc"
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