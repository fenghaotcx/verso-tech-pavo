import {routes} from '../../../routes'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom'
import Styles from '../App.module.css'
import Logo from '../../Logo'

const Left = styled.div`
    width: 20%;
    height: 100vh;
    padding: 35px 0 0 40.5px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    background: ${props => props.theme.colors.bubblePositive}
`

const LeftBar = ({theme,changeTheme}) => {
  console.log('theme=====',theme);
  console.log('changeTheme=====',changeTheme);
  return (
    <Left >
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
    </Left>
    )
};


export default LeftBar