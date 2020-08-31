import paysComponent from './pays';

const RoutePays = [
  {
    path: "/home/pays/:pays_id?",
    component: paysComponent,
    exact: true,
    permission: []

  }

]

export { RoutePays }
