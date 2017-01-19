import {
  PLAY_SELECTED_CLIP,
  EDIT_SELECTED_CLIP,
  DELETE_SELECTED_CLIP,
  CLEAR_NOTIFICATIONS,
  PERSIST_CLIP,
  CLEAR_PLAYLIST
 } from './types';

export const playSelectedClip = (index) => {
  return {
    type: PLAY_SELECTED_CLIP,
    payload: index
  };
}

export const editSelectedClip = (clip,index) => {
  return {
    type: EDIT_SELECTED_CLIP,
    payload: clip,
    editindex: index
  };
}

export const deleteSelectedClip = (index,fullvidduration) => {
  return {
    type: DELETE_SELECTED_CLIP,
    payload: index,
    fullvidduration
  };
}

export const clearNotifications = (index) => {
  return {
    type: CLEAR_NOTIFICATIONS
  };
}

export const persistSelectedClip = (index) => {
  return {
    type: PERSIST_CLIP,
    payload: index
  };
}

export const clearPlayList = () => {
  return {
    type: CLEAR_PLAYLIST
  }
}
