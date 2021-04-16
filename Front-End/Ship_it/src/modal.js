import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'terra-button';
import "bootstrap/dist/css/bootstrap.min.css";
import Input from 'terra-form-input';

export default class MyVerticallyCenteredModal extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        const { props } = this;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <center>EDIT DETAILS</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Jira Number:
        <Input
             name="JiraNo"
             placeholder="Eg: ABCD-3973"
             id="jno"
             value={this.props.jiranumber_list[this.props.ind]}
             onChange={event => this.props.jiranumberUpdate(event)}
             style={{marginLeft:'20px'}}
             />
        Summary:
        <Input
             name="TechDesign"
             placeholder="https://example/techdesign.docx"
             id="techd"
             value={this.props.jirasummary_list[this.props.ind]}
             onChange={event => this.props.jirasummaryUpdate(event)}
             style={{marginLeft:'20px'}}
         />
        Description:
        <Input
            name="GitRepo"
            placeholder="https://github.com/your_repo"
            id="grepo"
            value={this.props.jiradesc_list[this.props.ind]}
            onChange={event => this.props.jiradescUpdate(event)}
            style={{marginLeft:'10px'}}
          />
        </Modal.Body>
        <Modal.Footer>
        <Button text= "SAVE | CLOSE" onClick={props.onHide} variant="emphasis"/>
        </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}
