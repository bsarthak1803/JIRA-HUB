import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navbar from './Navbar';
import './style.css';
import MyVerticallyCenteredModal from './modal.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './login.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import JiraDisplay from './Jira_Display';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DITags from './diapprovers.js';
import DOTags from './doapprovers.js';
import DO from './DO_Tab.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id:'',
      password:'',
      testcase:'',
      jiranumber:'',
      jirasummary:'',
      jiradescription:'',
      jiranumber_list:[],
      jirasummary_list:[],
      jiradesc_list:[],
      Authenticate:false,
      ditags:[],
      dotags:[],
      tab_type: window.sessionStorage.getItem('tab_type')
    };

    this.AddJira = this.AddJira.bind(this);
    this.addJIRANumber = this.addJIRANumber.bind(this);
    this.addJIRASummary = this.addJIRASummary.bind(this);
    this.addJIRADesc = this.addJIRADesc.bind(this);
    this.jiranumberUpdate = this.jiranumberUpdate.bind(this);
    this.jirasummaryUpdate = this.jirasummaryUpdate.bind(this);
    this.jiradescUpdate = this.jiradescUpdate.bind(this);
    this.getDITags = this.getDITags.bind(this);
    this.getDOTags = this.getDOTags.bind(this);
    this.onselect = this.onselect.bind(this);
    this.onselectDI = this.onselectDI.bind(this);
    this.onselectDO = this.onselectDO.bind(this);

  }

  componentDidMount(){
   if(!this.state.tab_type){
      window.sessionStorage.setItem('tab_type','DI')
      this.setState({
        tab_type:'DI'
      })
   }
  }

  onselectDI = (value) => {
    if ((value == 'DI' || value == 'DO') && window.sessionStorage.getItem('tab_type') != value ){
      window.sessionStorage.setItem('tab_type',value);
      this.setState({
      tab_type: value
    })
    }
    else if(value == 'logout'){
      window.sessionStorage.clear();
      window.sessionStorage.setItem('tab_type','DI');
      this.setState({
        Authenticate: false,
        tab_type: 'DI'
      })
    }
  }

  onselectDO = (value) => {
    if ((value == 'DI' || value == 'DO') && window.sessionStorage.getItem('tab_type') != value){
      window.sessionStorage.setItem('tab_type',value);
      this.setState({
      tab_type: value
    })
    }
    else if(value == 'logout'){
      window.sessionStorage.clear();
      window.sessionStorage.setItem('tab_type','DI');
      this.setState({
        Authenticate: false,
        tab_type: 'DI'
      })
    }
  }

  onselect = (event) => {
    window.sessionStorage.setItem('tab_type',event.nativeEvent.target.value)
    this.setState({
      tab_type: event.nativeEvent.target.value
    })
  }

  getDITags = (event,val) => {
    this.setState({
      ditags:val
    })
  }

  getDOTags = (event,val) => {
    console.log(val)
    this.setState({
      dotags:val
    })
  }

  isAuthenticated = (event) => {
    if(document.getElementById("uid").value === '' || document.getElementById("pwd").value === '' )
      alert('Please Enter the UserID and Password');
    else{
    let base64 = require('base-64');
    let url = '/rest/api/latest/serverInfo';
    let username = this.state.user_id;
    let pwd = this.state.password;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + pwd));
      event.preventDefault();
      fetch(url,{
        method: "GET",
        headers: headers
      })
      .then(processResponse)
    .then(res => {
        const { statusCode, data } = res;
        if (statusCode === 200){
          this.setState({
            Authenticate:true
          })
        window.sessionStorage.setItem('user_id',username);
        window.sessionStorage.setItem('pwd',pwd);
      }
    }) .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  function processResponse(response) {
    const statusCode = response.status;
    if(statusCode === 401){
      alert("Wrong Credentials!!")
    }
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
  }
}

