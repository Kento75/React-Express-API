import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const muiTheme = getMuiTheme();


const AppBarIconMenu = (props) => (
  <AppBar
    title='React Front'
    iconElementLeft={
      <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      {...props}
    >
      <MenuItem
        primaryText='top'
        containerElement={<Link to='/' />}
      />
      <MenuItem
        primaryText='search'
        containerElement={<Link to='/search' />}
      />
      <MenuItem
        primaryText='create'
        containerElement={<Link to='/create' />}
      />
      <MenuItem
        primaryText='HelloWorld'
        containerElement={<Link to='/helloworld' />}
      />
    </IconMenu>
    }
  />
);

class Header extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <header>
            <AppBarIconMenu />
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Header;