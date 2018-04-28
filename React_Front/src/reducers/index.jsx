import { combineReducers } from 'redux';
import search from './search/search';
import search from './create/create';

const rootReducer = combineReducers({
  search,
  create
});

export default rootReducer;