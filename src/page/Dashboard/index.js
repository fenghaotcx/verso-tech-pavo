import Title from '../components/Title'
import TopDiv from '../components/TopDiv'
import StatisticsBox from '../components/StatisticsBox'
import Content from '../components/content'
import TableBox from '../components/TableBox'
import CollateralTable from '../components/collateralTable'
import FarmingTable from '../components/FarmingTable'


// import styled from 'styled-components'

// const Sa = styled.div`
//   background: #FFFFFF;
//   width: calc((100% - 18px * 2) / 3);
//   height: 173px;
//   border-radius: 16px;
//   box-sizing: border-box;
//   padding: 17px 20px;
//   @media (max-width: 1025px) {
//     padding: 5px 7px;
//   }

// `
const arr = [
  {
    name:'Total Net Worth',
    totol: 30,
    percentage: 40,
    Increase: 5.8,
    profit:12000,
    index:0
  },
  {
    name:'Total Assets',
    totol: 30,
    percentage: 40,
    Increase: 5.8,
    profit:12000,
    index:1
  },
  {
    name:'Total Debts',
    totol: 30,
    percentage: 40,
    Increase: 5.8,
    profit:12000,
    index:2
  }
]


const Dashboard = () => {
    return (
        <>
          <Title>My Portfolio</Title>
          <TopDiv>
            {arr.map((item,index)=>{
              return <StatisticsBox info={item}  key={index}/>
            })}
          </TopDiv>
          <Content />
          <TableBox>
            <CollateralTable />
          </TableBox>
          <TableBox>
            <FarmingTable />
          </TableBox>
        </>
    )
}

export default Dashboard