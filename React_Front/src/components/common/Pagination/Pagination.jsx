import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import style from './pagination_style.js';

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

  render() {
    const { startPage, endPage, count } = this.state;
    const { page, margin } = this.props;
    const pages = [];

    const firstPage = page - margin > 1
          ? <div
              style={style.firstOrLastEln}
              onClick={this.goFirstPage}
            >
              {count}
            </div>
          : null;

    const lastPage = page + margin < count
          ? <div
              style={style.firstOrLastEln}
              onClick={this.goLastPage}
            >
              {count}
            </div>
          : null;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          style={style.pageEln}
          key={i}
          onClick={this.onPageChange}
        >
         {i}
        </li>
      );
    }

    return (
      <span>
        <span>
          {firstPage}
          <ul style={{display : 'inline-block'}}>
            {pages}
          </ul>
          {lastPage}
        </span>
      </span>
    );
  }
}

Pagination.defaultProps = defaultProps;

export default Pagination;