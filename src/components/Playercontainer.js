import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import PlayerControl from './PlayerControl';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  videoLoaded,
  createFirstClip,
  playVideo,
  pauseVideo,
  videoEnded,
  loadNextVideo,
  playSelectedClip,
  loadPreviousVideo,
  updatePlayTime,
  updatePlayBackRatio
} from '../actions';

/*
  Player container component contains the aplication video player, once the
  component is mounted, the lenght of the full video is obtained and sent to
  redux store through the this.props.videoLoaded action creator , which is called
  once the video is fully loaded.
*/

class Playercontainer extends Component {
  //bind player events handler
  constructor() {
    super();
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.playNextClip = this.playNextClip.bind(this);
    this.playPreviousClip  = this.playPreviousClip.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }
  
  componentDidMount(){
    /*
      function executes until video is ready to get its full length and save to
      redux store, if there arent any clips loaded from localStorage creates the
      full video item on the list with start time 0 and full vide duration.
      After initial video is loaded events handlers are create for video actions
    */
    const i = setInterval(() => {
      if (this.refs.video.readyState > 0) {
        const minutes = parseInt(this.refs.video.duration / 60, 10);
        const hours = parseInt(minutes / 60, 10);
        const seconds = parseInt(this.refs.video.duration % 60, 10);
        const videoDuration = {
          minutes,
          hours,
          seconds
        };
        this.props.videoLoaded(videoDuration);
        if (this.props.listofclips.length === 0) {
          this.props.createFirstClip(videoDuration);
        }
        clearInterval(i);
      }
    }, 200);
    
    //video event listeners
    this.refs.video.addEventListener("play", this.handlePlay);
    this.refs.video.addEventListener("pause", this.handlePause);
    this.refs.video.addEventListener("ended", this.handleEnd);
    this.refs.video.addEventListener("timeupdate", this.handleTimeUpdate);
    Mousetrap.bind(['p+n'], this.playNextClip);
    Mousetrap.bind(['p+b'], this.playPreviousClip);
  }

  componentWillReceiveProps(nextProps) {
    //get start-end values in seconds of the currently selected clip
    const { listofclips, indexofcurrentclip, clipeditedsuccess } = nextProps;
    const clipEnd = listofclips[indexofcurrentclip].videoend;
    this.videoEndSeconds = clipEnd.hours * 3600 + clipEnd.minutes * 60 + clipEnd.seconds;
    const clipStart = listofclips[indexofcurrentclip].videostart;
    this.videoStartSeconds = clipStart.hours * 3600 + clipStart.minutes * 60 + clipStart.seconds;

    //checks if there is a change in the list of clips and if current clip is being edited
    const isEdited = clipeditedsuccess && this.props.editindex === this.props.indexofcurrentclip;
    //reloads de video if the clip is changing or is being edited
    if (this.props.indexofcurrentclip !== indexofcurrentclip || isEdited) {
      this.refs.video.load();
     }
     //plays the video depending on redux store state
     if (nextProps.videoisplaying) {
       this.refs.video.play();
     }
     //pauses the video depending on redux state
     if (nextProps.videoispaused) {
       this.refs.video.pause();
      }
     //checks if has ended and isnt the last item on the list
     if (this.props.listofclips.length > 0) {
       const currentClipEnd = this.props.listofclips[this.props.indexofcurrentclip].videoend;
       const currentClipEndSeconds = currentClipEnd.hours * 3600 + currentClipEnd.minutes * 60 + currentClipEnd.seconds;
       const clipEnded = nextProps.videoispaused && currentClipEndSeconds === Math.floor(this.refs.video.currentTime) && indexofcurrentclip < listofclips.length - 1;
       const pausedOrEnded = clipEnded || nextProps.videoended;
       if (pausedOrEnded && !nextProps.loadingpreviousvideo && !nextProps.loadingnextvideo) {
         this.findNextClipAndPlayIt();
       }
     }
   }
   
   findNextClipAndPlayIt() {
     //checks is the list of clips is being filtered and plays the next clip accordingly
     if (this.props.tagsearchvalue === '') {
       //if the list is not filtered increments the current video index by one
       this.props.loadNextVideo();
       setTimeout(()=> this.props.playSelectedClip(this.props.indexofcurrentclip + 1), 3000);
     } else {
       //if the list is being filtered finds the next clip with a matching tag and plays it
       const restOfClips = this.props.listofclips.slice(this.props.indexofcurrentclip + 1);
       const nextClipIndex = restOfClips.findIndex((value) => {
         return value.tagname === this.props.tagsearchvalue;
       });
       if (nextClipIndex > -1) {
         const nextClipIndexOnList = nextClipIndex + this.props.indexofcurrentclip + 1;
         if ( nextClipIndexOnList <= this.props.listofclips.length - 1) {
           this.props.loadNextVideo();
           setTimeout(()=> this.props.playSelectedClip(nextClipIndexOnList), 3000);
         }
       }
     }
   }
   
