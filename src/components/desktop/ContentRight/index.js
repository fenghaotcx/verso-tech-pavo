import {Router} from '../../../routes';
import Styles from '../App.module.css';
import Boundary from "../../Boundary";

const ContentRight = ({isMobile,theme}) => {
  return (
    <div className={`${isMobile?Styles.right_m:Styles.right} ${theme==='dark'?Styles.darkRight:''}`}> 
      <Boundary>
        <Router />
      </Boundary>
    </div>
  )
};


export default ContentRight