import styled from 'styled-components';
import LinkImg from '../../public/icon/link.svg'
import AssetLogo from '../../public/icon/assetLogo.svg'

const IconName = styled.div`
  display: flex;
  align-items: center;
  &>img {
    width: 24px;
    margin-right: 7px;
  }
  &>div {
    font-size: ${({isMobile})=> isMobile?'13px':'16px'};
    line-height: 25px;
    margin-right: 3px;
  }
  &>a {
    height: 17px;
    width: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background: #d6dcfe;
    &>img {
        width: 10px;
    }
  }
`

const IconNameLink = ({name,img,link,isMobile}) => {
  return (
    <IconName isMobile={isMobile}>
      {isMobile?<></>:<img src={img?img:AssetLogo} alt=""/>}
      <div>{name}</div> 
      {isMobile?<></>:<a href={link?link:''} rel="noreferrer" target="_blank">
        <img src={LinkImg} alt=""/>
      </a>}
    </IconName>
  )
}

export default IconNameLink