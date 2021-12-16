import styled from 'styled-components'
import LogoWhite from '../../../public/icon/LogoWhite.svg'
import DollarImg from '../../../public/icon/Dollar.svg'
import MyButton from '../MyButton'

const LeftDiv = styled.div`
  flex:1;
  height: 302px;
  background: linear-gradient(123.34deg, #304FFD 7.62%, #74C5FF 97.61%);
  border-radius: 14px;
  position: relative;
  font-size: 15px;
  line-height: 22px;
  color: #F4F9FD;
  padding: 44px 10px 25px 28px;
  display: flex;
  justify-content: space-around;
  @media (max-width: 1025px) {
    margin-bottom: 20px;
  }
  & .white_logo {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
  & div {
    position: relative;
    z-index: 1;
  }
  & .right_info {
    & div {
        font-weight: 700;
        font-size: 30px;
        line-height: 45px;
    }
    & .total {
        margin: 4px 0  34px  0;
    }
  }
` 
const Dollar = styled.div`
    width: 65px;
    height: 66px;
    background: #FFFFFF;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & img {
        height: 53px;
    }
` 

const LeftBox = () => {
    return (
        <LeftDiv>
            <img className="white_logo" src={LogoWhite} alt="" />
            <Dollar>
                <img src={DollarImg} alt="" />
            </Dollar>
            <div className="right_info">
                <p>Total Farming APR </p>
                <div>30%</div>
                <p>Pending Rewards & Airdrops</p>
                <div className="total">$120</div>
                <MyButton>Claim All</MyButton>
            </div>
        </LeftDiv>
    )
}

export default LeftBox