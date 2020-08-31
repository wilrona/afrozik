import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { albumStore } from './Stores/AlbumStore';
import { pisteStore } from './Stores/PisteStore';
import { videoStore } from './Stores/VideoStore';
import { playlistStore } from './Stores/PlaylistStore';
import { artisteStore } from './Stores/ArtisteStore';
import { eventStore } from './Stores/EventStore';
import { genreStore } from './Stores/GenreStore';
import { paysStore } from './Stores/PaysStore';
import { authStore } from './Stores/AuthStore';

const stores = {
  albumStore,
  pisteStore,
  genreStore,
  paysStore,
  videoStore, 
  playlistStore,
  artisteStore,
  eventStore,
  authStore
  
}

const Root = (
  <Provider {...stores}>
    <App />
  </Provider>
)


ReactDOM.render(Root, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
