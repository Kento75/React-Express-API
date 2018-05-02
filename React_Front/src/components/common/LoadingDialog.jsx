import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

const componentStyles = {
  dialog: {
    width: '45%',
    maxWidth: 'none'
  }
};

const LoadingDialog = ({
  isLoadingOpen
}) => (
  <Dialog
    actions={[]}
    modal={true}
    open={ isLoadingOpen }
    contentStyle={componentStyles.dialog}
  >
    <div style={{textAlign: "center"}}>
      <LinearProgress mode="indeterminate" color="#FF9800" />
    </div>
  </Dialog>
);

LoadingDialog.propTypes = {
  isLoadingOpen: PropTypes.bool.isRequired
};

export default LoadingDialog;