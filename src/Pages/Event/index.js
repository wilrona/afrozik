import eventPage from './event';
import EventSingle from './single';

const RouteEvent = [
  {
    path: "/events",
    component: eventPage,
    exact: true,
    permission: []

  },
  {
    path: "/events/:event_id",
    component: EventSingle,
    exact: true,
    permission: []

  }

]

export { RouteEvent }