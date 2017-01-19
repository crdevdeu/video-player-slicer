import {
  VIDEO_LOADED,
  CREATE_FIRST_CLIP,
  PLAY_VIDEO,
  PAUSE_VIDEO,
  VIDEO_ENDED,
  LOAD_NEXT_VIDEO,
  LOAD_PREVIOUS_VIDEO,
  UPDATE_PLAY_TIME,
  UPDATE_PLAYBACK_RATIO
} from './types.js';

export const videoLoaded = (duration) => {
  return {
    type: VIDEO_LOADED,
    payload : duration
   };
}

export const createFirstClip = (videoDuration) => {
  const firstClip = {
    videostart: {
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    videoend : videoDuration,
    name: "Full video",
    tagname: "first-clip"
  };
  return {
    type: CREATE_FIRST_CLIP,
    payload: firstClip
  };
}

export const playVideo = () => {
  return {
    type: PLAY_VIDEO
  };
}

export const pauseVideo = () => {
  return {
    type: PAUSE_VIDEO
  };
}

export const videoEnded = () => {
  return {
    type: VIDEO_ENDED
  };
}

export const loadNextVideo = () => {
  return {
    type: LOAD_NEXT_VIDEO
  }
}

export const loadPreviousVideo = () => {
  return {
    type: LOAD_PREVIOUS_VIDEO
  }
}

export const updatePlayTime = (newTime) => {
  return {
    type: UPDATE_PLAY_TIME,
    payload: newTime
  };
}

export const updatePlayBackRatio = (newValue) => {
  return {
    type: UPDATE_PLAYBACK_RATIO,
    payload: newValue
  };
}
