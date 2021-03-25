import React from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'
import Welcome from '../alert/Welcome'
import { MainArea, Flex } from './Charts.style'
import StackedBarChartHistorical from './StackedBarChartHistorical'
import StackedBarChartHistoricalPerCountry from './StackedBarChartHistoricalPerCountry'
import HistoricalData1 from "./../data/stackedBarTab81"
import HistoricalData2 from "./../data/stackedBarTab82"
import {createIndicator1Data} from "./Tools"
import {createIndicator2Data} from "./Tools"
import {createIndicator6Data} from "./Tools"
import {createIndicator9Data} from "./Tools"
//import LineChart from './LineChart'
//import historicalYears from "./../data/historicalyears"
//import periods from './../data/years'

import {
  VictoryChart,
  VictoryLabel,
  //VictoryLegend,
  VictoryGroup,
  //VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryLine,
  //VictoryTooltip, 
} from 'victory'
const HistoricalCharts = props => {
  const indicator1Data = createIndicator1Data(HistoricalData1, props.selectedCountries)
  const indicator2Data = createIndicator2Data(HistoricalData2, props.selectedCountries)
  const indicator6Data = createIndicator6Data(HistoricalData2, props.selectedCountries)
  const indicator9Data = createIndicator9Data(HistoricalData2, props.selectedCountries)
  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome} 
          tab="tab-history"/>
      <Flex>
      <StackedBarChartHistoricalPerCountry
          chartName={"CO2 emissions (Mt CO2) from power and district heating"}
          stackedBar={indicator2Data}
          selectedCountries={props.selectedCountries}
        ></StackedBarChartHistoricalPerCountry>
      <StackedBarChartHistoricalPerCountry
        chartName={"CO2 emissions (Mt CO2) from the industrial sector (Decarbonisation of industry)"}
        stackedBar={indicator6Data}
        selectedCountries={props.selectedCountries}
      ></StackedBarChartHistoricalPerCountry>
      <StackedBarChartHistoricalPerCountry
        chartName={"CO2 emissions (Mt CO2) from road transport (Green mobility)"}
        stackedBar={indicator9Data}
        selectedCountries={props.selectedCountries}
      ></StackedBarChartHistoricalPerCountry>
        <StackedBarChartHistorical
          stackedBar={HistoricalData1}
          selectedCountries={props.selectedCountries}
        ></StackedBarChartHistorical>
        
        <ChartContainer>
        <ChartTitle>Share of RE in electricity</ChartTitle>
        <VictoryChart domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}>
        <VictoryAxis 
          key={'lineAxis'} tickValues={[1990, 1995, 2000, 2005, 2010, 2015]} />
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
            label={"Share"}
          />
          <VictoryGroup>
          <VictoryLine 
              key={"lini2"} 
              data={indicator1Data}
              style={{
                data: { stroke: 'pink' },
              }}>
            </VictoryLine></VictoryGroup>
          
          </VictoryChart>
        </ChartContainer>
      </Flex>
    </MainArea>
  )
}
const ChartContainer = styled.div`
  min-width: 550px;
`

const ChartTitle = styled.div`
  margin-left: 70px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
export default HistoricalCharts