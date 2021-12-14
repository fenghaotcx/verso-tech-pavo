import { useEffect} from 'react';
import styled from 'styled-components'
import Styles from './StatisticsBox.module.css'
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

const Box = styled.div`
  background: #FFFFFF;
  width: calc((100% - 18px * 2) / 3);
  border-radius: 16px;
  box-sizing: border-box;
  padding: 17px 20px;
  @media (max-width: 1025px) {
    padding: 5px 7px;
    width: 100%;
    margin-bottom: 22px;
  }
`


echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);


const StatisticsBox = ({info,children}) => {
    useEffect(() => {
        
        let chartDom = document.getElementById(`main_${info.index+1}`);
        
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                formatter: function () {
                    return "";
                }
            },
            "splitLine": {
                "show": false
            },
            "axisLine": {       //y轴
                "show": false
            },
            "axisTick": {       //y轴刻度线
                "show": false
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
                formatter: function () {
                    return "";
                }
            },
            dispaly: "none",
            "axisLine": {       //y轴
                "show": false
            },
            "axisTick": {       //y轴刻度线
                "show": false
            },
            "splitLine": {     //网格线
                "show": false
            },
            "show": true,
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
              symbol: 'none',
              areaStyle: {
                
                  // 填充色渐变
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#3aa7ff" },
                    { offset: 0.6, color: "rgba(48, 79, 253, 0.2)" },
                    { offset: 1, color: "rgba(169, 116, 255, 0)" }
                  ])
                
              },
            },
          ],
          grid: {
            containLabel: true,
            right: 0,
            y2: 50,
          }
        };

        option && myChart.setOption(option);
        return () => {
            
        }
    })
  return (
    <Box>
      <div className={`${Styles.type} ${Styles[`type_${info.index+1}`]}`}>
        <span className={Styles.name}>{info.name} </span> <span >(24h)</span>
      </div>
      <div className={Styles.info}>
          <div className={Styles.info_left}>
              <div className={Styles.info_left_top}>
                  <span>$30K</span>
                  <span className={Styles.percentage}>5.8% <img src="" alt="" /></span>
              </div>
              <div className={Styles.info_left_bot}>+$12,000</div>
          </div>
          <div className={Styles.info_right} >
            <div id={`main_${info.index+1}`}></div>
          </div>
      </div>
    </Box>
  )
}

export default StatisticsBox


