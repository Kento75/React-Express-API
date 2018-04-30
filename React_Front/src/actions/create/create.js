import request from 'axios';


// 会社コード入力値変更時
export function changeCompanyCode( create_company_code ){
  return {
    type: 'CREATE_CHANGE_COMPANY_CODE',
    create_company_code
  };
}

// 会社名入力値変更時
export function changeCompanyName( create_company_name ){
    return {
      type: 'CREATE_CHANGE_COMPANY_NAME',
      create_company_name
    };
  }

// 住所入力値変更時
export function changeAddress( create_address ){
  return {
    type: 'CREATE_CHANGE_ADDRESS',
    create_address
  };
}

// メールアドレス入力値変更時
export function changeMail( create_mail ){
  return {
    type: 'CREATE_CHANGE_MAIL',
    create_mail
  };
}

// 登録実行押下時①
// ロード画面表示
function requestProcess(){
  return { type: 'CREATE_REQUEST_PROCESS' };
}

// 登録実行押下時②
// 登録処理リクエストの送信
export function registarCreateData(){
  return ( dispatch, getState ) => {
    dispatch( requestProcess() );

    const create_company_code = getState().rootReducer.create.create_company_code;
    const create_company_name = getState().rootReducer.create.create_company_name;
    const create_address      = getState().rootReducer.create.create_address;
    const create_mail         = getState().rootReducer.create.create_mail;

    return makeRequest('http://localhost:3000/companyAdd', 'post',
      { company_code: create_company_code,
        company_name: create_company_name,
        address:      create_address,
        mail:         create_mail,
      })
      .then(response => {
        if (response.status === 200) {
          return dispatch({
                    type: 'CREATE_SUCCESS_REGISTAR'
                  });
        }
        else {
          return dispatch({
                    type: 'CREATE_FAILED_REGISTAR',
                    message: "登録に失敗しました。"
                  });
        }
      })
      .catch(() => {
          return dispatch({
                    type: 'CREATE_FAILED_REGISTAR',
                    message: "例外が発生しました。"
                  });
      });
  };
}

// ダイアログ表示メッセージの変更
export function changeAlertMessage( create_message ){
  return {
    type: 'CREATE_CHANGE_ALERT_MESSAGE',
    create_message
  }
}

function makeRequest(url, method, data) {
  return request({
    url,
    method,
    data
  });
}
