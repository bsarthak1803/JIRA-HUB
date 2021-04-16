import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import MyVerticallyCenteredModal from './modal.js';


export default class JiraDisplay extends Component{
    constructor(props) {
        super(props);
        this.state = {
          modalShow:false,
          index:null,
        }
      this.setModalShow = this.setModalShow.bind(this);
      this.setModalHide = this.setModalHide.bind(this);
    }
    setModalHide = (event) => {
      this.setState({
        modalShow:!this.state.modalShow
      });
    }
  
    setModalShow = (event,indx) => {
      this.setState({
        index:indx,
        modalShow:!this.state.modalShow
      });
    }
    render(){
      console.log(this.props);

    return (
      <div style={{maxWidth:"1000px", marginBottom:"20px"}}>
      <br/>
        <Paper elevation={4}>
        <div style={{overflowY:"scroll"}} className="DisplayTable">
          <table>
            <tr>
              <td rowspan="2" style={{textAlign:"center",minWidth:"200px"}}>
                <Typography id="head"> Jira Number </Typography>
                <Typography> {this.props.jiranumber_list[this.props.ind]} </Typography>
              </td>
              <td>
                <Typography id="head" height="10px">  Summary: </Typography>
                <Typography> {this.props.jirasummary_list[this.props.ind]} </Typography>
              </td>
            </tr>
            <tr>
              <td>
               <Typography id="head"> Description: </Typography>
                <Typography> {this.props.jiradesc_list[this.props.ind]} </Typography>
              </td>
            </tr>
          </table>
        </div>
        <div className="Display_button">
          <Button style={{marginLeft:"20px", backgroundColor:"#0079BE"}}
            variant="contained" color="primary"
            startIcon={<EditIcon />}
            onClick={(event) => {this.setModalShow(event,this.props.ind)}}
            >
            Edit
          </Button>
          <Button style={{marginLeft:"20px"}}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={event => this.props.onJiraDelete(event,this.props.ind)}
          >
             Delete
          </Button>
        </div>
        </Paper>
      <div>
      <MyVerticallyCenteredModal
        ind={this.state.index}
        show={this.state.modalShow}
        onHide={(event) => this.setModalHide(event)}
        jiranumber_list={this.props.jiranumber_list}
        jirasummary_list={this.props.jirasummary_list}
        jiradesc_list={this.props.jiradesc_list}
        jiranumberUpdate={this.props.jiranumberUpdate}
        jirasummaryUpdate={this.props.jirasummaryUpdate}
        jiradescUpdate={this.props.jiradescUpdate}
      />
      </div>
      </div>
 );
}
}
