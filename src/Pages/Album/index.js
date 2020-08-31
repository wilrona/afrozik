import albumPage from './album';
import AlbumSingle from './single';

const RouteAlbum = [
  {
    path: "/albums",
    component: albumPage,
    exact: true,
    permission: []

  },
  {
    path: "/albums/:album_id",
    component: AlbumSingle,
    exact: true,
    permission: []

  }

]

export { RouteAlbum }