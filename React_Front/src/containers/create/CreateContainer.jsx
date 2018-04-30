import { connect } from 'react-redux';
import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Create from '../../components/create/Create';
import AlertDialog from '../../components/common/AlertDialog';
import LoadingDialog from '../../components/common/LoadingDialog';
import * as createActions from '../../actions/create/create';


class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChangeCompanyCode = this.handleChangeCompanyCode.bind(this);
    this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleOnClickRegisterBtn = this.handleOnClickRegisterBtn.bind(this);
    this.handleOnClickOkBtn = this.handleOnClickOkBtn.bind(this);
  }

  // 会社コード項目入力値の変更時
  handleChangeCompanyCode(e){
    const { createActionBind } = this.props;
    createActionBind.changeCompanyCode(e.target.value);
  }

  // 会社名項目入力値の変更時
  handleChangeCompanyName(e){
    const { createActionBind } = this.props;
    createActionBind.changeCompanyName(e.target.value);
  }

  // 住所項目入力値の変更時
  handleChangeAddress(e){
    const { createActionBind } = this.props;
    createActionBind.changeAddress(e.target.value);
  }

  // メールアドレス項目入力値の変更時
  handleChangeMail(e){
    const { createActionBind } = this.props;
    createActionBind.changeMail(e.target.value);
  }

  // 登録実行ボタン押下時
  handleOnClickRegisterBtn(){
    const { createActionBind } = this.props;
    createActionBind.registarCreateData();
  }

  // ダイアログ内、OKボタン押下時
  handleOnClickOkBtn(){
    const { createActionBind } = this.props;
    createActionBind.changeAlertMessage("");
  }

  render() {
    const {
      create_company_code,
      create_company_name,
      create_address,
      create_mail,
      create_isProcessing,
      create_alertMessage
    } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Create
            create_company_code={create_company_code}
            create_company_name={create_company_name}
            create_address={create_address}
            create_mail={create_mail}
            onChangeCompanyCode={this.handleChangeCompanyCode}
            onChangeCompanyName={this.handleChangeCompanyName}
            onChangeAddress={this.handleChangeAddress}
            onChangeMail={this.handleChangeMail}
            onClickRegisterBtn={this.handleOnClickRegisterBtn}
          />
          <LoadingDialog
            isLoadingOpen={create_isProcessing}
          />
          <AlertDialog
            message={create_alertMessage}
            onCloseDialog={this.handleOnClickOkBtn}
          />
        </div>
      </MuiThemeProvider>
    );
  }
};

CreateContainer.propTypes = {
  create_company_code:   PropTypes.string.isRequired,
  create_company_name:   PropTypes.string.isRequired,
  create_address:        PropTypes.string.isRequired,
  create_mail:           PropTypes.string.isRequired,
  create_isProcessing:   PropTypes.bool.isRequired,
  create_alertMessage:   PropTypes.string.isRequired
}

function mapStateToProps( state ){
  const {
    create_company_code,
    create_company_name,
    create_address,
    create_mail,
    create_isProcessing,
    create_alertMessage
  } = state.rootReducer.create;
  return {
    create_company_code,
    create_company_name,
    create_address,
    create_mail,
    create_isProcessing,
    create_alertMessage
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    createActionBind: bindActionCreators(createActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContainer);