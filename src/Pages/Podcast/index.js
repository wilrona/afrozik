import poscastPage from './podcast';
import PodcastSingle from './single';

const RoutePodcast = [
  {
    path: "/podcasts",
    component: poscastPage,
    exact: true,
    permission: []

  },
  {
    path: "/podcasts/:podcast_id",
    component: PodcastSingle,
    exact: true,
    permission: []

  }

]

export { RoutePodcast }