onSubmit = (event) => {
  let array = {
    userID:this.state.user_id,
    pwd:this.state.password,
    jiranumber_list: this.state.jiranumber_list,
    jirasummary_list: this.state.jirasummary_list,
    jiradesc_list: this.state.jiradesc_list,
  };
  // console.log(array);
   fetch("http://localhost:8000/jira_hub", {
   method: "post",
   headers: {
   "Content-Type": "application/json"
   },
   body: JSON.stringify(array)
   })
.then((resp)=>{ return resp.text() }).then((text)=>{ alert(text)})
}


  addUserID = (event) => {
    let value = event.nativeEvent.target.value;
    this.setState({
      user_id:value
    });
  };

  addPassword = (event) => {
    let value = event.nativeEvent.target.value;
    this.setState({
      password:value
    });
  };

  addJIRANumber = (event) => {
    let value = event.nativeEvent.target.value;
    this.setState({
      jiranumber: value
    });
  };

  addJIRASummary = (event) => {
    let value = event.nativeEvent.target.value;
    this.setState({
      jirasummary: value
    });
  };

  addJIRADesc = (event) => {
    let value = event.nativeEvent.target.value;
    this.setState({
      jiradescription: value
    });
  };


  AddJira = (event) => {
    document.getElementById("jira_number").value = '';
    document.getElementById("jira_summary").value = '';
    document.getElementById("jira_description").value = '';
    var x = document.getElementById("navigator");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

    this.setState({
      jiranumber_list:[...this.state.jiranumber_list,this.state.jiranumber],
      jirasummary_list:[...this.state.jirasummary_list,this.state.jirasummary],
      jiradesc_list:[...this.state.jiradesc_list,this.state.jiradescription]
    });
  }

  onJiraDelete = (event,ind) => {
    if (window.confirm("Continue Deleting JIRA?")){
    var stateCopy = Object.assign({}, this.state);
    var a = this.state.jiranumber_list.filter((value1, index1) => {
      return index1 !== ind;
    });

    stateCopy.jiranumber_list = stateCopy.jiranumber_list.slice();
      stateCopy.jiranumber_list = Object.assign(
        {},
        stateCopy.jiranumber_list
      );
      stateCopy.jiranumber_list = a;
      this.setState(stateCopy);

    var b = this.state.jirasummary_list.filter((value1, index1) => {
      return index1 !== ind;
    });

    stateCopy.jirasummary_list = stateCopy.jirasummary_list.slice();
      stateCopy.jirasummary_list = Object.assign(
        {},
        stateCopy.jirasummary_list
      );
      stateCopy.jirasummary_list = b;
      this.setState(stateCopy);

    var c = this.state.jiradesc_list.filter((value1, index1) => {
      return index1 !== ind;
    });

    stateCopy.jiradesc_list = stateCopy.jiradesc_list.slice();
      stateCopy.jiradesc_list = Object.assign(
        {},
        stateCopy.jiradesc_list
      );
      stateCopy.jiradesc_list = c;
      this.setState(stateCopy);
    }
  }

  jiranumberUpdate = (event) => {
    let value = event.nativeEvent.target.value;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.jiranumber_list = stateCopy.jiranumber_list.slice();
    stateCopy.jiranumber_list[this.state.ind] = Object.assign({},
          stateCopy.jiranumber_list[this.state.ind]
        );
    stateCopy.jiranumber_list[this.state.ind]=value
    this.setState(stateCopy);
  }

  jirasummaryUpdate = (event) => {
    let value = event.nativeEvent.target.value;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.jirasummary_list = stateCopy.jirasummary_list.slice();
    stateCopy.jirasummary_list[this.state.ind] = Object.assign({},
          stateCopy.jirasummary_list[this.state.ind]
        );
    stateCopy.jirasummary_list[this.state.ind]=value
    this.setState(stateCopy);
  }

  jiradescUpdate = (event) => {
    let value = event.nativeEvent.target.value;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.jiradesc_list = stateCopy.jiradesc_list.slice();
    stateCopy.jiradesc_list[this.state.ind] = Object.assign({},
          stateCopy.jiradesc_list[this.state.ind]
        );
    stateCopy.jiradesc_list[this.state.ind]=value
    this.setState(stateCopy);
  }

  render() {
  console.log("state is", this.state);
  console.log(window.sessionStorage.getItem('user_id'));
  console.log(window.sessionStorage.getItem('pwd'));
  console.log(window.sessionStorage.getItem('tab_type'));
  return (
    <div className="App" id="top">
    {!this.state.Authenticate && !(window.sessionStorage.getItem('user_id') && window.sessionStorage.getItem('pwd')) ? (
      <Login
      user_id = {this.state.user_id}
      password = {this.state.password}
      addUserID = {this.addUserID}
      addPassword = {this.addPassword}
      isAuthenticated = {this.isAuthenticated}
      onselect = {this.onselect}
      />
      ):null}
      {this.state.Authenticate || (window.sessionStorage.getItem('user_id') && window.sessionStorage.getItem('pwd') ) ? (
      this.state.tab_type === 'DI' ? (
      <div>
      <Navbar usr_id = {this.state.user_id} onselect = {this.onselectDI} />
      <br/>
      <Paper elevation={3} className="paper_main">
      <div className = "InputForm">
        <table>
          <tr>
            <td id="label">
            <TextField id="jira_number"
            label="Jira Number"
            variant="outlined"
            placeholder="Eg: ABCD-1234"
            InputLabelProps={{
              shrink: true,
            }}
            onChange ={event => this.addJIRANumber(event)}/>
            </td>
            <td id="label">
            <TextField
            id="jira_summary"
            label="Summary"
            placeholder="Eg: Jira Summary"
            style={{width:"680px"}}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange ={event => this.addJIRASummary(event)}
            />
            </td>
          </tr>
          <tr>
          <td id="label" colSpan="2">
            <TextField
            id="jira_description"
            label="Description"
            placeholder="Eg: Jira Description"
            multiline
            rows={4}
            style={{width:"930px"}}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange ={event => this.addJIRADesc(event)}
            />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
          <DITags
           user_id = {this.state.user_id}
           pwd = {this.state.password}
           getDITags={this.getDITags}
           />
          <DOTags
          user_id = {this.state.user_id}
          pwd = {this.state.password}
          getDOTags = {this.getDOTags}
          />
          </td>
          </tr>
          <tr>
          <td colSpan="2" id="mergerow">
            <Button style={{marginLeft:"15px",width:"100px", backgroundColor:"#0079BE"}}
            variant="contained" color="primary" onClick = {event => this.AddJira(event)}>
            Add Jira
            </Button>
            </td>
          </tr>
        </table>
      </div>
      </Paper>
      <div id="navigator" style={{display:"none"}}>
      <a href="#top">
      <Fab color="action" aria-label="add" style={{marginBottom:"10px"}}>
        <KeyboardArrowUpIcon />
      </Fab>
      </a>

      <br/>
      <a href="#submit">
      <Fab color="action" aria-label="add">
        <KeyboardArrowDownIcon />
      </Fab>
      </a>
    </div>
  { this.state.jiranumber_list.length > 0 ? (
      <div id="jiratable">
        {this.state.jiranumber_list.map((value,index) => { return(
              <JiraDisplay key={index}
              ind={index}
              jiranumber_list={this.state.jiranumber_list}
              jirasummary_list={this.state.jirasummary_list}
              jiradesc_list={this.state.jiradesc_list}
              onJiraDelete={this.onJiraDelete}
              jiranumberUpdate={this.jiranumberUpdate}
              jirasummaryUpdate={this.jirasummaryUpdate}
              jiradescUpdate={this.jiradescUpdate}
              />
            );})}
        <Button style={{marginLeft:"410px",width:"150px",marginBottom:"30px", backgroundColor:"#0079BE"}}
        variant="contained" color="primary" id="submit">
           Create JForm
        </Button>
      </div> ):null
    } </div>) : <DO usr_id = {this.state.user_id} onselect = {this.onselectDO} /> ) : null
} </div>
);
}
}


export default App;
