import {
  CREATE_FIRST_CLIP,
  ADD_NEW_CLIP,
  SAVE_CLIP_EDITION,
  DELETE_SELECTED_CLIP,
  CLEAR_NOTIFICATIONS,
  PERSIST_CLIP,
  CLEAR_PLAYLIST
} from '../actions/types';

const INITIAL_STATE = {
  clips: [],
  editindex: null,
  deletesuccess: false,
  listcleared: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case CREATE_FIRST_CLIP:
     return {...state, clips: [...state.clips, action.payload ]};
    case ADD_NEW_CLIP:
     return {...state, clips: [...state.clips,action.payload]};
    case SAVE_CLIP_EDITION:
      return {...state, clips: [...state.clips.slice(0,action.editindex), action.payload, ...state.clips.slice(action.editindex + 1)]};
    case DELETE_SELECTED_CLIP:
      return {...state, clips:[...state.clips.slice(0,action.payload),...state.clips.slice(action.payload + 1)], deletesuccess: true};
    case CLEAR_NOTIFICATIONS:
      return {...state, deletesuccess: false, listcleared: false};
    case PERSIST_CLIP:
      return {...state, clips: [...state.clips.slice(0,action.payload), {...state.clips[action.payload], persisted: true}, ...state.clips.slice(action.payload + 1) ]};
    case CLEAR_PLAYLIST:
      const newList = state.clips.map((value)=>{
        value.persisted = false;
        return value;
      });
      return {...state, clips: newList, listcleared: true};
    default:
    return state;
  }
}
