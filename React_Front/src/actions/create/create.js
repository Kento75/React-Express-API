import request from 'axios';


// 会社コード入力値変更時
export function changeCompanyCode( company_code ){
  return {
    type: 'CHANGE_COMPANY_CODE',
    company_code
  };
}

// 会社名入力値変更時
export function changeCompanyName( company_name ){
    return {
      type: 'CHANGE_COMPANY_NAME',
      company_name
    };
  }

// 住所入力値変更時
export function changeAddress( address ){
  return {
    type: 'CHANGE_ADDRESS',
    address
  };
}

// メールアドレス入力値変更時
export function changeMail( mail ){
  return {
    type: 'CHANGE_MAIL',
    mail
  };
}

// 登録実行押下時①
// ロード画面表示
function requestProcess(){
  return { type: 'REQUEST_PROCESS' };
}

// 登録実行押下時②
// 登録処理リクエストの送信
export function registarCreateData(){
  return ( dispatch, getState ) => {
    dispatch( requestProcess() );

    const company_code = getState().rootReducer.create.company_code;
    const company_name = getState().rootReducer.create.company_name;
    const address      = getState().rootReducer.create.address;
    const mail         = getState().rootReducer.create.mail;

    return makeRequest('http://localhost:3000/companyAdd', 'post',
      { company_code: company_code,
        company_name: company_name,
        address:      address,
        mail:         mail,
      })
      .then(response => {
        if (response.status === 200) {
          return dispatch({
                    type: 'SUCCESS_REGISTAR'
                  });
        }
        else {
          return dispatch({
                    type: 'FAILED_REGISTAR',
                    message: "登録に失敗しました。"
                  });
        }
      })
      .catch(() => {
          return dispatch({
                    type: 'FAILED_REGISTAR',
                    message: "登録に失敗しました。"
                  });
      });
  };
}

// ダイアログ表示メッセージの変更
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
