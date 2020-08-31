import videoPage from './video';
import videoSingle from './single';

const RouteVideo = [
  {
    path: "/videos",
    component: videoPage,
    exact: true,
    permission: []

  },
  {
    path: "/videos/:video_id",
    component: videoSingle,
    exact: true,
    permission: []

  }

]

export { RouteVideo }