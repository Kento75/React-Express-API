import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';


const Create = ({
  company_code,
  company_name,
  address,
  mail,
  onChangeCompanyCode,
  onChangeCompanyName,
  onChangeAddress,
  onChangeMail,
  onClickRegisterBtn
}) => (
  <div>
    <div>
      <TextField
        hintText="会社コード"
        floatingLabelText="会社コード"
        value={ company_code }
        onChange={e => onChangeCompanyCode(e)}
      />
    </div>
    <br />
    <div>
      <TextField
        hintText="会社名"
        floatingLabelText="会社名"
        value={ company_name }
        onChange={e => onChangeCompanyName(e)}
      />
    </div>
    <br />
    <div>
      <TextField
        hintText="住所"
        floatingLabelText="住所"
        value={ address }
        onChange={e => onChangeAddress(e)}
      />
    </div>
    <br />
    <div>
      <TextField
        hintText="メールアドレス"
        floatingLabelText="メールアドレス"
        value={ mail }
        onChange={e => onChangeMail(e)}
      />
    </div>
    <br />
    <RaisedButton
      label="登録実行"
      secondary={true}
      onClick={onClickRegisterBtn}
    />
  </div>
)

Create.propTypes = {
  company_code:         PropTypes.string.isRequired,
  company_name:         PropTypes.string.isRequired,
  address:              PropTypes.string.isRequired,
  mail:                 PropTypes.string.isRequired,
  onChangeCompanyCode:  PropTypes.func.isRequired,
  onChangeCompanyName:  PropTypes.func.isRequired,
  onChangeAddress:      PropTypes.func.isRequired,
  onChangeMail:         PropTypes.func.isRequired,
  onClickRegisterBtn:   PropTypes.func.isRequired
}

export default Create;