import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


const defaultProps = {
  margin: 1,
  page: 1,
  count: 0,
  total: 0
}

const style = {
  margin: 6,
};

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
          ? <RaisedButton
              label="1"
              primary={true}
              style={style}
              onClick={this.goFirstPage}
            />
          : null;

    const lastPage = page + margin < count
          ? <RaisedButton
              label={count}
              primary={true}
              style={style}
              onClick={this.goLastPage}
            />
          : null;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          style={{display : 'inline-block'}}
          key={i}
          
        >
          <RaisedButton
            label={i}
            primary={true}
            style={style}
            onClick={this.onPageChange}
          />          
        </li>
      );
    }

    return (
      <span>
        <span>
          {firstPage}
          <span style={{display : 'inline-block'}}>
            {pages}
          </span>
          {lastPage}
        </span>
      </span>
    );
  }
}

Pagination.defaultProps = defaultProps;

export default Pagination;