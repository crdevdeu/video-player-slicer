import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  playSelectedClip,
  editSelectedClip,
  deleteSelectedClip,
  pauseVideo,
  persistSelectedClip
} from '../actions';
/*Clip list component contains the list of clips to play, first item on the list
is the full length video

Each one of the components handlers executes an action creator to modify the application
state
*/

class ClipList extends Component {
  constructor(){
    super();
    // Disabe o enable clip editing capabilities
    this.allowedit = true;
  }
  //Play clip handler
  playClip(index) {
    this.props.playSelectedClip(index);
  }
  // Pause clip handler
  pauseClip() {
    this.props.pauseVideo();
  }
  //Edit clip handler
  editClip(index) {
    this.props.editSelectedClip(this.props.listofclips[index],index);
  }
  //Delete clip handler
  deleteClip(index) {
    this.props.deleteSelectedClip(index,this.props.fullvidduration);
  }
  //Persist clip handler
  persistClip(index) {
    this.props.persistSelectedClip(index);
  }
  render() {
    //renders the list of clips and its related action buttons
    const vm = this;
    //format clip duration to hh:mm:ss
    const listItems = this.props.listofclips.map((item,index) => {
      const startHour = item.videostart.hours < 10 ? "0" + item.videostart.hours : item.videostart.hours;
      const startMinute = item.videostart.minutes < 10 ? "0" + item.videostart.minutes : item.videostart.minutes;
      const startSecond = item.videostart.seconds < 10 ? "0" + item.videostart.seconds : item.videostart.seconds;
      const endHour = item.videoend.hours < 10 ? "0" + item.videoend.hours : item.videoend.hours;
      const endMinute = item.videoend.minutes < 10 ? "0" + item.videoend.minutes : item.videoend.minutes;
      const endSecond = item.videoend.seconds < 10 ? "0" + item.videoend.seconds : item.videoend.seconds;
      if(index === 0){
      //Renders full video clip list item
        return (
          <li key={index} className="Full-video-item list-group-item">
            <h3>{item.name}</h3>
            {vm.props.indexofcurrentclip === index ? <p className="Selected-tag">Selected</p>: null}
            {vm.props.indexofcurrentclip === index && vm.props.videoisplaying ? <p className="Playing-tag">Playing</p>: null}
            <p>Start time: {startHour}:{startMinute}:{startSecond}</p>
            <p>End time: {endHour}:{endMinute}:{endSecond}</p>
            {!(vm.props.videoisplaying && vm.props.indexofcurrentclip === index) ?
            <button className="btn btn-success"
            onClick={vm.playClip.bind(vm,index)}>
            Play</button>
            :
            <button className="btn btn-info button-interphase"
            onClick={vm.pauseClip.bind(vm)}
            >Pause
            </button>
            }
          </li>
        );
      } else {
        /*Render clips created by the users, state of the application is checked to show
        buttons on each item and restrict user actions depending on it
        */
        return (
          <li key={index} className={vm.props.tagsearchvalue !== '' && item.tagname !== vm.props.tagsearchvalue ? "hide" : "list-group-item"}>
            <h3>{item.name}</h3>
            <p><strong>Tag name:</strong>{item.tagname}</p>
            {vm.props.indexofcurrentclip === index ? <p className="Selected-tag">Selected</p>: null}
            {item.persisted ? <p className="Persisted-style"><strong>In your playlist</strong></p>: null}
            {vm.props.indexofcurrentclip === index && vm.props.videoisplaying ? <p className="Playing-tag">Playing</p>: null}
            <p>Start time: {startHour}:{startMinute}:{startSecond}</p>
            <p>End time: {endHour}:{endMinute}:{endSecond}</p>
             { !(vm.props.videoisplaying && vm.props.indexofcurrentclip === index) ?
            <div>
              <button className="btn btn-success button-interphase"
              onClick={vm.playClip.bind(vm,index)}
              >Play
              </button>
              {vm.allowedit ? <button className="btn btn-primary button-interphase" onClick={vm.editClip.bind(vm,index)}>Edit</button>: null}
              <button className="btn btn-danger button-interphase" onClick={vm.deleteClip.bind(vm,index)}>Delete</button>
              {!item.persisted ?
              <button className="btn btn-warning button-interphase" onClick={vm.persistClip.bind(vm,index)}>Save</button>
              :null
              }
            </div>
            :
            <button className="btn btn-info button-interphase"
            onClick={vm.pauseClip.bind(vm)}
            >Pause
            </button>
            }
          </li>
        );
      }
    });
  return (
        <ul className="Cliplist-container list-group">
          {listItems}
        </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listofclips: state.clipslist.clips,
    indexofcurrentclip: state.videostate.currentclip,
    videoisplaying: state.videostate.isplaying,
    fullvidduration: state.videostate.duration,
    tagsearchvalue: state.interphase.tagsearchvalue,
  };
}

export default connect(mapStateToProps,{
  playSelectedClip,
  editSelectedClip,
  deleteSelectedClip,
  pauseVideo,
  persistSelectedClip
})(ClipList);
