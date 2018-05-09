import { connect } from 'react-redux';
import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Search from '../../components/search/Search';
import AlertDialog from '../../components/common/AlertDialog';
import LoadingDialog from '../../components/common/LoadingDialog';
import UpdateDialog from '../../components/common/UpdateDialog';
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
    // チェックボックス
    this.handleOnRowSelect = this.handleOnRowSelect.bind(this);
    // 削除ボタン押下時
    this.handleOnClickDeleteBtn = this.handleOnClickDeleteBtn.bind(this);
    // 更新ボタン押下時
    this.handleOnClickUpdateBtn = this.handleOnClickUpdateBtn.bind(this);
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
  handleOnRowSelect(e){
    const { searchActionBind } = this.props;
    searchActionBind.selectRow(e);
  }

  // 削除ボタン押下時
  handleOnClickDeleteBtn() {
    const { searchActionBind } = this.props;
    searchActionBind.deleteData();
  }
  
  // todo 
  // 更新ボタン押下時
  handleOnClickUpdateBtn() {
    const { searchActionBind } = this.props;
    searchActionBind.showUpdateDialog();
  }

  render() {
    const {
      updateMode,
      updateList,
      BtnMode,
      searchWord,
      searchedList,
      paginationSearchedList,
      selectList,
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
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Search
            BtnMode={BtnMode}
            searchWord={searchWord}
            selectList={selectList}
            paginationSearchedList={paginationSearchedList}
            onChangeSearchWord={this.handleChangeSearchWord}
            enterSearchEdit={this.handleEnterSearchEdit}
            onChangeSort={this.handleChangeSort}
            onChangeCompanyCodeFilter={this.handleChangeCompanyCodeFilter}
            onChangeCompanyNameFilter={this.handleChangeCompanyNameFilter}
            onChangeAddressFilter={this.handleChangeAddressFilter}
            onChangeMailFilter={this.handleChangeMailFilter}
            onRowSelect={this.handleOnRowSelect}
            onClickDeleteBtn={this.handleOnClickDeleteBtn}
            onClickUpdateBtn={this.handleOnClickUpdateBtn}
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
          <UpdateDialog
            header={header}
            updateMode={updateMode}
            updateList={updateList}
          />
        </div>
      </MuiThemeProvider>
    );
  }
};

SearchContainer.propTypes = {
  updateMode: PropTypes.bool.isRequired,
  updateList: PropTypes.arrayOf(PropTypes.shape({
    company_code: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    address:      PropTypes.string.isRequired,
    mail:         PropTypes.string.isRequired
  })).isRequired,
  BtnMode: PropTypes.bool.isRequired,
  searchWord: PropTypes.string.isRequired,
  searchedList: PropTypes.arrayOf(PropTypes.shape({
    company_code: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    address:      PropTypes.string.isRequired,
    mail:         PropTypes.string.isRequired
  })).isRequired,
  selectList: PropTypes.any.isRequired,
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
    updateMode,
    updateList,
    BtnMode,
    searchWord,
    searchedList,
    selectList,
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
    updateMode,
    updateList,
    BtnMode,
    searchWord,
    searchedList,
    selectList,
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