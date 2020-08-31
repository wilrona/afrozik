import playlistPage from './playlist';
import PlaylistAudioSingle from './singleAudio';
import PlaylistVideoSingle from './singleVideo';

const RoutePlaylist = [
  {
    path: "/playlists",
    component: playlistPage,
    exact: true,
    permission: []

  },
  {
    path: "/playlists-audio/:playlist_id",
    component: PlaylistAudioSingle,
    exact: false,
    permission: []

  },
  {
    path: "/playlists-video/:playlist_id",
    component: PlaylistVideoSingle,
    exact: false,
    permission: []

  }

]

export { RoutePlaylist }