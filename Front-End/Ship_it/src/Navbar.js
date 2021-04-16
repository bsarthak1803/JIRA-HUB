import React from 'react';
import logo from './images/cernlogo.png'
import './App.css';
import './style.css';
import Logout from './logout';
import {Row, Col} from 'react-bootstrap';

function Navbar(props) {
    const u_id = props.usr_id;
    return (
<div className="Navbar">
     <header className="App-header">
        <Row>
            <img className = 'App-logo' src = {logo}/>
            <Logout u_id = {u_id} onselect = {props.onselect} />
        </Row>
     </header>
     <div id="heading">
         JIRA - HUB
     </div>
</div>
 );
}

export default Navbar;
