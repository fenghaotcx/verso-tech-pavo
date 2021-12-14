import {Router} from '../../../routes';
import Styles from '../App.module.css'

const ContentRight = ({isMobile}) => {
  return (
    <div className={isMobile?Styles.right_m:Styles.right}> 
      <Router />
    </div>
  )
};


export default ContentRight