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
import {colors, colors2} from './chartColors'
import periods from './../data/years'
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"

const ChartTitle = styled.div`
  margin-left: 70px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
const LineChart = ({lineData, selectedScenario, selectedScenario2, selectedCountries, chartName }) => {
  /* const scenario = selectedScenario.includes("_copy") ? 
    selectedScenario.replace("_copy", "") : 
    selectedScenario
 */
let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })
//console.log("lineData: ", lineData)
console.log("periods: ", periods)
let legends = new Set()
  lineData.data.scenarios
  .find(o => o.scenario.toLowerCase() === selectedScenario.toLowerCase())
  .indicators.find(o => o.indicator === chartName).regions.forEach((reg)=>{
    reg.indicatorGroups.forEach((group)=>{
      legends.add(group.indicatorGroup)
    })
  })
legends = selectedDataRegions
console.log("legend: ", Array.from(legends).map((legend, i) => ({
  name: legend
    .concat('        ')
    .substr(0, 16),
  fill: colors[i],
})))
const maxY = 4
  return (
    <div>
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
            /*tickFormat={tick =>
              `${
                  (tick * maxY).toFixed(0)
              }`
            }
            tickValues={[0, 0.25, 0.5, 0.75]}*/
            //label={unit}
          />
          <VictoryGroup >
        {selectedDataRegions.map((country, i)=>{
          let lineChartData = []
          let selectedScenarioData = lineData.data.scenarios.find((scenario)=>{
            //console.log("scenario: ", scenario)
            return scenario.scenario === selectedScenario
          })
          let indicatorData = selectedScenarioData.indicators.find((indicator) => {
            return indicator.indicator === chartName
          })
          let chartData = []
          indicatorData.regions.forEach((region)=>{
            if (region.region === country) {
            //console.log("region.indicatorGroups[0].indicatorGroupValues: ", region.indicatorGroups[0].indicatorGroupValues)
            
            region.indicatorGroups[0].indicatorGroupValues.forEach((item)=>{
              lineChartData.push({x: item.year, y: item.total})
            })
            console.log("lineChartData: ", lineChartData)
            //chartData.push(lineChartData)
        }}
          )
          //console.log("selectedScenario: ", selectedScenario)
          //console.log("selectedScenario: ", selectedScenario)
          //console.log("selectedScenarioData: ", selectedScenarioData)
          //console.log("indicatorData: ", indicatorData)
          //console.log("chartData: ", chartData)
          return(<VictoryLine data={lineChartData} style={{
                      data: { stroke: colors[i] },
                    }}></VictoryLine>)
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
            colorScale={colors}
            data={Array.from(legends).map((legend, i) => ({
                name: legend
                  .concat('        ')
                  .substr(0, 16),
                fill: colors[i],
              }))}
            //labelComponent={<MyCustomHTMLLabel />}
          />
      </VictoryChart>
    </div>
    )
}

export default LineChart