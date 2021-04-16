import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class Logout extends Component{

  constructor(props) {
    super(props);
    this.state = {
      anchorEl : null,
      val:''
  }
this.setAnchorEl = this.setAnchorEl.bind(this);
this.handleClose = this.handleClose.bind(this);
}

setAnchorEl = (event) => {
   this.setState({
    anchorEl : event.currentTarget
   })
  };

  handleClose = (event) => {
    window.sessionStorage.setItem('menu',event.currentTarget.dataset.myValue);
    this.setState({
      val: event.currentTarget.dataset.myValue,
      anchorEl : null,
     })
  };

  render() {

  return (
    <div style={{marginLeft:"80%"}}>
      <Button aria-controls="simple-menu" color="primary" aria-haspopup="true" onClick={this.setAnchorEl}>
        <p style={{color:"white", fontWeight:"bold",fontSize:"15px"}}>{this.props.u_id || window.sessionStorage.getItem('user_id')}</p>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
        onClick={this.props.onselect(this.state.val)}
      >
        <MenuItem onClick={event => this.handleClose(event)} data-my-value = "DI" >DI_TAB</MenuItem>
        <MenuItem onClick={event => this.handleClose(event)} data-my-value = "DO">DO_TAB</MenuItem>
        <MenuItem onClick={event => this.handleClose(event)} data-my-value = "logout">Logout</MenuItem>
      </Menu>
    </div>
  );
}
}