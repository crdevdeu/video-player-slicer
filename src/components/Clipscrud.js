import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createNewClip,
  cancelCreateNewClip,
  clipStartHourChanged,
  clipStartMinuteChanged,
  clipStartSecondChanged,
  clipEndHourChanged,
  clipEndMinuteChanged,
  clipEndSecondChanged,
  newClipNameChanged,
  newClipTagChanged,
  addNewClip,
  showError,
  saveEditedClip
} from '../actions';
import { Alert } from 'react-bootstrap';

/* Clipscrud component controls the interphase for creating a new clip, all
inputs are binded to redux store, every time an input changes it calls an
action creator wich dispatches an action to update its corresponding value in
the application state. The "Create new clip" button is also binded to a redux store state,
if that state is false it will render the button, if true it will render the interphase
to create a new clip.
*/

class Clipscrud extends Component {
//Method to change redux state and display the interphase for creating a new clip
  newClip() {
    this.props.createNewClip();
  }
  // Method to change redux state and hide the interphase for creating or editing a clip
  cancelCreate() {
    this.props.cancelCreateNewClip(this.props.fullvidduration);
  }
  /*Method to add a new clip to the list using inputs parmeters validation is performed
  to insure that name and tagname fields arent empty and starttime if before endtime , if validation isnt passed
  an action creator is called to modify the app state and show an error
  */
  createClip() {
    const { clipstartvalue, clipendsvalue, newclipnamevalue, newcliptagvalue, fullvidduration } = this.props;
    const newClip = {
      videostart: clipstartvalue,
      videoend: clipendsvalue,
      name: newclipnamevalue,
      tagname: newcliptagvalue
    };
    if(newcliptagvalue !== '' && newclipnamevalue !== ''){
      if(this.compareStartAnEndTime()){
        this.props.addNewClip(newClip,fullvidduration);
      } else {
       this.props.showError(2);
      }
    } else {
      this.props.showError(1);
    }
  }
  /*Method to save changes performed to an existing clip, input validations are
  excecuted in the same matter as when the user creates a new clip
  */
  saveEditClip(){
        const { clipstartvalue, clipendsvalue, newclipnamevalue, newcliptagvalue, fullvidduration, editindex } = this.props;
        const newClip = {
          videostart: clipstartvalue,
          videoend: clipendsvalue,
          name: newclipnamevalue,
          tagname: newcliptagvalue
        };
        if(newcliptagvalue !== '' && newclipnamevalue !== ''){
          if(this.compareStartAnEndTime()){
            this.props.saveEditedClip(newClip,editindex,fullvidduration,this.props.listofclips[editindex].persisted);
          } else {
           this.props.showError(2);
          }
        } else {
          this.props.showError(1);
        }
    }
  //Inputs changes handlers
  clipNameChanged(event) {
    this.props.newClipNameChanged(event.target.value);
  }
  clipTagChanged(event) {
    this.props.newClipTagChanged(event.target.value);
  }
  /*On start time and end time changes a validation is performed to insure that
  the corresponding inputs values arent greater than the full video length wich
  is stored in the application state cointained in redux store
  */
  compareStartAnEndTime(){
    const { clipstartvalue } = this.props;
    const { clipendsvalue } = this.props;
    const startSeconds = clipstartvalue.hours * 3600 + clipstartvalue.minutes * 60 + clipstartvalue.seconds;
    const endSeconds = clipendsvalue.hours * 3600 + clipendsvalue.minutes * 60 + clipendsvalue.seconds;
    return startSeconds < endSeconds;
  }
  startHourChanged(event){
    const number = Math.abs(event.target.value);
    if(number <= this.props.fullvidduration.hours){
      this.props.clipStartHourChanged(number);
      this.props.clipStartMinuteChanged(0);
    }
  }
  startMinuteChanged(event){
    const number = Math.abs(event.target.value);
    if(this.props.fullvidduration.hours > 0 && this.props.clipstartvalue.hours < this.props.fullvidduration.hours && number < 60){
      this.props.clipStartMinuteChanged(number);
      this.props.clipStartSecondChanged(0);
    }
    else if(number <= this.props.fullvidduration.minutes){
      this.props.clipStartMinuteChanged(number);
      this.props.clipStartSecondChanged(0);
    }
  }
  startSecondChanged(event){
    const number = Math.abs(event.target.value);
    if(this.props.fullvidduration.minutes > 0 && this.props.clipstartvalue.minutes < this.props.fullvidduration.minutes && number < 60){
      this.props.clipStartSecondChanged(number);
    }
    else if(number < this.props.fullvidduration.seconds){
      this.props.clipStartSecondChanged(number);
    }
  }
  endHourChanged(event){
    const number = Math.abs(event.target.value);
    if(number <= this.props.fullvidduration.hours){
      this.props.clipEndHourChanged(number);
      this.props.clipEndMinuteChanged(0);
    }
  }
  endMinuteChanged(event){
    const number = Math.abs(event.target.value);
    if(this.props.fullvidduration.hours > 0 && this.props.clipendsvalue.hours < this.props.fullvidduration.hours && number < 60){
      this.props.clipEndMinuteChanged(number);
      this.props.clipEndSecondChanged(0);
    }
    else if(number <= this.props.fullvidduration.minutes){
      this.props.clipEndMinuteChanged(number);
      this.props.clipEndSecondChanged(0);
    }
  }
  endSecondChanged(event){
    const number = Math.abs(event.target.value);
    if(this.props.fullvidduration.minutes > 0 && this.props.clipendsvalue.minutes < this.props.fullvidduration.minutes && number < 60){
      this.props.clipEndSecondChanged(number);
    }
    else if(number <= this.props.fullvidduration.seconds){
      this.props.clipEndSecondChanged(number);
    }
  }
  //Render input errors
  renderError(){
    if(this.props.inputerror){
      return (
        <Alert bsStyle="warning">
          <strong>Clipname and tag are required fields</strong>
      </Alert>
      );
    } else if(this.props.playintervalerror){
      return (
        <Alert bsStyle="warning">
          <strong>The clip end time value must be later than start value</strong>
      </Alert>
      );
    }
  }
  //Render new clip created success message
  renderSuccess() {
    if(this.props.clipaddedsuccess){
      return (
      <Alert bsStyle="warning">
          <strong>New clip successfully added</strong>
      </Alert>
      );
    }
  }
  //render new clip edited success message
  renderEditSucess(){
    if(this.props.clipeditedsuccess){
      return (
      <Alert bsStyle="warning">
          <strong>The clip was successfully edited</strong>
      </Alert>
      );
    }
  }
  /*render the interphase for creating/editing a new clip, depending on state
  value, create clip or save changes button is shown
  */
  renderNewClipForm() {
   if(this.props.createclip || this.props.editclip){
    return(
      <div>
        {this.renderError()}
        {this.props.editclip ? <h2>Edit clip</h2>: null}
        <form className="Form-style">
          <div className="form-group">
            <label>Clip name:&nbsp;</label>
            <input type="text" value={this.props.newclipnamevalue} onChange={this.clipNameChanged.bind(this)} />
          </div>
          <div className="form-group">
            <label>Clip Tag:&nbsp;</label>
            <input type="text" value={this.props.newcliptagvalue} onChange={this.clipTagChanged.bind(this)} />
          </div>
          <div className="form-group">
              <p className="Start-time"><strong>Start time</strong></p>
              <div className="col-xs-4">
                <label>Hours:</label>
                <input type="number" value={this.props.clipstartvalue.hours} className="form-control" onChange={this.startHourChanged.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <label>Minutes:</label>
                <input type="number" value={this.props.clipstartvalue.minutes} className="form-control" onChange={this.startMinuteChanged.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <label>Seconds:</label>
                <input type="number" value={this.props.clipstartvalue.seconds} className="form-control" onChange={this.startSecondChanged.bind(this)}/>
              </div>
          </div>
          <div className="form-group">
            <p className="End-time"><strong>End time</strong></p>
            <div className="col-xs-4">
              <label>Hours:</label>
              <input type="number" value={this.props.clipendsvalue.hours} className="form-control" onChange={this.endHourChanged.bind(this)}/>
            </div>
            <div className="col-xs-4">
              <label>Minutes:</label>
              <input type="number" value={this.props.clipendsvalue.minutes} className="form-control" onChange={this.endMinuteChanged.bind(this)}/>
            </div>
            <div className="col-xs-4">
              <label>Seconds:</label>
              <input type="number" value={this.props.clipendsvalue.seconds} className="form-control" onChange={this.endSecondChanged.bind(this)}/>
            </div>
          </div>
        </form>
        {this.props.createclip ?
        <button className="btn btn-primary button-interphase"
        onClick={this.createClip.bind(this)}>Create clip</button>
        : null}
        {this.props.editclip ?
        <button className="btn btn-primary button-interphase"
        onClick={this.saveEditClip.bind(this)}>Save changes</button>
        :null
        }
      <button className="btn btn-danger button-interphase" onClick={this.cancelCreate.bind(this)}>Cancel</button>
     </div>
      );
    }
    return (
      <div>
        {this.renderSuccess()}
        {this.renderEditSucess()}
        <button className="btn btn-success" onClick={this.newClip.bind(this)}>New clip</button>
      </div>
     );
  }
  render() {
    return (

      <div className="Clips-crud-container">
          {this.renderNewClipForm()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    createclip: state.interphase.newclip,
    fullvidduration: state.videostate.duration,
    clipstartvalue: state.interphase.clipstart,
    clipendsvalue: state.interphase.clipends,
    newclipnamevalue: state.interphase.clipname,
    newcliptagvalue: state.interphase.tag,
    inputerror: state.interphase.inputerror,
    clipaddedsuccess: state.interphase.clipaddedsuccess,
    playintervalerror: state.interphase.playintervalerror,
    editclip: state.interphase.editclip,
    editindex: state.interphase.editindex,
    clipeditedsuccess: state.interphase.clipeditedsuccess,
    listofclips: state.clipslist.clips
  };
}

export default connect(mapStateToProps,{
  createNewClip,
  cancelCreateNewClip,
  clipStartHourChanged,
  clipStartMinuteChanged,
  clipStartSecondChanged,
  clipEndHourChanged,
  clipEndMinuteChanged,
  clipEndSecondChanged,
  newClipNameChanged,
  newClipTagChanged,
  addNewClip,
  showError,
  saveEditedClip
  })(Clipscrud);
