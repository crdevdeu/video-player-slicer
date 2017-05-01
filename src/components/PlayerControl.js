import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { playVideo, pauseVideo, playSelectedClip } from '../actions';

/* This component renders the video control panel, states of playback status and
progress bar are taken from redux store
*/

class PlayerControl extends Component {
  constructor() {
    super();
    this.markersData = [];
    this.fullVideoDurationFormated = 0;
    this.fullVideoDuration = 0;
  }

  generateMarkers(props) {
    //Generates markers for full video timeline
    const { listofclips } = props;
    if (listofclips.length >= 1) {
      this.fullVideoDuration = listofclips[0].videoend.hours * 3600 + listofclips[0].videoend.minutes * 60 + listofclips[0].videoend.seconds;
      this.fullVideoDurationFormated = moment("2015-01-01").startOf('day').seconds(this.fullVideoDuration).format('H:mm:ss');
    }
    if (listofclips.length > 1) {
      const markersData = listofclips.slice(1).map((value, index) => {
        const { hours, minutes, seconds } = value.videostart;
        const clipStartSeconds = hours * 3600 + minutes * 60 + seconds;
        const clipStartFormatted = moment("2015-01-01").startOf('day').seconds(clipStartSeconds).format('H:mm:ss');
        const progressBarRatio = clipStartSeconds * 100 / this.fullVideoDuration;
        const itemArray = [];
        const itemObject = {};
        itemArray.push(clipStartSeconds);
        itemObject.index = index + 1;
        itemObject.ratio = progressBarRatio;
        itemObject.name = value.name;
        itemObject.starttime = clipStartFormatted;
        itemArray.push(itemObject);
        return itemArray;
      });
      markersData.sort((a, b) => {
        return a[0] - b[0];
      });
      this.markersData = markersData;
    }
  }
  //User action handlers
  
  handleMarkerClick(index) {
    this.props.playSelectedClip(index);
  }
  
  handlePlayAction() {
    this.props.playVideo();
  }
  
  handlePauseAction() {
    this.props.pauseVideo();
  }
  
  render() {
    this.generateMarkers(this.props);
    let timeLineMarkers = null;
    //checks if current clips is full video an maps the items to render
    if (this.props.currentclip === 0) {
      timeLineMarkers = this.markersData.map((value, index) => {
        const markerPosition = value[1].ratio + '%';
        const tooltip = (
          <Tooltip 
            id="tooltip" 
            key={'tooltip' + index}><strong>Go to {value[1].name + ' ' + value[1].starttime}</strong>
          </Tooltip>
        );
        return (
          <OverlayTrigger key={'overlay' + index} placement="top" overlay={tooltip}>
            <div
              style={{
                width: 8,
                height: 20,
                position: 'absolute',
                background: 'red',
                left: markerPosition 
              }}
              key={index}
              onClick={this.handleMarkerClick.bind(this, value[1].index)}
            />
          </OverlayTrigger>
        );
      });
    }
    return (
      <div className="row controls-row">
        <div className="col-xs-1">
          {this.props.videoispaused ? <Button bsSize="small" onClick={this.handlePlayAction.bind(this)}><Glyphicon glyph="play" /></Button> : null}
          {this.props.videoisplaying ? <Button bsSize="small" onClick={this.handlePauseAction.bind(this)}><Glyphicon glyph="pause" /></Button> : null}
        </div>
        <div className="col-xs-2 columns">
          <p>{this.props.currentplaybacktime} / {this.fullVideoDurationFormated}</p>
        </div>
        <div className="col-xs-9 columns">
          <div className="progress video-progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{width: this.props.playbackratio+'%'}} />
              {timeLineMarkers}
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listofclips: state.clipslist.clips,
    currentclip: state.videostate.currentclip,
    currentplaybacktime: state.videostate.currentplaybacktime,
    playbackratio: state.videostate.playbackratio,
    videoisplaying: state.videostate.isplaying,
    videoispaused: state.videostate.ispaused
  };
}

export default connect(mapStateToProps, {playVideo, pauseVideo, playSelectedClip})(PlayerControl);
