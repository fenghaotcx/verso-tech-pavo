import {routes} from '../../../routes';
import {NavLink} from 'react-router-dom';
import Styles from '../App.module.css';
import Logo from '../../Logo';
import {useContext} from 'react';
import { GlobalContext } from '../../../App';
import LeftBarCom from './LeftBarCom';


const LeftBar = () => {
  const { isMobile,toggleDrawer,isopen,changeTheme } = useContext(GlobalContext)
  console.log('changeTheme=====',changeTheme);
  console.log('isMobile=====',isMobile);
  console.log('open=====',isopen);

  return (
    <LeftBarCom isMobile={isMobile} toggleDrawer={toggleDrawer} isopen={isopen}>
      <Logo />
      {routes.map((item)=>{
        if(item?.name && item?.icon){
          return (
            <NavLink className={({ isActive }) => (isActive ? `${Styles.active} ${Styles.navDiv}` : Styles.navDiv)} 
              to={item.path} key={item.name}>
                <div className={Styles.iconImg}>{item.icon}</div>
                {item.name}
            </NavLink>
          )
        }else{
          return null
        }
      })}
    </LeftBarCom>  
  )
};


export default LeftBar