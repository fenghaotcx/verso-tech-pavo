import styled from 'styled-components'
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent,GraphicComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect} from 'react';


const DonutDiv = styled.div`
  height: 170px;
  width: 170px;
  margin-right: 50px;
  @media (max-width: 1025px) {
    margin: 0 auto;
  }
`
echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    GraphicComponent
  ]);

const DonutChart = ({children}) => {
    useEffect(()=>{
        var chartDom = document.getElementById('donutChart');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          tooltip: {
            trigger: 'item'
          },
        //   legend: {
        //     top: '5%',
        //     left: 'center'
        //   },
          graphic: [
              {type: 'group',
              left: 'center',
              top: 'center',
              children:[
                  {type:'text',
                  style: {
                    text: '$260k',
                    textAlign: 'center',
                    fill: 'color: #3F434A;',
                    width: 30,
                    height: 30,
                    fontWeight: 500,
                    fontSize: 24,
                  },
                }
              ]},
              {type: 'group',
              left: 'center',
              top: '100',
              children:[
                  {type:'text',
                  style: {
                    text: 'Total',
                    textAlign: 'center',
                    fill: 'color: #7B84A3;',
                    width: 30,
                    height: 30,
                    fontSize: 14,
                  },
                }
              ]},
              
        ],
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['75%', '90%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        };

        option && myChart.setOption(option);
    },[])

    return (
        <DonutDiv id="donutChart"></DonutDiv>
    )
}

export default DonutChart