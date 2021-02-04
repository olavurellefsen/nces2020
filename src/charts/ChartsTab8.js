import React from 'react'
import styled from 'styled-components'
//import PropTypes from 'prop-types'
import Welcome from '../alert/Welcome'
import { MainArea, Flex } from './Charts.style'
import StackedBarChartHistorical from './StackedBarChartHistorical'
import HistoricalData from "./../data/stackedBarTab8"
import {createIndicator1Data} from "./Tools"
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
  const indicator1Data = createIndicator1Data(HistoricalData, props.selectedCountries)
  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome} 
          tab="tab-history"/>
      <Flex>
        <StackedBarChartHistorical
          stackedBar={HistoricalData}
          selectedCountries={props.selectedCountries}
        ></StackedBarChartHistorical>
        <div>
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
        </div>
      </Flex>
    </MainArea>
  )
}
const ChartTitle = styled.div`
  margin-left: 70px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
export default HistoricalCharts