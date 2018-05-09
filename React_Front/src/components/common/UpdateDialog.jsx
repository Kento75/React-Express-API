import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';


const UpdateDialog = ({
  updateMode,
  updateList
}) => (
  <Dialog
    actions={[
      <FlatButton
        label="キャンセル"
        primary={true}
        keyboardFocused={true}
        onClick={}
      />,
      <RaisedButton
        label="更新実行"
        primary={true}
        onTouchTap={}
      />
    ]}
    modal={false}
    open={updateMode}
    autoScrollBodyContent={true}
  >
  
  </Dialog>
);

ResultDialog.propTypes = {
  updateMode: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default ResultDialog;