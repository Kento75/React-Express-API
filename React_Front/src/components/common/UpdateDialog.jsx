import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';


const row = (
  x,
  i,
  header,
  updateList
) => {
  return (
    <div>
      {header.map((y, k) =>
        <div>
          {
            y.primary
              ? <h3>{y.name}：{y.prop}</h3>
              : <TextField
                  hintText={y.name}
                  value={x[y.prop]}
                />
          }
        </div>
      )}
    </div>
  );
};

const UpdateDialog = ({
  updateMode,
  updateList,
  header
}) => (
  <Dialog
    actions={[
      <FlatButton
        label="キャンセル"
        primary={true}
        keyboardFocused={true}
      />,
      <RaisedButton
        label="更新実行"
        primary={true}
      />
    ]}
    modal={false}
    open={updateMode}
    autoScrollBodyContent={true}
  >
    <div>
      {updateList.map((x, i) => (
        row(
          x,
          i,
          header,
          updateList
        )
      ))}
    </div>
  </Dialog>
);

UpdateDialog.propTypes = {
  updateMode: PropTypes.bool.isRequired,
  updateList: PropTypes.any,
  header: PropTypes.any
};

export default UpdateDialog;