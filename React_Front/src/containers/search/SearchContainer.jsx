import { connect } from 'react-redux';
import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import orderBy from "lodash/orderBy";

import Search from '../../components/search/Search';
import AlertDialog from '../../components/common/AlertDialog';
import LoadingDialog from '../../components/common/LoadingDialog';
import Pagination from '../../components/common/Pagination/Pagination';
import * as searchActions from '../../actions/search/search';


class SearchContainer extends Component {
  constructor(props) {
    super(props);

    // 【検索ワード入力項目】値変更時
    this.handleChangeSearchWord = this.handleChangeSearchWord.bind(this);
    // 【検索ワード入力項目】入力項目でエンター押下時
    this.handleEnterSearchEdit = this.handleEnterSearchEdit.bind(this);
    // 【アラートダイアログ】OKボタン押下時
    this.handleOnClickOkBtn = this.handleOnClickOkBtn.bind(this);

    // テーブル制御系
    // 【フィルター項目】フィルター変更時
    this.handleChangeCompanyCodeFilter = this.handleChangeCompanyCodeFilter.bind(this);
    this.handleChangeCompanyNameFilter = this.handleChangeCompanyNameFilter.bind(this);
    this.handleChangeAddressFilter = this.handleChangeAddressFilter.bind(this);
    this.handleChangeMailFilter = this.handleChangeMailFilter.bind(this);
    // 【テーブルヘッダ（ソートキー）】押下時
    this.handleChangeSort = this.handleChangeSort.bind(this);
    // 【ページ表示行数項目】変更時
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  // 【検索ワード入力項目】値変更時
  handleChangeSearchWord(e){
    const { searchActionBind } = this.props;
    searchActionBind.changeSearchWord(e.target.value);
  }

  // 【検索ワード入力項目】入力項目でエンター押下時
  handleEnterSearchEdit(e){
    const { searchActionBind } = this.props;
    const ENTER_KEY_CODE = 13;
    if(e.keyCode == ENTER_KEY_CODE){
      searchActionBind.searchData();
    }
  }

  // 【アラートダイアログ】OKボタン押下時
  handleOnClickOkBtn(){
    const { searchActionBind } = this.props;
    searchActionBind.changeAlertMessage("");
  }

  // 【フィルター項目】フィルター変更時
  handleChangeCompanyCodeFilter(e) {
    const { searchActionBind } = this.props;
    searchActionBind.changeCompanyCodeFilter(e.target.value);
  }

  handleChangeCompanyNameFilter(e) {
    const { searchActionBind } = this.props;
    searchActionBind.changeCompanyNameFilter(e.target.value);
  }

  handleChangeAddressFilter(e) {
    const { searchActionBind } = this.props;
    searchActionBind.changeAddressFilter(e.target.value);
  }

  handleChangeMailFilter(e) {
    const { searchActionBind } = this.props;
    searchActionBind.changeMailFilter(e.target.value);
  }

  // 【テーブルヘッダ（ソートキー）】押下時
  handleChangeSort(e) {
    const { searchActionBind } = this.props;
    searchActionBind.changeSortMode(e);
  }
  
  // 【ページ表示行数項目】変更時
  handleChangePage(e) {
    const { searchActionBind } = this.props;
    searchActionBind.changePage(e);
  }
  
  // 検証　チェックボックス選択時のアクション
  onCtRowSelect(indexes){
    const { dispatch, bookCategories, onHover } = this.props;
    var newSelected = [];
    if(typeof indexes === "object"){
      for (var i = indexes.length - 1; i >= 0; i--) {
        newSelected.push(bookCategories[indexes[i]]);
      }
    }
    else if (typeof indexes === "number"){
        newSelected.push(bookCategories[indexes]);
    }
    dispatch(changeCtSelect(newSelected));
  }
  

  render() {
    const {
      searchWord,
      searchedList,
      paginationSearchedList,
      margin,
      page,
      count,
      total,
      isProcessing,
      alertMessage,
      header,
      companyCodeFilter,
      companyNameFilter,
      addressFilter,
      mailFilter,
      columnToSort,
      sortDirection
    } = this.props;
    const lowerCaseCompanyCodeFilter = companyCodeFilter.toLowerCase();
    const lowerCaseCompanyNameFilter = companyNameFilter.toLowerCase();
    const lowerCaseAddressFilter = addressFilter.toLowerCase();
    const lowerCaseMailFilter = mailFilter.toLowerCase();    
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Search
            searchWord={searchWord}
            paginationSearchedList={
              page === 1
                ? orderBy(
                    searchedList.filter(x =>
                        x['company_code']
                        .toLowerCase()
                        .includes(lowerCaseCompanyCodeFilter) 
                      ).filter(x =>
                        x['company_name']
                        .toLowerCase()
                        .includes(lowerCaseCompanyNameFilter)
                      ).filter(x =>
                        x['address']
                        .toLowerCase()
                        .includes(lowerCaseAddressFilter)
                      ).filter(x =>
                        x['mail']
                        .toLowerCase()
                        .includes(lowerCaseMailFilter)
                      ),
                      columnToSort,
                      sortDirection)
                      .slice(0, 10)
                : orderBy(
                  searchedList.filter(x =>
                      x['company_code']
                      .toLowerCase()
                      .includes(lowerCaseCompanyCodeFilter) 
                    ).filter(x =>
                      x['company_name']
                      .toLowerCase()
                      .includes(lowerCaseCompanyNameFilter)
                    ).filter(x =>
                      x['address']
                      .toLowerCase()
                      .includes(lowerCaseAddressFilter)
                    ).filter(x =>
                      x['mail']
                      .toLowerCase()
                      .includes(lowerCaseMailFilter)
                    ),
                    columnToSort,
                    sortDirection)
                    .slice((page - 1) * 10, (page - 1) * 10 + 1)}
            onChangeSearchWord={this.handleChangeSearchWord}
            enterSearchEdit={this.handleEnterSearchEdit}
            onChangeSort={this.handleChangeSort}
            onChangeCompanyCodeFilter={this.handleChangeCompanyCodeFilter}
            onChangeCompanyNameFilter={this.handleChangeCompanyNameFilter}
            onChangeAddressFilter={this.handleChangeAddressFilter}
            onChangeMailFilter={this.handleChangeMailFilter}
            companyCodeFilter={companyCodeFilter}
            companyNameFilter={companyNameFilter}
            addressFilter={addressFilter}
            mailFilter={mailFilter}
            header={header}
            page={page}
            columnToSort={columnToSort}
            sortDirection={sortDirection}
          />
          <LoadingDialog
            isLoadingOpen={isProcessing}
          />
          <AlertDialog
            message={alertMessage}
            onCloseDialog={this.handleOnClickOkBtn}
          />
          <Pagination
            margin={margin}
            page={page}
            count={ total === 0 
              ? 0
              : Math.ceil(total / 10)
            }
            onPageChange={this.handleChangePage}
          />
        </div>
      </MuiThemeProvider>
    );
  }
};

