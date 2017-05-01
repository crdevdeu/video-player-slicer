import {
  CREATE_NEW_CLIP,
  CANCEL_CREATE_NEW_CLIP,
  CLIP_START_HOUR_CHANGED,
  CLIP_START_MINUTE_CHANGED,
  CLIP_START_SECOND_CHANGED,
  CLIP_END_HOUR_CHANGED,
  CLIP_END_MINUTE_CHANGED,
  CLIP_END_SECONDS_CHANGED,
  NEW_CLIP_NAME_CHANGED,
  NEW_CLIP_TAG_CHANGED,
  ADD_NEW_CLIP,
  INPUT_ERROR,
  PLAYINTERVAL_ERROR,
  SAVE_CLIP_EDITION,
  TAG_SEARCH_CHANGED
} from './types';

export const createNewClip = () => {
  return {
    type: CREATE_NEW_CLIP
  }
}

export const cancelCreateNewClip = (fullvidduration) => {
  return {
    type: CANCEL_CREATE_NEW_CLIP,
    fullvidduration
  };
}

export const newClipNameChanged = (name) => {
  return {
    type: NEW_CLIP_NAME_CHANGED,
    payload: name
  };
}

export const newClipTagChanged = (tag) => {
  return {
    type: NEW_CLIP_TAG_CHANGED,
    payload: tag
  };
}

export const clipStartHourChanged = (hour) => {
  return {
    type: CLIP_START_HOUR_CHANGED,
    payload: hour
  };
}

export const clipStartMinuteChanged = (minute) => {
  return {
    type: CLIP_START_MINUTE_CHANGED,
    payload: minute
  };
}

export const clipStartSecondChanged = (second) => {
  return {
    type: CLIP_START_SECOND_CHANGED,
    payload: second
  };
}

export const clipEndHourChanged = (hour) => {
  return {
    type: CLIP_END_HOUR_CHANGED,
    payload: hour
  }
}

export const clipEndMinuteChanged = (minute) => {
  return {
    type: CLIP_END_MINUTE_CHANGED,
    payload: minute
  };
}

export const clipEndSecondChanged = (seconds) => {
  return {
    type: CLIP_END_SECONDS_CHANGED,
    payload:seconds
  };
}

export const addNewClip = ({ videostart, videoend, name, tagname }, fullvidduration) => {
  const payload = {
    videostart,
    videoend,
    name,
    tagname,
    persisted : false
  }
  return {
    type: ADD_NEW_CLIP,
    payload,
    fullvidduration
  };
}

export const saveEditedClip = ({ videostart, videoend, name, tagname }, editindex, fullvidduration, persisted) => {
  const payload = {
    videostart,
    videoend,
    name,
    tagname,
    persisted
  }
  return {
    type: SAVE_CLIP_EDITION,
    payload,
    fullvidduration,
    editindex
  };
}

export const showError = (errorType) => {
  switch (errorType) {
    case 1:
      return {
        type: INPUT_ERROR
      };
    case 2:
      return {
        type: PLAYINTERVAL_ERROR
      };
    default:
      return errorType;
  }
}

export const changeTagSearchValue = (value) => {
  return {
    type: TAG_SEARCH_CHANGED,
    payload: value
  };
}
