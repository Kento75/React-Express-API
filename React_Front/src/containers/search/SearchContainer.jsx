import { connect } from 'react-redux';
import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Search from '../../components/search/Search';
import AlertDialog from '../../components/common/AlertDialog';
import LoadingDialog from '../../components/common/LoadingDialog';
import * as searchActions from '../../actions/search/search';


class SearchContainer extends Component {
  constructor(props) {
    super(props);

    // テーブル設定
    this.state = {
      page:        1,
      rowSize:     10,
      filterValue: null,
    };

    // 【検索ワード入力項目】値変更時
    this.handleChangeSearchWord = this.handleChangeSearchWord.bind(this);
    // 【検索ワード入力項目】入力項目でエンター押下時
    this.handleEnterSearchEdit = this.handleEnterSearchEdit.bind(this);
    // 【アラートダイアログ】OKボタン押下時
    this.handleOnClickOkBtn = this.handleOnClickOkBtn.bind(this);

    // テーブル制御系
    // 【フィルター項目】フィルター変更時
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    // 【テーブルヘッダ（ソートキー）】押下時
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    // 【ページ表示行数項目】変更時
    this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
    // 【前ページボタン】押下時
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    // 【次ページボタン】押下時
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
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
  handleFilterValueChange(...args) {
    // eslint-disable-next-line no-console
    let filterValue = get(args, '[0]', null);
    if (filterValue) {
      filterValue = filterValue.toLowerCase();
    }
    const newState = Object.assign({}, this.state, { filterValue });
    this.setState(newState);
  }

  // 【テーブルヘッダ（ソートキー）】押下時
  handleSortOrderChange(...args) {
    // eslint-disable-next-line no-console
    console.log('SortOrderChange', args);
  }

  // 【ページ表示行数項目】変更時
  handleRowSizeChange(rowSizeIndex, rowSize) {
    const newState = Object.assign({}, this.state, { page: 1, rowSize });
    this.setState(newState);
  }

  // 【前ページボタン】押下時
  handlePreviousPageClick() {
    const newState = Object.assign({}, this.state, { page: this.state.page - 1 });
    this.setState(newState);
  }

  // 【次ページボタン】押下時
  handleNextPageClick() {
    const newState = Object.assign({}, this.state, { page: this.state.page + 1 });
    this.setState(newState);
  }

  render() {
    const {
      searchWord,
      searchedList,
      isProcessing,
      alertMessage,
      count,
      page,
      rowSize
    } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Search
            searchWord={searchWord}
            searchedList={searchedList}
            onChangeSearchWord={this.handleChangeSearchWord}
            enterSearchEdit={this.handleEnterSearchEdit}
            onPreviousPageClick={this.handlePreviousPageClick}
            onNextPageClick={this.handleNextPageClick}
            onRowSizeChange={this.handleRowSizeChange}
            onCellClick={this.handleCellClick}
            onCellDoubleClick={this.handleCellDoubleClick}
            onFilterValueChange={this.handleFilterValueChange}
            onSortOrderChange={this.handleSortOrderChange}
            count={searchedList.length}
            page={this.state.page}
            rowSize={this.state.rowSize}
          />
          <LoadingDialog
            isLoadingOpen={isProcessing}
          />
          <AlertDialog
            message={alertMessage}
            onCloseDialog={this.handleOnClickOkBtn}
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
  isProcessing: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired, 
  page: PropTypes.number.isRequired, 
  rowSize: PropTypes.number.isRequired
}

function mapStateToProps( state ){
  const {
    searchWord,
    searchedList,
    isProcessing,
    alertMessage,
    count,
    page,
    rowSize
  } = state.rootReducer.search;
  return {
    searchWord,
    searchedList,
    isProcessing,
    alertMessage,
    count,
    page,
    rowSize
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