  findPreviousClipAndPlayIt() {
    //checks is the list of clips is being filtered and plays the next clip accordingly
    if (this.props.tagsearchvalue === '') {
      //if the list is not filtered decrements the current video index by one
      this.props.loadPreviousVideo();
      setTimeout(()=> this.props.playSelectedClip(this.props.indexofcurrentclip - 1),3000);
    } else {
      //if the list is being filtered finds the previous clip with a matching tag and plays it
      const restOfClips = this.props.listofclips.slice(0,this.props.indexofcurrentclip);
      restOfClips.reverse();
      const previousClipIndex = restOfClips.findIndex((value) => {
        return value.tagname === this.props.tagsearchvalue;
      });
      if (previousClipIndex > -1) {
        const previousClipIndexOnList = restOfClips.length - 1 - previousClipIndex;
        if ( previousClipIndexOnList >= 0) {
          this.props.loadPreviousVideo();
          setTimeout(()=> this.props.playSelectedClip(previousClipIndexOnList), 3000);
        }
      }
    }
  }

   //play handler
   handlePlay() {
    this.props.playVideo();
  }
  
  //pause handler
  handlePause() {
    const currentClipEnd = this.props.listofclips[this.props.indexofcurrentclip].videoend;
    const currentClipEndSeconds = currentClipEnd.hours * 3600 + currentClipEnd.minutes * 60 + currentClipEnd.seconds;
    
    if (currentClipEndSeconds > this.refs.video.currentTime && !this.props.loadingnextvideo && !this.props.loadingpreviousvideo) {
      this.props.pauseVideo();
    } else {
      if (!this.props.loadingnextvideo && !this.props.loadingpreviousvideo) {
        setTimeout(()=> {
          this.props.pauseVideo();
        }, 1000);
      }
    }
  }
  
  //end handler
  handleEnd() {
    this.props.videoEnded();
  }
  
  //play next clip
  playNextClip() {
    if (this.props.indexofcurrentclip < this.props.listofclips.length - 1 && !this.props.loadingpreviousvideo) {
      this.findNextClipAndPlayIt();
    }
  }
  
  playPreviousClip(){
    if(this.props.indexofcurrentclip > 0 && !this.props.loadingnextvideo){
      this.findPreviousClipAndPlayIt();
    }
  }
  
  //Handles clip time updates and send it to redux store
  handleTimeUpdate() {
    const currentVideoTime = this.refs.video.currentTime;
    const formatedTime = moment("2015-01-01").startOf('day').seconds(currentVideoTime).format('H:mm:ss');
    this.props.updatePlayTime(formatedTime);
    const videoEndTime = this.props.listofclips[0].videoend;
    const { hours, minutes, seconds } = videoEndTime;
    const endInSeconds = hours * 3600 + minutes * 60 + seconds;
    const playBackRatio = currentVideoTime * 100/ endInSeconds;
    this.props.updatePlayBackRatio(playBackRatio);
  }
  
  render(){
    //adds media fragment to the source url of video player depending on the selected clip
    let source = require('../assets/vid/sample.mp4');
    if (this.props.listofclips.length > 0) {
      const mediaFragment = '#t=' + this.videoStartSeconds + ',' + this.videoEndSeconds;
      source += mediaFragment;
     }

    return (
      <div>
        <video ref='video' className="Player-style" controls={false}>
          <source
            src={source}
            type="video/mp4"
          />
        </video>
        <PlayerControl />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
   videoisplaying : state.videostate.isplaying,
   videoispaused: state.videostate.ispaused,
   videoended: state.videostate.ended,
   indexofcurrentclip: state.videostate.currentclip,
   listofclips: state.clipslist.clips,
   editindex:state.interphase.editindex,
   clipeditedsuccess: state.interphase.clipeditedsuccess,
   tagsearchvalue: state.interphase.tagsearchvalue,
   loadingnextvideo: state.videostate.loadingnextvideo,
   loadingpreviousvideo: state.videostate.loadingpreviousvideo,
  };
}

export default connect(mapStateToProps,{
  videoLoaded,
  createFirstClip,
  playVideo,
  pauseVideo,
  videoEnded,
  loadNextVideo,
  playSelectedClip,
  loadPreviousVideo,
  updatePlayTime,
  updatePlayBackRatio
})(Playercontainer);
