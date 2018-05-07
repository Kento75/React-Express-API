import orderBy from "lodash/orderBy";

export default function search(state = {
  BtnMode: false,
  searchWord: '',
  isProcessing: false,
  searchedList: [],
  paginationSearchedList: [],
  selectList:  [],
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
    case 'SELECT_ROW':
      var pushRow ={
        "company_code": state.paginationSearchedList[action.index]["company_code"],
        "company_name": state.paginationSearchedList[action.index]["company_name"],
        "address": state.paginationSearchedList[action.index]["address"],
        "mail": state.paginationSearchedList[action.index]["mail"]
      }
      var newList = [];
      state.selectList.forEach(function(value){
        newList.push(value)
      });
      newList.push(pushRow)
      return Object.assign({}, state, {
        selectList: newList,
        BtnMode: 
          Object.keys(newList).length >= 1
            ? true
            : false
      });
    case 'CHANGE_COMPANY_CODE_FILTER':
      return Object.assign({}, state, {
        companyCodeFilter: action.companyCodeFilter,
        paginationSearchedList:
        state.page === 1
        ? orderBy(
            state.searchedList.filter(x =>
              x['company_code']
              .toLowerCase()
              .includes(action.companyCodeFilter.toLowerCase()) 
            ).filter(x =>
              x['company_name']
              .toLowerCase()
              .includes(state.companyNameFilter.toLowerCase())
            ).filter(x =>
              x['address']
              .toLowerCase()
              .includes(state.addressFilter.toLowerCase())
            ).filter(x =>
              x['mail']
              .toLowerCase()
              .includes(state.mailFilter.toLowerCase())
            ),
            state.columnToSort,
            state.sortDirection)
            .slice(0, 10)
        : orderBy(
          state.searchedList.filter(x =>
            x['company_code']
            .toLowerCase()
            .includes(action.companyCodeFilter.toLowerCase()) 
          ).filter(x =>
            x['company_name']
            .toLowerCase()
            .includes(state.companyNameFilter.toLowerCase())
          ).filter(x =>
            x['address']
            .toLowerCase()
            .includes(state.addressFilter.toLowerCase())
          ).filter(x =>
            x['mail']
            .toLowerCase()
            .includes(state.mailFilter.toLowerCase())
          ),
          state.columnToSort,
          state.sortDirection)
          .slice((state.page - 1) * 10, (state.page - 1) * 10 + 1)
      });
    case 'CHANGE_COMPANY_NAME_FILTER':
      return Object.assign({}, state, {
        companyNameFilter: action.companyNameFilter,
        paginationSearchedList:
        state.page === 1
        ? orderBy(
            state.searchedList.filter(x =>
              x['company_code']
              .toLowerCase()
              .includes(state.companyCodeFilter.toLowerCase()) 
            ).filter(x =>
              x['company_name']
              .toLowerCase()
              .includes(action.companyNameFilter.toLowerCase())
            ).filter(x =>
              x['address']
              .toLowerCase()
              .includes(state.addressFilter.toLowerCase())
            ).filter(x =>
              x['mail']
              .toLowerCase()
              .includes(state.mailFilter.toLowerCase())
            ),
            state.columnToSort,
            state.sortDirection)
            .slice(0, 10)
        : orderBy(
          state.searchedList.filter(x =>
            x['company_code']
            .toLowerCase()
            .includes(state.companyCodeFilter.toLowerCase()) 
          ).filter(x =>
            x['company_name']
            .toLowerCase()
            .includes(action.companyNameFilter.toLowerCase())
          ).filter(x =>
            x['address']
            .toLowerCase()
            .includes(state.addressFilter.toLowerCase())
          ).filter(x =>
            x['mail']
            .toLowerCase()
            .includes(state.mailFilter.toLowerCase())
          ),
          state.columnToSort,
          state.sortDirection)
          .slice((state.page - 1) * 10, (state.page - 1) * 10 + 1)
      });
    case 'CHANGE_ADDRESS_FILTER':
      return Object.assign({}, state, {
        addressFilter: action.addressFilter,
        paginationSearchedList:
        state.page === 1
        ? orderBy(
            state.searchedList.filter(x =>
              x['company_code']
              .toLowerCase()
              .includes(state.companyCodeFilter.toLowerCase()) 
            ).filter(x =>
              x['company_name']
              .toLowerCase()
              .includes(state.companyNameFilter.toLowerCase())
            ).filter(x =>
              x['address']
              .toLowerCase()
              .includes(action.addressFilter.toLowerCase())
            ).filter(x =>
              x['mail']
              .toLowerCase()
              .includes(state.mailFilter.toLowerCase())
            ),
            state.columnToSort,
            state.sortDirection)
            .slice(0, 10)
        : orderBy(
          state.searchedList.filter(x =>
            x['company_code']
            .toLowerCase()
            .includes(state.companyCodeFilter.toLowerCase()) 
          ).filter(x =>
            x['company_name']
            .toLowerCase()
            .includes(state.companyNameFilter.toLowerCase())
          ).filter(x =>
            x['address']
            .toLowerCase()
            .includes(action.addressFilter.toLowerCase())
          ).filter(x =>
            x['mail']
            .toLowerCase()
            .includes(state.mailFilter.toLowerCase())
          ),
          state.columnToSort,
          state.sortDirection)
          .slice((state.page - 1) * 10, (state.page - 1) * 10 + 1)
      });
    case 'CHANGE_MAIL_FILTER':
      return Object.assign({}, state, {
        mailFilter: action.mailFilter,
        paginationSearchedList:
        state.page === 1
        ? orderBy(
            state.searchedList.filter(x =>
              x['company_code']
              .toLowerCase()
              .includes(state.companyCodeFilter.toLowerCase()) 
            ).filter(x =>
              x['company_name']
              .toLowerCase()
              .includes(state.companyNameFilter.toLowerCase())
            ).filter(x =>
              x['address']
              .toLowerCase()
              .includes(state.addressFilter.toLowerCase())
            ).filter(x =>
              x['mail']
              .toLowerCase()
              .includes(action.mailFilter.toLowerCase())
            ),
            state.columnToSort,
            state.sortDirection)
            .slice(0, 10)
        : orderBy(
          state.searchedList.filter(x =>
            x['company_code']
            .toLowerCase()
            .includes(state.companyCodeFilter.toLowerCase()) 
          ).filter(x =>
            x['company_name']
            .toLowerCase()
            .includes(state.companyNameFilter.toLowerCase())
          ).filter(x =>
            x['address']
            .toLowerCase()
            .includes(state.addressFilter.toLowerCase())
          ).filter(x =>
            x['mail']
            .toLowerCase()
            .includes(action.mailFilter.toLowerCase())
          ),
          state.columnToSort,
          state.sortDirection)
          .slice((state.page - 1) * 10, (state.page - 1) * 10 + 1)
      });
    case 'CHANGE_SORT_MODE':
      return Object.assign({}, state, {
        columnToSort: action.columnName,
        sortDirection:
          state.columnToSort === action.columnName
            ? state.invertDirection[state.sortDirection]
            : "asc",
            paginationSearchedList:
            state.page === 1
            ? orderBy(
                state.searchedList.filter(x =>
                  x['company_code']
                  .toLowerCase()
                  .includes(state.companyCodeFilter.toLowerCase()) 
                ).filter(x =>
                  x['company_name']
                  .toLowerCase()
                  .includes(state.companyNameFilter.toLowerCase())
                ).filter(x =>
                  x['address']
                  .toLowerCase()
                  .includes(state.addressFilter.toLowerCase())
                ).filter(x =>
                  x['mail']
                  .toLowerCase()
                  .includes(state.mailFilter.toLowerCase())
                ),
                action.columnName,
                state.columnToSort === action.columnName
                ? state.invertDirection[state.sortDirection]
                : "asc")
                .slice(0, 10)
            : orderBy(
              state.searchedList.filter(x =>
                x['company_code']
                .toLowerCase()
                .includes(state.companyCodeFilter.toLowerCase()) 
              ).filter(x =>
                x['company_name']
                .toLowerCase()
                .includes(state.companyNameFilter.toLowerCase())
              ).filter(x =>
                x['address']
                .toLowerCase()
                .includes(state.addressFilter.toLowerCase())
              ).filter(x =>
                x['mail']
                .toLowerCase()
                .includes(state.mailFilter.toLowerCase())
              ),
              action.columnName,
              state.columnToSort === action.columnName
              ? state.invertDirection[state.sortDirection]
              : "asc")
              .slice((state.page - 1) * 10, (state.page - 1) * 10 + 1)
      });
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.page,
        paginationSearchedList:
          action.page === 1
          ? orderBy(
              state.searchedList.filter(x =>
                x['company_code']
                .toLowerCase()
                .includes(state.companyCodeFilter.toLowerCase()) 
              ).filter(x =>
                x['company_name']
                .toLowerCase()
                .includes(state.companyNameFilter.toLowerCase())
              ).filter(x =>
                x['address']
                .toLowerCase()
                .includes(state.addressFilter.toLowerCase())
              ).filter(x =>
                x['mail']
                .toLowerCase()
                .includes(state.mailFilter.toLowerCase())
              ),
              state.columnToSort,
              state.sortDirection)
              .slice(0, 10)
          : orderBy(
            state.searchedList.filter(x =>
              x['company_code']
              .toLowerCase()
              .includes(state.companyCodeFilter.toLowerCase()) 
            ).filter(x =>
              x['company_name']
              .toLowerCase()
              .includes(state.companyNameFilter.toLowerCase())
            ).filter(x =>
              x['address']
              .toLowerCase()
              .includes(state.addressFilter.toLowerCase())
            ).filter(x =>
              x['mail']
              .toLowerCase()
              .includes(state.mailFilter.toLowerCase())
            ),
            state.columnToSort,
            state.sortDirection)
            .slice((action.page - 1) * 10, (action.page - 1) * 10 + 1)
      });    
    case 'SUCCESS_SEARCH':
      return Object.assign({}, state, {
        BtnMode: false,
        isProcessing: false,
        selectList: [],
        searchedList: action.searchedList,
        total: action.searchedList.length,
        page: 1,
        paginationSearchedList:
          orderBy(
            action.searchedList.filter(x =>
              x['company_code']
              .toLowerCase()
              .includes(state.companyCodeFilter.toLowerCase()) 
            ).filter(x =>
              x['company_name']
              .toLowerCase()
              .includes(state.companyNameFilter.toLowerCase())
            ).filter(x =>
              x['address']
              .toLowerCase()
              .includes(state.addressFilter.toLowerCase())
            ).filter(x =>
              x['mail']
              .toLowerCase()
              .includes(state.mailFilter.toLowerCase())
            ),
            state.columnToSort,
            state.sortDirection)
            .slice(0, 10)
      });
    case 'SUCCESS_DELETE':
      return Object.assign({}, state, {
        BtnMode: false,
        isProcessing: false,
        alertMessage: action.message,
        searchedList: [],
        paginationSearchedList: [],
        selectList:  [],
        margin: 1,
        page: 1,
        count: 0,
        total: 0      
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