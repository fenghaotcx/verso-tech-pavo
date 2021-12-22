import styled from 'styled-components';

const LinkDiv = styled.a`
  display: flex;
  align-items: center;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: ${({theme})=> theme.colors.font};
  margin-bottom: 17px;
  text-decoration: none;
  &>span {
    display: block;
    width: 10px;
    height: 10px;
    background: ${({theme})=> theme.colors.linkBg};
    border-radius: 100%;
    margin-right: 8px;
  }
`

const ShareLink = ({name,link,isMobile}) => {
  return (
    <LinkDiv href={link?link:''} rel="noreferrer" target="_blank" isMobile={isMobile}>
      <span></span>
      <div>{name}</div>
    </LinkDiv>
  )
}

export default ShareLink