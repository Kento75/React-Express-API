
export default function search(state = {
  searchWord: '',
  isProcessing: false,
  searchedList: [],
  paginationSearchedList: [],
  margin: 1,
  page: 1,
  count: 0,
  total: 0,
  alertMessage: '',
  columnToSort: '',
  sortDirection: 'desc',
  invertDirection:{
    asc: 'desc',
    desc: 'asc'
  },
  companyCodeFilter: '',
  companyNameFilter: '',
  addressFilter: '',
  mailFilter: '',
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
    case 'CHANGE_COMPANY_CODE_FILTER':
      return Object.assign({}, state, {
        companyCodeFilter: action.companyCodeFilter
      });
    case 'CHANGE_COMPANY_NAME_FILTER':
      return Object.assign({}, state, {
        companyNameFilter: action.companyNameFilter
      });
    case 'CHANGE_ADDRESS_FILTER':
      return Object.assign({}, state, {
        addressFilter: action.addressFilter
      });
    case 'CHANGE_MAIL_FILTER':
      return Object.assign({}, state, {
        mailFilter: action.mailFilter
      });
    case 'CHANGE_SORT_MODE':
      return Object.assign({}, state, {
        columnToSort: action.columnName,
        sortDirection:
          state.columnToSort === action.columnName
            ? state.invertDirection[state.sortDirection]
            : "asc"
      });
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.page,
        paginationSearchedList: 
          action.page === 1
            ? state.searchedList.slice(0, 10)
            : state.searchedList.slice((action.page - 1) * 10, (action.page - 1) * 10 + 1)
      });    
    case 'SUCCESS_SEARCH':
      return Object.assign({}, state, {
        isProcessing: false,
        searchedList: action.searchedList,
        total: action.searchedList.length,
        paginationSearchedList: action.searchedList.slice(0, 10)
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