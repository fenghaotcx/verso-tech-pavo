import {Router} from '../../../routes';
import Styles from '../App.module.css'

const ContentRight = ({isMobile,theme}) => {
  return (
    <div className={`${isMobile?Styles.right_m:Styles.right} ${theme==='dark'?Styles.darkRight:''}`}> 
      <Router />
    </div>
  )
};


export default ContentRight