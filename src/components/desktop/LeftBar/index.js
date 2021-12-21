import {routes} from '../../../routes';
import {NavLink} from 'react-router-dom';
import Styles from '../App.module.css';
import Logo from '../../Logo';
import {useContext} from 'react';
import { GlobalContext } from '../../../App';
import LeftBarCom from './LeftBarCom';
import SwitchTheme from './SwitchTheme';
// import style from 'styled-components';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const MyIconButton = styled(IconButton)`
  width: 26px;
  height: 26px;
  border: ${({theme})=> theme === 'dark'?'1.5px solid #fff;':'1.5px solid #000;'}
  display: flex;
  align-items: center;
  justify-content: center;
`
const TopDiv  =  styled('div')`
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: end;
  &>button {
    margin-right: 20px;
  }
`

const TopClose = ({toggleDrawer,theme}) => {
  return (
    <TopDiv>
      <MyIconButton theme={theme} onClick={()=>{toggleDrawer(false)}}><CloseIcon sx={{color: theme === 'dark'?'#fff':'#000',}} /></MyIconButton>
    </TopDiv>
  )
}


const LeftBar = () => {
  const { isMobile,toggleDrawer,isopen,changeTheme,theme } = useContext(GlobalContext)

  console.log('theme=====',theme);

  return (
    <LeftBarCom cls={theme === 'light'?Styles.lightLeft:Styles.darkLeft} theme={theme} isMobile={isMobile} toggleDrawer={toggleDrawer} isopen={isopen}>
      {!isMobile && <Logo theme={theme} isMobile={isMobile}/>}
      {isMobile && <TopClose theme={theme} toggleDrawer={toggleDrawer} />}
      {routes.map((item)=>{
        if(item?.name && item?.icon){
          return (
            <NavLink 
              className={({ isActive }) => 
              (isActive ? `${Styles.active} ${isMobile?`${Styles.navDiv} ${Styles.navDivM}`:Styles.navDiv}`: 
               isMobile?`${Styles.navDiv} ${Styles.navDivM}`:Styles.navDiv
              )} 
              to={item.path} key={item.name}>
                <div className={Styles.iconImg}>{item.icon}</div>
                {item.name}
            </NavLink>
          )
        }else{
          return null
        }
      })}
      <div className={isMobile?Styles.close:''}>
        <SwitchTheme theme={theme} changeTheme={changeTheme} />
      </div>
    </LeftBarCom>  
  )
};


export default LeftBar