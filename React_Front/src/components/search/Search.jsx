import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import RaisedButton from 'material-ui/RaisedButton';
import CheckIcon from "material-ui/svg-icons/navigation/check";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import UpArrow from "material-ui/svg-icons/navigation/arrow-drop-up";
import Divider from 'material-ui/Divider';


const row = (
  x,
  i,
  header
) => {
  return (
    <TableRow key={`tr-${i}`}>
    {header.map((y, k) =>
      <TableRowColumn key={`trc-${k}`}>
        {x[y.prop]}
      </TableRowColumn>
      )}
    </TableRow>
  );
};

const Search = ({
  searchWord,
  searchedList,
  header,
  companyCodeFilter,
  companyNameFilter,
  addressFilter,
  mailFilter,
  columnToSort,
  sortDirection,
  onChangeSearchWord,
  enterSearchEdit,
  onChangeSort,
  onChangeCompanyCodeFilter,
  onChangeCompanyNameFilter,
  onChangeAddressFilter,
  onChangeMailFilter
}) => (
  <div>
    <div>
      <TextField
        hintText="検索ワード(会社コード)"
        floatingLabelText="Enterで検索"
        value={searchWord}
        onKeyDown={e => enterSearchEdit(e)}
        onChange={e => onChangeSearchWord(e)}
      />
    </div>
    <div>
      <TextField
        hintText='会社コード'
        floatingLabelText='会社コード'
        value={companyCodeFilter}
        onChange={e => onChangeCompanyCodeFilter(e)}
        floatingLabelFixed
      />
      <TextField
        hintText='会社名'
        floatingLabelText='会社名'
        value={companyNameFilter}
        onChange={e => onChangeCompanyNameFilter(e)}
        floatingLabelFixed
      />
      <TextField
        hintText='住所'
        floatingLabelText='住所'
        value={addressFilter}
        onChange={e => onChangeAddressFilter(e)}
        floatingLabelFixed
      />
      <TextField
        hintText='メールアドレス'
        floatingLabelText='メールアドレス'
        value={mailFilter}
        onChange={e => onChangeMailFilter(e)}
        floatingLabelFixed
      />
    </div>
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {header.map((x, i) => (
              <TableHeaderColumn key={`thc-${i}`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                  onClick={() => onChangeSort(x.prop)}
                >
                  <span>{x.name}</span>
                  {columnToSort == x.prop ? (
                    sortDirection === "asc" ? (
                      <UpArrow />
                    ) : (
                      <DownArrow />
                    )
                  ) : null}
                </div>
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchedList.map((x, i) =>
            row(
              x,
              i,
              header
            )
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);

Search.propTypes = {
  searchWord: PropTypes.string.isRequired,
  searchedList: PropTypes.arrayOf(PropTypes.shape({
    company_code: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    address:      PropTypes.string.isRequired,
    mail:         PropTypes.string.isRequired
  })).isRequired,
  header: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired
  })).isRequired,
  companyCodeFilter: PropTypes.string.isRequired,
  companyNameFilter: PropTypes.string.isRequired,
  addressFilter: PropTypes.string.isRequired,
  mailFilter: PropTypes.string.isRequired,
  onChangeCompanyCodeFilter: PropTypes.func.isRequired,
  onChangeCompanyNameFilter: PropTypes.func.isRequired,
  onChangeAddressFilter: PropTypes.func.isRequired,
  onChangeMailFilter: PropTypes.func.isRequired,
  columnToSort: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  onChangeSearchWord: PropTypes.func.isRequired,
  enterSearchEdit: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired
}

export default Search;