SearchContainer.propTypes = {
  searchWord: PropTypes.string.isRequired,
  searchedList: PropTypes.arrayOf(PropTypes.shape({
    company_code: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    address:      PropTypes.string.isRequired,
    mail:         PropTypes.string.isRequired
  })).isRequired,
  paginationSearchedList: PropTypes.arrayOf(PropTypes.shape({
    company_code: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    address:      PropTypes.string.isRequired,
    mail:         PropTypes.string.isRequired
  })).isRequired,
  margin: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  header: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired
  })).isRequired,
  companyCodeFilter: PropTypes.string.isRequired,
  companyNameFilter: PropTypes.string.isRequired,
  addressFilter: PropTypes.string.isRequired,
  mailFilter: PropTypes.string.isRequired,
  columnToSort: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired
}

function mapStateToProps( state ){
  const {
    searchWord,
    searchedList,
    paginationSearchedList,
    margin,
    page,
    count,
    total,
    isProcessing,
    alertMessage,
    header,
    companyCodeFilter,
    companyNameFilter,
    addressFilter,
    mailFilter,
    columnToSort,
    sortDirection
  } = state.rootReducer.search;
  return {
    searchWord,
    searchedList,
    paginationSearchedList,
    margin,
    page,
    count,
    total,
    isProcessing,
    alertMessage,
    header,
    companyCodeFilter,
    companyNameFilter,
    addressFilter,
    mailFilter,
    columnToSort,
    sortDirection
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    searchActionBind: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);