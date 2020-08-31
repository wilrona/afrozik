import genrePage from './genre';

const RouteGenre = [
  {
    path: "/home/genre/:genre_id?",
    component: genrePage,
    exact: true,
    permission: []

  }

]

export { RouteGenre }
