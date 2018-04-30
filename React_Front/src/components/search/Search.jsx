import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';


const Search = ({
  searchWord,
  searchedList,
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
      <Table>
        <TableBody
          displayRowCheckbox={false}
        >
          {searchedList.map( searchedData =>
            <TableRow>
              <TableRowColumn>{searchedData.company_code}</TableRowColumn>
              <TableRowColumn>{searchedData.company_name}</TableRowColumn>
              <TableRowColumn>{searchedData.address}</TableRowColumn>
              <TableRowColumn>{searchedData.mail}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
  onChangeSearchWord: PropTypes.func.isRequired,
  enterSearchEdit: PropTypes.func.isRequired
}

export default Search;