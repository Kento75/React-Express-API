import request from 'axios';

export function changeSearchWord( searchWord ){
  return {
    type: 'CHANGE_SEARCH_WORD',
    searchWord
  };
}

function requestProcess(){
  return { type: 'REQUEST_PROCESS' };
}

export function searchData(){
  return ( dispatch, getState ) => {
    dispatch( requestProcess() );

    const searchWord = getState().rootReducer.search.searchWord;
    return makeRequest('http://localhost:3000/companyFind', 'post', { searchWord })
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

export function changeAlertMessage( message ){
  return {
    type: 'CHANGE_ALERT_MESSAGE',
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
