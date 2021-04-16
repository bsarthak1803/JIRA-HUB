import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navbar from './Navbar';
import './style.css';
import Paper from '@material-ui/core/Paper';
import Login from './login.js';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';


export default class DO extends Component {
    constructor(props) {
      super(props);
      }
render() {
    return (
        <div className="App" id="top">
        <div>
        <Navbar usr_id = {this.props.usr_id} onselect = {this.props.onselect}/>
        <br/>
        <Paper elevation={3} className="paper-DO_tab">
            <div className="div-DO_tab">
            <TextField id="jira_number"
                label="Jira Number"
                variant="outlined"
                style={{width:"500px"}}
                placeholder="Eg: ABCD-1234"/>

            <Button style={{marginLeft:"15px",width:"100px",height:"55px", backgroundColor:"#0079BE"}}
            variant="contained" color="primary" onClick = {event => this.AddJira(event)}>
            Add Jira
            </Button>
            </div>
        </Paper>
        </div>

        <div style={{maxWidth:"1200px", marginTop:"5%", marginBottom:"20px",marginLeft:"14%"}}>
        <Paper elevation={4}>
        <div style={{overflow:"scroll",marginLeft:"14px"}} className="DisplayTable">
        <p style={{textAlign:"center", fontSize:"25px"}}> JIRA DETAILS </p>
        <hr color="black"/>
        <br/> <br/>
          <table>
            <tr>
              <td rowspan="5" style={{textAlign:"center",minWidth:"200px"}}>
                <Typography id="head"> Jira Number </Typography>
                <Typography> ABCD - 1234 </Typography>
              </td>
              <td style={{maxWidth:"500px"}}>
                <Typography id="head" height="10px">  Summary: </Typography>
                <Typography>  </Typography>
                <hr style={{width:"900px"}}/>
              </td>
            </tr>
            <tr>
              <td>
               <Typography id="head"> Description: </Typography>
                <Typography>  </Typography>
                <hr style={{width:"900px"}}/>
              </td>
            </tr>
            <tr>
              <td>
                <Typography id="head" height="10px">  Requirements: </Typography>
                <Typography>  </Typography>
                <hr style={{width:"900px"}}/>
              </td>
            </tr>
            <tr>
              <td>
                <Typography id="head" height="10px">  Code Review: </Typography>
                <Typography>  </Typography>
                <hr style={{width:"900px"}}/>
              </td>
            </tr>
            <tr>
              <td>
                <Typography id="head" height="10px">  Test Case: </Typography>
                <Typography>  </Typography>
                <hr style={{width:"900px"}}/>
              </td>
            </tr>

          </table>
        </div>
        <div className="Display_button" style={{marginLeft:"480px"}}>
          <Button style={{marginLeft:"20px", width:"123px", backgroundColor:"#0079BE"}}
            variant="contained" color="primary"
            startIcon={<EditIcon />}
            >
            Edit
          </Button>
          <Button style={{marginLeft:"20px"}}
            variant="contained"
            color="secondary"
            startIcon={<CheckIcon />}
          >
             Approve
          </Button>
        </div>
        </Paper>
        </div>
        </div>


    );}
}