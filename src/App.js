import React, { Component } from 'react';
import AppContent from './components/AppContent';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';
import './App.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const persistedState = loadState();
//creates redux store with localStorage state if it exists
const store = createStoreWithMiddleware(reducers, persistedState);

store.subscribe(() => {
  //adds persisted clip list to localStorage
  const appClipsList = store.getState().clipslist.clips;
  const  persistingClips = appClipsList.filter((item,index) => {
    return item.persisted || index === 0;
  });

  saveState({
    clipslist: { ...store.getState().clipslist, editindex: null, deletesuccess: false, listcleared: false, clips: persistingClips }
  });
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContent />
      </Provider>
    );
  }
}

export default App;
