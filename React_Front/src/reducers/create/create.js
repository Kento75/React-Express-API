
export default function create(state = {
    create_company_code: '',
    create_company_name: '',
    create_address: '',
    create_mail: '',
    create_isProcessing: false,
    create_alertMessage: ''
  }, action = {}){
    switch( action.type ){
      case 'CREATE_CHANGE_COMPANY_CODE':
        return Object.assign({}, state, {
          create_company_code: action.create_company_code
        });
      case 'CREATE_CHANGE_COMPANY_NAME':
        return Object.assign({}, state, {
          create_company_name: action.create_company_name
        });
      case 'CREATE_CHANGE_ADDRESS':
        return Object.assign({}, state, {
          create_address: action.create_address
        });
      case 'CREATE_CHANGE_MAIL':
        return Object.assign({}, state, {
          create_mail: action.create_mail
        });
      case 'CREATE_REQUEST_PROCESS':
        return Object.assign({}, state, {
          create_isProcessing: true
        });
      case 'CREATE_SUCCESS_REGISTAR':
        return Object.assign({}, state, {
          create_isProcessing: false,
          create_alertMessage: "登録しました。",
          create_company_code: '',
          create_company_name: '',
          create_address: '',
          create_mail: '',
        });
      case 'CREATE_FAILED_REGISTAR':
        return Object.assign({}, state, {
          create_isProcessing: false,
          create_alertMessage: action.message
        });
      case 'CREATE_CHANGE_ALERT_MESSAGE':
        return Object.assign({}, state, {
          create_alertMessage: action.message
        });
      default:
        return state;
    }
  }