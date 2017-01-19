import { combineReducers } from 'redux';
import InterphaseReducer from './InterphaseReducer';
import VideoReducer from './VideoReducer';
import CliplistReducer from './CliplistReducer';

export default combineReducers({
  interphase: InterphaseReducer,
  videostate: VideoReducer,
  clipslist: CliplistReducer
});
