import React,{Component} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default class DOTags extends Component {
  constructor(props) {
    super(props);
    this.state={
      options:[],
      data:[]
    };
    //states of parent
    this.onOptions=this.onOptions.bind(this);
  }

  onOptions = (event) => {
    let val = event.target.value
    console.log(event.target.value)
    let url = "/rest/api/latest/user/search?username="+val+"&startAt=0"
    let base64 = require('base-64');
    let headers = new Headers();
    let username = this.props.user_id;
    let pwd = this.props.pwd;
    console.log(username,pwd)
    headers.append('Content-Type', 'application/json');
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + pwd));
    console.log(url)
    fetch(url,{
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          options: [...new Set(json.map(x => x.displayName))]
        });
      });
  }

  render() {
  console.log("state is", this.state); //displaying updated state
  return (
    <div style={{marginTop:"45px",marginLeft:"30px"}}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={this.state.options}
        onChange={(event,value) => this.props.getDOTags(event,value)}
        // getOptionLabel={(option) => option.title}
        // defaultValue={this.state.options[1]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="DO Approvers"
            placeholder="Assoc_name"
            onChange={(event) => this.onOptions(event) }
          />
        )}
      />
    </div>
  );
}
}