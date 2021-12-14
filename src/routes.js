import { Navigate, useRoutes } from 'react-router-dom'
import Dashboard from './page/Dashboard'
import AutoFarm from './page/AutoFarm'
import Swap from './page/Swap'
import dashboardIcon from './img/icon/dashboardIcon.svg'
import autoFarmIcon from './img/icon/autoFarmIcon.svg'
import swapIcon from './img/icon/swapIcon.svg'

export const routes =  [
  { path: '/', 
    element: <Navigate to="/dashboard" replace /> ,
    name:'',
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    name:'Dashboard',
    icon: <img src={dashboardIcon} alt=""/>
  },
  {
    path: '/autoFarm',
    element: <AutoFarm />,
    name:'Auto Farm',
    icon: <img src={autoFarmIcon} alt=""/>
  },
  {
    path: '/swap',
    element: <Swap />,
    name:'Swap',
    icon: <img src={swapIcon} alt=""/>
  },
]

export function Router() {
  return useRoutes(routes);
}