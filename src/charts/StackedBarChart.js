import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parseHtml from 'html-react-parser'
//import { useTranslation } from 'react-i18next'
import {
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryGroup,
  VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip, 
} from 'victory'
import {createAccumulatedData} from './Tools'
//import {colors, colors2} from './chartColors'
import {colorNER} from './chartColors'
import periods from './../data/years'
import {indicatorgroup_colors} from '../charts/indicatorgroup_color'
import { CSVLink } from 'react-csv'

const showButton = true;
const ChartContainer = styled.div`
  width: 550px;
  height: 625px;
  background: white;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 70px;
  margin-right: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
`
const ChartTitle = styled.div`
  
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
const StackedBarChart = props => {
  //const { t } = useTranslation()
  const stackedBar = props.stackedBar
  const scenario = props.selectedScenario.includes("_copy") ? props.selectedScenario.replace("_copy", "") : props.selectedScenario
  const scenario2 = props.selectedScenario2
  const selectedCountries = props.selectedCountries
  const chartName = props.chartName
  //const chartTitle = t('chartTitle.' + props.chartTitle)
  const chartTitle = props.chartTitle
  const combinedChart = false //props.combinedChart

  let gutter, rowGutter
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    gutter = 0
    rowGutter = 0
  } else {
    gutter = 0
    rowGutter = 0
  }

   let maxY2 = 1
  // let minY2 = 0
  // if (combinedChart === true) {
  //   maxY2 = props.maxY2
  //   minY2 = props.minY2
  // }

  // let yDomain = [0, 1]
  // if (props.minY < 0 || minY2 < 0) {
  //   let stackedRatio = props.minY / props.maxY
  //   let lineRatio = minY2 / maxY2
  //   yDomain = stackedRatio < lineRatio ? [stackedRatio, 1] : [lineRatio, 1]
  // }

  
 
  const dataScenario1 = createAccumulatedData(stackedBar.data, scenario, false, chartName, selectedCountries)
  const dataScenario2 = createAccumulatedData(stackedBar.data, scenario2, false, chartName, selectedCountries)
  console.log("datascenario1: ", dataScenario1)
  const accumulatedDataScenario1 = dataScenario1[0]
  const accumulatedDataScenario2 = scenario2 ? dataScenario2[0] : undefined
  const totalYearValuesPositiveScenario1 = dataScenario1[1]
  const totalYearValuesNegativeScenario1 = dataScenario1[2]
  const totalYearValuesPositiveScenario2 = scenario2 ? dataScenario2[1] : undefined
  const totalYearValuesNegativeScenario2 = scenario2 ? dataScenario2[2] : undefined
  const unit = dataScenario1[3]
  let maxY = -Infinity
  let minY = Infinity
  let base = 0
  
  Object.keys(totalYearValuesPositiveScenario1).forEach(year => {
    maxY = Math.round(Math.max(maxY, totalYearValuesPositiveScenario1[year],
      scenario2 ? totalYearValuesPositiveScenario2[year] : -Infinity))
    minY = Math.round(Math.min(minY, totalYearValuesNegativeScenario1[year],
      scenario2 ? totalYearValuesNegativeScenario2[year] : Infinity))
  })
  let t = 1
  let i = 0
  let range = [2,4,6,8,10]
  while(t < maxY) {
    t = range[i%5]*Math.pow(range[4], Math.floor(i/5))
    i++
  }
  maxY = t
  let u=1
  let j=0
  while(u > minY && j < 20) {
    u = -range[j%5]*Math.pow(range[4], Math.floor(j/5))
    j++
  }
  minY = u

  //base is used in tickFormat
  if (maxY < -minY) 
    base = -minY
  else 
    base = maxY
  let legends = new Set()
  stackedBar.data.scenarios
  .find(o => o.scenario.toLowerCase() === scenario.toLowerCase())
  .indicators.find(o => o.indicator === chartName).regions.forEach((reg)=>{
    reg.indicatorGroups.forEach((group)=>{
      legends.add(group.indicatorGroup)
    })
  })
  
const MyCustomHTMLLabel = props => {
  const text = props.text.replaceAll('§', '')

  return (
    <foreignObject x={props.x+3} y={props.y-9} width={100} height={40}>
      <div style={{ fontSize: '12px', fontFamily: "Open Sans" }}>{parseHtml(text)}</div>
    </foreignObject>
  );
};
const defTick = [0, 0.25, 0.5, 0.75]
const getTickValues = () => {
  let ret = []
  if (-minY > maxY) {
    ret=[-0.75,-0.5, -0.25, 0]
    defTick.forEach((tick, i)=> {
      if (tick !== 0.75)
      if (-tick*minY < maxY)
      ret.push(defTick[i+1])
    })
  }
  else {
    ret=[0, 0.25, 0.5, 0.75]
    defTick.forEach((tick, i)=> {
      if (tick !== 0.75)
        if (tick*maxY + maxY*0.05 < -minY)
          ret.unshift(-defTick[i+1])
    })
  }
  
  return ret
}
const getCSVData = (accumulatedData) => {
  let ret = []
  console.log("accu entries: ", Object.entries(accumulatedData))
  Object.entries(accumulatedData).forEach((indicatorGroup) => {
    //console.log("indicatorGroup: ", indicatorGroup[0])
    indicatorGroup[1].forEach((item)=>{
      //console.log("item.year: ", item.year)
      //console.log("item.value: ", item.total)
      ret.push({indicatorGroup: indicatorGroup[0], year: item.year, value: item.total})
    })
  //console.log('ret: ', ret)
  })
  return ret
  //{scenario: scen.scenario, indicator: ind.indicator, indicatorGroup: indicatorGroup.indicatorGroup, year: y, value:0}
}
//getCSVData(dataScenario1[0])
  return (
    <ChartContainer>
    <ChartHeader>
      <ChartTitle>{chartTitle}</ChartTitle>
      {showButton && <CSVLink 
        data={getCSVData(dataScenario1[0])}
        filename={chartTitle + " " + selectedCountries + ".csv"}
      >
        Download as CSV</CSVLink>}
    </ChartHeader>
      <VictoryChart
        domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}
        style={{parent: { height: "550px" }}}
        // domain={{ y: yDomain }} //removed to fix issue with axis labels not being updated
      >
      
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dx={10} dy={-50}/>}
          key={2}
          offsetX={80}
          tickFormat={tick =>
            
            ((tick * base) / props.divideValues).toLocaleString()
          }
          tickValues={getTickValues()}
          label={unit}
        />
        {combinedChart === true && (
          <VictoryAxis
            dependentAxis
            key={3}
            offsetX={330}
            label={props.label2}
            style={{
              axis: { stroke: 'gray' },
              axisLabel: { fill: 'gray', padding: -50 },
              ticks: { padding: -25 },
              tickLabels: { fill: 'gray', textAnchor: 'start' },
            }}
            tickFormat={tick =>
              `${
                props.Y2Percentage === false
                  ? tick * maxY2
                  : tick * maxY2 * 100 + '%'
              }`
            }
            tickValues={[0, 0.25, 0.5, 0.75, 1.0]}
          />
        )}
        
        <VictoryGroup offset={15} style={{ data: { width: 15 } }}>
          <VictoryStack>
            {Object.keys(accumulatedDataScenario1).map((chartGroupName, i) => (
                <VictoryBar
                  key={chartGroupName}
                  data={accumulatedDataScenario1[chartGroupName].map(
                    chartGroupValue => {
                      return({
                      ...chartGroupValue,
                      label:
                        chartGroupName +
                        ': ' +
                        (props.YPercentage
                          ? (
                              (chartGroupValue.total * 100) /
                              props.divideValues
                            ).toFixed(0) + '%'
                          : (
                              chartGroupValue.total / props.divideValues
                            ).toFixed(0)),
                    })}
                  )}
                  x="year"
                  y={datum => datum['total'] / (base === 0 ? 100 : base)}
                  labelComponent={<VictoryTooltip />}
                  style={{
                    data: { fill: () => {
                      if (indicatorgroup_colors[chartGroupName]) 
                        return indicatorgroup_colors[chartGroupName]
                      else
                        return colorNER[i]
                      }, 
                    },
                  }}
                />
              ))}
          </VictoryStack>
          {scenario2 !== '' && (
            <VictoryStack>
              {Object.keys(accumulatedDataScenario2).map((chartGroupName, i) => (
                  <VictoryBar
                    key={chartGroupName}
                    data={accumulatedDataScenario2[chartGroupName].map(
                      chartGroupValue => ({
                        ...chartGroupValue,
                        label:
                          chartGroupName +
                          ': ' +
                          (props.YPercentage
                            ? (
                                (chartGroupValue.total * 100) /
                                props.divideValues
                              ).toFixed(0) + '%'
                            : (
                                chartGroupValue.total / props.divideValues
                              ).toFixed(0)),
                      })
                    )}
                    x="year"
                    y={datum => datum['total'] / (base === 0 ? 100 : base)}
                    labelComponent={<VictoryTooltip />}
                    style={{
                    data: { fill: () => {
                      if (indicatorgroup_colors[chartGroupName]) 
                        return indicatorgroup_colors[chartGroupName] + '88'
                      else
                        return colorNER[i] +'88'
                      }, 
                    },
                  }}
                  />
                ))}
            </VictoryStack>
          )}
        </VictoryGroup>
        <VictoryAxis key={0} tickValues={periods} tickFormat={periods} style={{
          grid: { strokeWidth: 0 },
        }}/>
        <VictoryLegend
          x={90}
          y={10}
          orientation="horizontal"
          gutter={gutter}
          rowGutter={rowGutter}
          symbolSpacer={4}
          itemsPerRow={4}
          style={{
            title: { fontSize: 14, leftPadding: -10 },
          }}
          //colorScale={colors}
          colorScale={colorNER}
          data={Array.from(legends).map((legend, i) => ({
              name: legend
                .concat('        ')
                .substr(0, 16),
              //fill: colors[i],
              symbol: { fill: () => {
                if (indicatorgroup_colors[legend]) 
                  return indicatorgroup_colors[legend]
                else
                  return colorNER[i]
                },
              }}
          ))}
          labelComponent={<MyCustomHTMLLabel />}
        />
      </VictoryChart>
    </ChartContainer>
  )
}

StackedBarChart.defaultProps = {
  divideValues: 1,
  selectedScenario2: '',
  YPercentage: false,
}

StackedBarChart.propTypes = {
  stackedBar: PropTypes.object,
  selectedScenario: PropTypes.string.isRequired,
  selectedScenario2: PropTypes.string,
  chartName: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired,
  combinedChart: PropTypes.bool.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  minY2: PropTypes.number,
  maxY2: PropTypes.number,
  label: PropTypes.string,
  divideValues: PropTypes.number,
  label2: PropTypes.string,
  YPercentage: PropTypes.bool,
  Y2Percentage: PropTypes.bool,
  selectedCountries: PropTypes.array.isRequired,
}


export default StackedBarChart
