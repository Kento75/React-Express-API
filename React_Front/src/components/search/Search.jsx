import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import DataTables from 'material-ui-datatables';


// カラム名、キーの設定
const TABLE_COLUMNS = [
  {
    key: 'company_code',
    label: '会社コード',
  }, {
    key: 'company_name',
    label: '会社名',
  },
  {
    key: 'address',
    label: '住所',
  }, {
    key: 'mail',
    label: 'メールアドレス',
  }
];

const Search = ({
  searchWord,
  searchedList,
  count,
  page,
  rowSize,
  onChangeSearchWord,
  enterSearchEdit
}) => (
  <div>
    <div>
      <TextField
        hintText="検索ワード(会社コード)"
        floatingLabelText="Enterで検索"
        value={ searchWord }
        onKeyDown={e => enterSearchEdit(e)}
        onChange={e => onChangeSearchWord(e)}
      />
    </div>
    <div>
      <DataTables
        height={'auto'}
        selectable={true}
        multiSelectable={true}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={searchedList}
        showCheckboxes={true}
        showHeaderToolbar={true}
        onPreviousPageClick={e => onPreviousPageClick(e)}
        onNextPageClick={e => onNextPageClick(e)}
        onRowSizeChange={e => onRowSizeChange(e, rowSize)}
        onFilterValueChange={e => onFilterValueChange(e)}
        onSortOrderChange={e => onSortOrderChange(e)}
        count={count}
        page={page}
        rowSize={rowSize}
      />
      <Divider />
    </div>
  </div>
)

Search.propTypes = {
  searchWord: PropTypes.string.isRequired,
  searchedList: PropTypes.arrayOf(PropTypes.shape({
    company_code: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    address:      PropTypes.string.isRequired,
    mail:         PropTypes.string.isRequired
  })).isRequired,
  count: PropTypes.number.isRequired, 
  page: PropTypes.number.isRequired, 
  rowSize: PropTypes.number.isRequired,
  onChangeSearchWord: PropTypes.func.isRequired,
  enterSearchEdit: PropTypes.func.isRequired
}

export default Search;