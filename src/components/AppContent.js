import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clipscrud from './Clipscrud';
import Playercontainer from './Playercontainer';
import ClipList from './ClipList';
import { Alert, Modal } from 'react-bootstrap';
import { clearNotifications, changeTagSearchValue, clearPlayList } from '../actions';
import '../App.css';

/*Main app component, application layout is built using bootstrap
Component Playercointainer contains the video player
Component Clipscrud contains buttons and interphase to create a new video clip
and to edit an existing one
ClipList component contains the list of clips to be played;
*/

class AppContent extends Component {
  constructor() {
    super();
    this.currentlyplaying = "loading";
  }
  componentDidUpdate() {
    //Removes clip delete success notification if it exists
    if(this.props.clipdeletesuccess || this.props.listcleared){
    setTimeout(() => this.props.clearNotifications(),3000);
    }
  }
  //tag search input change handler
  handleTagSearchChange(event) {
    this.props.changeTagSearchValue(event.target.value);
  }
  clearLocalStorage() {
    this.props.clearPlayList();
  }
  //method to conditionally render clip delete success notification
  renderClipDeleteSuccess(){
    if(this.props.clipdeletesuccess){
      return (
        <Alert bsStyle="warning">
          <strong>You have successfully deleted a clip</strong>
        </Alert>
      );
    }
  }
  renderClearListSuccess() {
    if (this.props.listcleared){
    return (
      <Alert bsStyle="warning">
        <strong>You have cleared yor playlist</strong>
      </Alert>
    );
   }
 }
  render() {
    if(this.props.clipslist.length > 0){
      if(this.props.clipslist[this.props.currentclipindex]){
        this.currentlyplaying = this.props.clipslist[this.props.currentclipindex].name;
      }
    }
    /*if loadingnextvideo props is true a loading next clip modal is shown
    Search tag input is binded to redux store state */
    return (
        <div className="container-fluid">
          <Modal show={this.props.loadingnextvideo || this.props.loadingpreviousvideo}>
             <Modal.Body>
               <div className="Modal-body-container">
                  {this.props.loadingnextvideo ? <h3>Loading next clip</h3>: null}
                  {this.props.loadingpreviousvideo ? <h3>Loading previous clip</h3>: null }
                  <img className="Modal-spinner" src={require('../assets/img/loading.gif')} alt="loading" />
               </div>
             </Modal.Body>
          </Modal>
          <div className="row">
            <div className="App-header col-md-12">
              <h2>Video Player/Slicer</h2>
            </div>
           </div>
           <div className="row">
              <div className="col-md-8 text-center Video-container">
                  <h3>Currently playing: {this.currentlyplaying}</h3>
                  <Playercontainer />
                  <Clipscrud />
              </div>
              <div className="col-md-4">
                <div className="Find-tag-style">
                    <label>Filter clips by tag name&nbsp;</label>
                    <input type="text" value={this.props.tagsearchvalue} onChange={this.handleTagSearchChange.bind(this)}/>
                    {this.renderClipDeleteSuccess()}
                    {this.renderClearListSuccess()}
                    <h2>Clips</h2>
                    <button className="btn btn-info" onClick={this.clearLocalStorage.bind(this)}>Clear playlist</button>
                    <ClipList />
                </div>
              </div>
           </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clipdeletesuccess: state.clipslist.deletesuccess,
    loadingnextvideo: state.videostate.loadingnextvideo,
    tagsearchvalue: state.interphase.tagsearchvalue,
    clipslist: state.clipslist.clips,
    currentclipindex: state.videostate.currentclip,
    listcleared: state.clipslist.listcleared,
    loadingpreviousvideo:state.videostate.loadingpreviousvideo
  };
}

export default connect(mapStateToProps,{clearNotifications, changeTagSearchValue, clearPlayList })(AppContent);
