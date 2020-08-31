import SingleOnglet from './single';
import AlbumOnglet from './album';
import VideoOnglet from './video';
import PlaylistOnglet from './playlist'; 
import PodcastOnglet from './podcast';
import EventOnglet from './event';

const RouteHome = [
  {
    path: "/home",
    component: SingleOnglet,
    exact: true,
    permission: []

  },
  {
    path: "/home/albums",
    component: AlbumOnglet,
    exact: true,
    permission: []

  },
  {
    path: "/home/videos",
    component: VideoOnglet,
    exact: true,
    permission: []

  },
  {
    path: "/home/playlist",
    component: PlaylistOnglet,
    exact: true,
    permission: []

  },
  {
    path: "/home/podcast",
    component: PodcastOnglet,
    exact: true,
    permission: []

  },
  {
    path: "/home/event",
    component: EventOnglet,
    exact: true,
    permission: []

  }

]

export { RouteHome }
