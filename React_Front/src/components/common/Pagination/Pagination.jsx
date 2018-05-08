import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './pagination_style.css';


const defaultProps = {
  margin: 1,
  page: 1,
  count: 0,
  total: 0
}

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPageChange = this.onPageChange.bind(this);
    this.goFirstPage = this.goFirstPage.bind(this);
    this.goLastPage = this.goLastPage.bind(this);
/*
    this.goPrevPage = this.goPrevPage.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
*/
  }
  componentWillReceiveProps(newProps) {
    if (newProps === this.props) return;
    const { margin, page, count } = newProps;
    const startPage = page > margin ? page - margin : 1;
    const endPage = page + margin > count ? count : page + margin;
    this.setState({ startPage, endPage, count });
  }

  onPageChange(event) {
    const index =
      Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    this.props.onPageChange(index + this.state.startPage);
  }

  goFirstPage() {
    this.props.onPageChange(1);
  }

  goLastPage() {
    this.props.onPageChange(this.state.count);
  }
/*
  goPrevPage() {
    this.props.onPageChange(this.props.page - 1);
  }

  goNextPage() {
    this.props.onPageChange(this.props.page + 1);
  }
*/
  render() {
    const { startPage, endPage, count } = this.state;
    const { page, margin } = this.props;
    const pages = [];

    const firstPage = page - margin > 1
          ? <span
              className="pagination-button"
              onClick={this.goFirstPage}
            >
              1
            </span>
          : null;

    const lastPage = page + margin < count
          ? <span
              className="pagination-button"
              onClick={this.goLastPage}
            >
              {count}
            </span>
          : null;
/*
    const prevPage = page === 1
          ? null
          : <div
              className="pagination-button"
              onClick={this.goPrevPage}
            >
              前のページ
            </div>;

    const nextPage = ((count === 0) || (page === count))
          ? null
          : <div
              className="pagination-button"
              onClick={this.goNextPage}
            >
              次のページ
            </div>;
*/
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          onClick={this.onPageChange}
          className={classnames('pagination-list-item', 'pagination-button', {
            active: i === this.props.page
          })}
        >
          {i}
        </span>
      );
    }

    return (
      <span id="pagination-container">
        <span id="pagination">
{/*          {prevPage}  */}
          {firstPage}
          <span id="pagination-list">
            {pages}
          </span>
          {lastPage}
{/*          {nextPage}  */}
        </span>
      </span>
    );
  }
}

Pagination.defaultProps = defaultProps;

export default Pagination;