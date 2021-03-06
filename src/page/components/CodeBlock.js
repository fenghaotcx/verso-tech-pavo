import styled from 'styled-components';

const IconName = styled.div`
  display: flex;
  height: ${({isMobile}) => isMobile? '15px':'25px'};
  width: fit-content;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  font-size: ${({isMobile}) => isMobile? '12px':'15px'};
  padding: 0 8px;
  color:${({color,isMobile})=> color === 'grey'? '#7B84A3':isMobile?'#fff':'#20CC8E'};
  background:${({color,isMobile})=> color === 'grey'? '#F4F9FD':isMobile?'#20CC8E':'rgba(55, 225, 164, 0.2)'};
  margin: 0 auto;
  white-space: nowrap;
`

const CodeBlock = ({children,color,isMobile}) => {
  return (
    <IconName color={color} isMobile={isMobile}>
      {children}
    </IconName>
  )
}

export default CodeBlock