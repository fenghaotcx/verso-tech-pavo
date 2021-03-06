import {routes} from '../../../routes';
import {NavLink} from 'react-router-dom';
import Styles from '../App.module.css';
import Logo from '../../Logo';
import {useContext,useState} from 'react';
import { GlobalContext } from '../../../App';
import LeftBarCom from './LeftBarCom';
import SwitchTheme from './SwitchTheme';
// import style from 'styled-components';
import { styled,css } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ShareLink from './ShareLink';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MyIconButton = styled(IconButton)`
  width: 26px;
  height: 26px;
  border: ${({theme})=> theme === 'dark'?'1.5px solid #fff;':'1.5px solid #000;'}
  display: flex;
  align-items: center;
  justify-content: center;
`
const BackButton = styled(IconButton)`
  position: absolute;
  right: -20px;
  top: 80px;
  z-index: 9;
  background: #fff;
  ${() =>
    css({
      '&:hover': {backgroundColor: `#fff`}
    })
  }
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

const linkArr = [
  {
    name: 'Twitter',
    link: 'https://twitter.com/pavo_finance'
  },
  {
    name: 'Telegram',
    link: 'https://t.me/pavofinance'
  },
  {
    name: 'Discord',
    link: 'https://discord.gg/cME7P6ySsM'
  },
  {
    name: 'Document',
    link: ''
  },
  {
    name: 'Github',
    link: ''
  },
]


const LeftBar = () => {
  const { isMobile,toggleDrawer,isopen,changeTheme,theme } = useContext(GlobalContext)
  const [show,setShow] = useState(false)
  const [short,setShort] = useState(true)
  return (
    <LeftBarCom  
      cls={theme === 'light'?Styles.lightLeft:Styles.darkLeft} 
      theme={theme} isMobile={isMobile} 
      toggleDrawer={toggleDrawer} 
      isopen={isopen}
      setShow={setShow}
      short={short}
    >
      {!isMobile ? <Logo theme={theme} short={short} isMobile={isMobile}/>:<TopClose theme={theme} toggleDrawer={toggleDrawer} />}
      {routes.map((item)=>{
        if(item?.name && item?.icon){
          return (
            <NavLink 
              className={({ isActive }) => 
              (isActive ? `${Styles.active} ${isMobile?`${Styles.navDiv} ${Styles.navDivM}`:`${Styles.navDiv} ${!short && Styles.navDivShort}`}`: 
               isMobile?`${Styles.navDiv} ${Styles.navDivM}`:Styles.navDiv
              )} 
              to={item.path} key={item.name}>
                <div className={Styles.iconImg}>{item.icon}</div>
                {short && item.name}
            </NavLink>
          )
        }else{
          return null
        }
      })}
      {short && <div className={isMobile ? Styles.close:''}><SwitchTheme theme={theme} changeTheme={changeTheme} /></div>}
      {!isMobile && linkArr.map((item,index)=> <ShareLink name={item.name} key={index} link={item.link} isMobile={isMobile}/>)}
      {show && 
        <BackButton onClick={()=>{setShort(!short);setShow(false)}}>
          {short?<ArrowBackIosNewIcon />:<ArrowForwardIosIcon />}
        </BackButton>
      }
    </LeftBarCom>  
  )
};


export default LeftBar