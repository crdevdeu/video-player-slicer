import { 
  CREATE_NEW_CLIP,
  CANCEL_CREATE_NEW_CLIP,
  VIDEO_LOADED,
  CLIP_START_HOUR_CHANGED,
  CLIP_START_MINUTE_CHANGED,
  CLIP_START_SECOND_CHANGED,
  CLIP_END_HOUR_CHANGED,
  CLIP_END_MINUTE_CHANGED,
  CLIP_END_SECONDS_CHANGED,
  NEW_CLIP_NAME_CHANGED,
  NEW_CLIP_TAG_CHANGED,
  INPUT_ERROR,
  ADD_NEW_CLIP,
  PLAYINTERVAL_ERROR,
  EDIT_SELECTED_CLIP,
  SAVE_CLIP_EDITION,
  DELETE_SELECTED_CLIP,
  TAG_SEARCH_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  newclip: false,
  clipstart: {
    hours: 0,
    minutes: 0,
    seconds: 0
  },
  clipends: {
    hours:0,
    minutes:0,
    seconds: 0
  },
  clipname: '',
  tag: '',
  inputerror: false,
  clipaddedsuccess: false,
  playintervalerror: false,
  editclip: false,
  editindex: null,
  clipeditedsuccess: false,
  tagsearchvalue: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case CREATE_NEW_CLIP:
      return { 
        ...state, 
        newclip: true, 
        editclip: false, 
        editindex: null, 
        clipaddedsuccess: false, 
        clipeditedsuccess: false, 
        inputerror: false, 
        playintervalerror: false 
      };
    case CANCEL_CREATE_NEW_CLIP:
      return { ...INITIAL_STATE, clipends: action.fullvidduration };
    case VIDEO_LOADED:
      return { ...state, clipends: action.payload };
    case CLIP_START_HOUR_CHANGED:
      const newClipStartHour = { ...state.clipstart, hours : action.payload };
      return { ...state, clipstart : newClipStartHour };
    case CLIP_START_MINUTE_CHANGED:
      const newClipStartMinute = { ...state.clipstart, minutes: action.payload };
      return { ...state, clipstart: newClipStartMinute };
    case CLIP_START_SECOND_CHANGED:
      const newClipStartSecond = { ...state.clipstart, seconds: action.payload };
      return { ...state, clipstart: newClipStartSecond };
    case CLIP_END_HOUR_CHANGED:
      const newClipEndHour = { ...state.clipends, hours: action.payload };
      return { ...state, clipends: newClipEndHour };
    case CLIP_END_MINUTE_CHANGED:
      const newClipEndMinute = { ...state.clipends, minutes: action.payload };
      return { ...state, clipends: newClipEndMinute };
    case CLIP_END_SECONDS_CHANGED:
      const newClipEndSecond = { ...state.clipends, seconds: action.payload };
      return { ...state, clipends: newClipEndSecond };
    case NEW_CLIP_NAME_CHANGED:
      return { ...state, clipname: action.payload };
    case NEW_CLIP_TAG_CHANGED:
      return { ...state, tag: action.payload };
    case ADD_NEW_CLIP:
      return { ...INITIAL_STATE, clipends: action.fullvidduration, clipaddedsuccess: true };
    case INPUT_ERROR:
      return { ...state, inputerror: true, playintervalerror: false };
    case PLAYINTERVAL_ERROR:
      return { ...state, playintervalerror: true, inputerror: false };
    case EDIT_SELECTED_CLIP:
      return {
        ...state,
        clipstart: action.payload.videostart,
        clipends: action.payload.videoend,
        clipname: action.payload.name,
        tag: action.payload.tagname,
        editclip: true,
        newclip: false,
        editindex: action.editindex
      };
     case SAVE_CLIP_EDITION:
      return { ...INITIAL_STATE, clipends: action.fullvidduration, clipeditedsuccess: true };
    case DELETE_SELECTED_CLIP:
      return { ...INITIAL_STATE, clipends: action.fullvidduration };
    case TAG_SEARCH_CHANGED:
      return { ...state, tagsearchvalue: action.payload };
    default:
      return state;
  }
}
