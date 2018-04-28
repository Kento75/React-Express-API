
export default function search(state = {
    company_code: '',
    company_name: '',
    address: '',
    mail: '',
    isProcessing: false,
    alertMessage: ''
  }, action = {}){
    switch( action.type ){
      case 'CHANGE_COMPANY_CODE':
      return Object.assign({}, state, {
        company_code: action.company_code
      });
      case 'CHANGE_COMPANY_NAME':
      return Object.assign({}, state, {
        company_name: action.company_name
      });
      case 'CHANGE_ADDRESS':
      return Object.assign({}, state, {
        address: action.address
      });
      case 'CHANGE_MAIL':
      return Object.assign({}, state, {
        mail: action.mail
      });
      case 'REQUEST_PROCESS':
        return Object.assign({}, state, {
          isProcessing: true
        });
      case 'FAILED_SEARCH':
        return Object.assign({}, state, {
          isProcessing: false,
          alertMessage: action.message
        });
      case 'SUCCESS_REGISTAR':
        return Object.assign({}, state, {
          isProcessing: false,
          alertMessage: "登録しました。",
          company_code: '',
          company_name: '',
          address: '',
          mail: '',
        });
      case 'FAILED_REGISTAR':
        return Object.assign({}, state, {
          isProcessing: false,
          alertMessage: action.message
        });
      case 'CHANGE_ALERT_MESSAGE':
        return Object.assign({}, state, {
          alertMessage: action.message
        });
      default:
        return state;
    }
  }