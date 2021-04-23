import React from 'react'
//import PropTypes from 'prop-types'
import styled from 'styled-components'
//import parseHtml from 'html-react-parser'
//import { useTranslation } from 'react-i18next'
import {
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryGroup,
  //VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryLine,
  //VictoryTooltip, 
} from 'victory' 
//import {createAccumulatedData} from './Tools'
//import {colors} from './chartColors'
import {colorNER} from './chartColors'
import periods from './../data/years'
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"

const ChartTitle = styled.div`
  margin-left: 70px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 550px;
  background: white;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`
const LineChart = ({lineData, selectedScenario, selectedScenario2, selectedCountries, chartName }) => {
  console.log("scenario1: ", selectedScenario)
  console.log("scenario2: ", selectedScenario2)
let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })
  if (selectedScenario.includes("_copy"))
selectedScenario = selectedScenario.replace("_copy", "")
if (selectedScenario2.includes("_copy"))
selectedScenario2 = selectedScenario2.replace("_copy", "")
let legends = new Set()
  lineData.data.scenarios
  .find(o => o.scenario.toLowerCase() === selectedScenario.toLowerCase())
  .indicators.find(o => o.indicator === chartName).regions.forEach((reg)=>{
    reg.indicatorGroups.forEach((group)=>{
      legends.add(group.indicatorGroup)
    })
  })
  
legends = selectedDataRegions

//const maxY = 4
let selectedScenarioData = lineData.data.scenarios.find((scenario)=>{
  return scenario.scenario.toLowerCase() === selectedScenario.toLowerCase()
})
let indicatorData = selectedScenarioData.indicators.find((indicator) => {
  return indicator.indicator === chartName
})
console.log("scenario: ", )
  return (
    <>
  <ChartContainer>
      <ChartTitle>{chartName}</ChartTitle>
      <VictoryChart domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}>
        <VictoryAxis 
          key={0} tickValues={periods} tickFormat={periods} />
          <VictoryAxis
            dependentAxis
            axisLabelComponent={<VictoryLabel dx={10} dy={-50}/>}
            key={2}
            offsetX={80}
            domain={[0, .001]}
            /*tickFormat={tick =>
              `${
                  (tick * maxY).toFixed(0)
              }`
            }
            tickValues={[0, 0.25, 0.5, 0.75]}*/
            label={indicatorData.unit}
          />
          <VictoryGroup >
        {selectedDataRegions.map((country, i)=>{
          let lineChartData = []
          
          indicatorData.regions.forEach((region)=>{
            if (region.region === country) {
              region.indicatorGroups[0].indicatorGroupValues.forEach((item)=>{
              lineChartData.push({x: item.year, y: item.total})
              })
            }
          })
          return(
            <VictoryLine 
              key={"lini"+i} 
              data={lineChartData} 
              style={{
                //data: { stroke: colors[i] },
                data: { stroke: colorNER[i] },
              }}>
            </VictoryLine>
          )
        })}
        {selectedScenario2 !== "" && selectedDataRegions.map((country, i)=>{
          let lineChartData2 = []
          let selectedScenarioData = lineData.data.scenarios.find((scenario)=>{
            return scenario.scenario.toLowerCase() === selectedScenario2.toLowerCase()
          })
          let indicatorData = selectedScenarioData.indicators.find((indicator) => {
            return indicator.indicator === chartName
          })
          indicatorData.regions.forEach((region)=>{
            if (region.region === country) {
              region.indicatorGroups[0].indicatorGroupValues.forEach((item)=>{
              lineChartData2.push({x: item.year, y: item.total})
              })
            }
          })
          return(
            <VictoryLine 
              key={"lini"+i} 
              data={lineChartData2} 
              style={{
                //data: { stroke: colors[i], strokeDasharray: "4" },
                data: { stroke: colorNER[i], strokeDasharray: "4" },
              }}>
            </VictoryLine>
          )
        })}
        
        </VictoryGroup>
        <VictoryLegend
            x={90}
            y={70}
            orientation="horizontal"
            gutter={10}
            rowGutter={10}
            symbolSpacer={4}
            itemsPerRow={4}
            style={{
              title: { fontSize: 34, leftPadding: -10 },
            }}
            //colorScale={colors}
            colorScale={colorNER}
            data={Array.from(legends).map((legend, i) => ({
                name: legend
                  .concat('        ')
                  .substr(0, 16),
                //fill: colors[i],
                fill: colorNER[i],
              }))}
            //labelComponent={<MyCustomHTMLLabel />}
          />
      </VictoryChart>
      </ChartContainer>
  </>
    )
}

export default LineChart