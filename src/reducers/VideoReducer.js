import { VIDEO_LOADED,
  PLAY_SELECTED_CLIP,
  PLAY_VIDEO,
  PAUSE_VIDEO,
  VIDEO_ENDED,
  DELETE_SELECTED_CLIP,
  LOAD_NEXT_VIDEO,
  LOAD_PREVIOUS_VIDEO,
  UPDATE_PLAY_TIME,
  UPDATE_PLAYBACK_RATIO
 } from '../actions/types';

const INITIAL_STATE = {
  duration: {
    hours:0,
    minutes:0,
    seconds:0
  },
  isplaying: false,
  ispaused: true,
  ended: false,
  currentclip : 0,
  loadingnextvideo: false,
  loadingpreviousvideo: false,
  currentplaybacktime: '0:00:00',
  playbackratio: 0
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case VIDEO_LOADED:
      return {...state, duration: action.payload};
    case PLAY_SELECTED_CLIP:
      return {...state, currentclip: action.payload, isplaying: true, ispaused: false, loadingnextvideo: false, loadingpreviousvideo: false };
    case PLAY_VIDEO:
      return {...state, isplaying: true, ispaused: false, ended: false };
    case PAUSE_VIDEO:
      return {...state, isplaying: false, ispaused: true, ended: false};
    case VIDEO_ENDED:
      return {...state, ended: true,isplaying: false, ispaused: true};
    case DELETE_SELECTED_CLIP:
      if(action.payload === state.currentclip){
        return {...state, currentclip: action.payload - 1};
      } else if(action.payload < state.currentclip) {
        return {...state, currentclip: state.currentclip - 1};
      } else {
        return state;
      }
    case LOAD_NEXT_VIDEO:
      return {...state,loadingnextvideo: true};
    case LOAD_PREVIOUS_VIDEO:
      return {...state, loadingpreviousvideo: true};
    case UPDATE_PLAY_TIME:
      return {...state, currentplaybacktime: action.payload};
    case UPDATE_PLAYBACK_RATIO:
      return {...state, playbackratio: action.payload};
    default:
    return state;
  }
}
