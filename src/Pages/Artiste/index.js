import artistePage from './artiste';
import ArtisteSingle from './single';

const RouteArtiste = [
  {
    path: "/artistes",
    component: artistePage,
    exact: true,
    permission: []

  },
  {
    path: "/artistes/:artiste_id",
    component: ArtisteSingle,
    exact: true,
    permission: []

  }

]

export { RouteArtiste }