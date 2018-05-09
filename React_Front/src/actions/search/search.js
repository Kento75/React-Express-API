import request from 'axios';

export function changeSearchWord( searchWord ){
  return {
    type: 'CHANGE_SEARCH_WORD',
    searchWord
  };
}

function requestProcess(){
  return { type: 'SEARCH_REQUEST_PROCESS' };
}

// フィルター
export function changeCompanyCodeFilter( companyCodeFilter ) {
  return {
    type: 'CHANGE_COMPANY_CODE_FILTER',
    companyCodeFilter
  }
}

export function changePage( page ) {
  return {
    type: 'CHANGE_PAGE',
    page
  }
}

export function changeCompanyNameFilter( companyNameFilter ) {
  return {
    type: 'CHANGE_COMPANY_NAME_FILTER',
    companyNameFilter
  }
}

export function changeAddressFilter( addressFilter ) {
  return {
    type: 'CHANGE_ADDRESS_FILTER',
    addressFilter
  }
}

export function changeMailFilter( mailFilter ) {
  return {
    type: 'CHANGE_MAIL_FILTER',
    mailFilter
  }
}

// ソートチェンジ
export function changeSortMode( columnName ) {
  return {
    type: 'CHANGE_SORT_MODE',
    columnName
  };  
}

export function selectRow( index ) {
  return {
    type: 'SELECT_ROW',
    index
  }
}

export function searchData(){
  return ( dispatch, getState ) => {
    dispatch( requestProcess() );

    const searchWord = getState().rootReducer.search.searchWord;
    return makeRequest('http://localhost:3000/find', 'post', { searchWord })
      .then(response => {
        if (response.status === 200) {
          return dispatch({
                    type: 'SUCCESS_SEARCH',
                    searchedList: response.data.companyList
                  });
        }
        else {
          return dispatch({
                    type: 'FAILED_SEARCH',
                    message: "検索に失敗しました。"
                  });
        }
      })
      .catch(() => {
          return dispatch({
                    type: 'FAILED_SEARCH',
                    message: "検索に失敗しました。"
                  });
      });
  };
}

// 更新ダイアログの表示
export function showUpdateDialog() {
  return {
    type: 'SHOW_UPDATE_DIALOG'
  };
}

export function deleteData(){
  return ( dispatch, getState ) => {
    dispatch( requestProcess() );

    const deleteList = getState().rootReducer.search.selectList;
    return makeRequest('http://localhost:3000/remove', 'post', { deleteList })
      .then(response => {
        if (response.status === 200) {
          return dispatch({
                    type: 'SUCCESS_DELETE',
                    message: "削除に成功しました。"
                  });
        }
        else {
          return dispatch({
                    type: 'FAILED_SEARCH',
                    message: "削除に失敗しました。"
                  });
        }
      })
      .catch(() => {
          return dispatch({
                    type: 'FAILED_SEARCH',
                    message: "削除に失敗しました。"
                  });
      });
  };
}

export function changeAlertMessage( message ){
  return {
    type: 'CHANGE_SEARCH_ALERT_MESSAGE',
    message
  }
}

function makeRequest(url, method, data) {
  return request({
    url,
    method,
    data
  });
}
