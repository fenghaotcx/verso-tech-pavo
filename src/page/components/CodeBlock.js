import styled from 'styled-components';

const IconName = styled.div`
  display: flex;
  height: 25px;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  font-size: 16px;
  padding: 0 8px;
  color:${({color})=>  color=== 'grey'? '#7B84A3':'#20CC8E'} ;
  background:${({color})=>  color=== 'grey'? '#F4F9FD':'rgba(55, 225, 164, 0.2)'} ;
  margin: 0 auto;
  white-space: nowrap;
`

const CodeBlock = ({children,color}) => {
  return (
    <IconName color={color}>
      {children}
    </IconName>
  )
}

export default CodeBlock