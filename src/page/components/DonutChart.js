import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent,GraphicComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {numberFormat} from '../../utils/convertFloat';
import ReactECharts from 'echarts-for-react';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  GraphicComponent
]);

const DonutChart = ({children,isMobile,theme,assets,AssetsItemArr=[]}) => {
  let data = AssetsItemArr.map((item,index)=> {
    let obj = {
      name: item[0].name || item[0].url,
      value: item[4].value,
    }
    return obj
  })
  let op = {
    tooltip: {
      trigger: 'item'
    },
  //   legend: {
  //     top: '5%',
  //     left: 'center'
  //   },
    color: ['#5b79d6','#ff7171','#ffdd6a','#90cc7b'],
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: 'center',
        children:[
          {
            type:'text',
            style: {
              text:`${ numberFormat(assets?.totalValue||0)}`,
              textAlign: 'center',
              fill: theme === 'dark'?'#fff':'#3F434A',
              width: 30,
              height: 30,
              fontWeight: 500,
              fontSize: 24,
            },
          }
        ]
      },
      {
        type: 'group',
        left: 'center',
        top: '100',
        children:[
          {
            type:'text',
            style: {
              text: 'Total',
              textAlign: 'center',
              fill:  theme === 'dark'?'#A3AED0':'#7B84A3',
              width: 30,
              height: 30,
              fontSize: 14,
            },
          }
        ]
      },
    ],
    series: [
      {
        name: 'Asset',
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
        data
      }
    ]
  };
  return (
    <ReactECharts 
      id="donutChart" 
      notMerge={true}
      lazyUpdate={true} 
      option={op} 
      style={{ height: 170,width: 170,margin:isMobile?'0 auto 25px':'0 50px 0 0',}} 
    />
  )
}

export default DonutChart