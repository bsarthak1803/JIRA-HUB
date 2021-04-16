import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import logo from './images/cernlogo.png'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      type: '',
      tp: '',
      age: ''
  }
}

    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    };

  render() {
        return (
        <div style={{textAlign:"center", height:"390px", paddingTop:"8%", backgroundColor:"#0079BE"}}>
          <header>
            <img className = 'App-logo' src = {logo}/>
          </header>
          <br/>
          <Paper elevation={3} className="root">
          <h2 style={{marginLeft:"-3%", color:"#0079BE", fontFamily:"Candara"}}>JIRA-HUB</h2>
          <br/>
          <div className="login-div">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle fontSize="large"/>
              </Grid>
              <Grid item>
                <TextField
                label="AssociateID"
                onChange = {event => this.props.addUserID(event)}
                value= {this.props.user_id}
                id="uid"
                required />
              </Grid>
            </Grid>
          </div>
          <div className="login-div">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <LockIcon  fontSize="large"/>
              </Grid>
              <Grid item>
                <TextField
                label="Password"
                type ="password"
                onChange = {event => this.props.addPassword(event)}
                value= {this.props.password}
                id="pwd"
                required
                />
              </Grid>
            </Grid>
          </div>
          <div className="login-type">
          <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
              <ArrowDropDownCircleIcon fontSize="large"/>
              </Grid>
              <Grid item>
          <FormControl>
            <NativeSelect
              style={{width:"166px"}}
              onChange={(event) => this.props.onselect(event)}
              placeholder="Select type">
              <option value="" disabled>
                Login Type
              </option>
              <option value="DI"> DI </option>
              <option value="DO">DO</option>
              </NativeSelect>
          </FormControl>
          </Grid>
          </Grid>
          </div>
          <br/>
          <br/>
          <Button variant="contained" style={{marginLeft:"-7px",width:"90px", backgroundColor:"#0079BE"}}
          color="primary" onClick = { (e) => {this.props.isAuthenticated(e)}}>
            Login
          </Button>
          <Button style={{marginLeft:"20px",width:"90px", backgroundColor:"#0079BE"}}
            variant="contained" color="primary" onClick = { (e) => {this.props.isAuthenticated(e)}}>
            Reset
          </Button>
          </Paper>
        </div>

    );
  }
}

