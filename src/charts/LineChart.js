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
  VictoryLine,
  VictoryTooltip, 
} from 'victory' 
import {createAccumulatedData} from './Tools'
import {colors, colors2} from './chartColors'
import periods from './../data/years'
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"

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
  selectedDataRegions.forEach((country)=>{
    let selectedScenarioData = lineData.data.scenarios.find((scenario)=>{
      //console.log("scenario: ", scenario)
      return scenario.scenario === selectedScenario
    })
    let indicatorData = selectedScenarioData.indicators.find((indicator) => {
      return indicator.indicator === chartName
    })
    indicatorData.regions.forEach((region)=>{
      if (region.region === country) {
      //console.log("region.indicatorGroups[0].indicatorGroupValues: ", region.indicatorGroups[0].indicatorGroupValues)
      }
      let lineChartData = []
      region.indicatorGroups[0].indicatorGroupValues.forEach((item)=>{
        lineChartData.push({x: item.year, y: item.total})
      })
      console.log("lineChartData: ", lineChartData)
    )
const maxY = 2
  return (
    <VictoryChart domainPadding={20}
      width={550}
      height={550}
      padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
      theme={VictoryTheme.material}>
      {/* <VictoryAxis key={0} tickValues={periods} tickFormat={periods} />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dx={10} dy={-50}/>}
          key={2}
          offsetX={80}
          tickFormat={tick =>
            `${
                (tick * maxY).toFixed(1)
            }`
          }
          tickValues={[0, 0.25, 0.5, 0.75]}
          //label={unit}
        /> */}
      {
          return(
            <VictoryLine data={[
      { x: 0.1, y: 0.2 },
      { x: 0.2, y: 0.3 },
      { x: 0.3, y: 0.5 },
      { x: 0.4, y: 0.4 },
      { x: 0.5, y: 0.7 }
    ]}></VictoryLine>
            
            )
          } else return null
      }
        )
        //console.log("selectedScenario: ", selectedScenario)
        //console.log("selectedScenario: ", selectedScenario)
        //console.log("selectedScenarioData: ", selectedScenarioData)
        //console.log("indicatorData: ", indicatorData)
        
      })}
    </VictoryChart>)
}

export default LineChart