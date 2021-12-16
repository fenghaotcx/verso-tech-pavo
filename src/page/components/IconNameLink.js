import styled from 'styled-components';
import LinkImg from '../../img/icon/link.svg'
import AssetLogo from '../../img/icon/assetLogo.svg'

const IconName = styled.div`
  display: flex;
  align-items: center;
  &>img {
    width: 24px;
    margin-right: 7px;
  }
  &>div {
    font-size: 16px;
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

const IconNameLink = ({name,img,link}) => {
  return (
    <IconName >
      <img src={img?img:AssetLogo} alt=""/>
      <div>{name}</div> 
      <a href={link?link:''} rel="noreferrer" target="_blank">
        <img src={LinkImg} alt=""/>
      </a>
    </IconName>
  )
}

export default IconNameLink