import React from 'react'
import Welcome from '../alert/Welcome'
import { MainArea, Flex } from './Charts.style'
import StackedBarChartHistorical from './StackedBarChartHistorical'
import StackedBarChartHistoricalPerCountry from './StackedBarChartHistoricalPerCountry'
import LineChartHistorical from './LineChartHistorical'
import HistoricalData1 from "./../data/stackedBarTab81"
import HistoricalData2 from "./../data/stackedBarTab82"
import HistoricalData3 from "./../data/stackedBarTab83"
import {createIndicator1Data} from "./Tools"
import {createIndicator2Data} from "./Tools"
import {createIndicator4Data} from "./Tools"
import {createIndicator6Data} from "./Tools"
import {createIndicator9Data} from "./Tools"
//import LineChart from './LineChart'
//import historicalYears from "./../data/historicalyears"
//import periods from './../data/years'

const HistoricalCharts = props => {
  const indicator1Data = createIndicator1Data(HistoricalData1, props.selectedCountries)
  const indicator2Data = createIndicator2Data(HistoricalData2, props.selectedCountries)
  const indicator4Data = createIndicator4Data(HistoricalData3, props.selectedCountries)
  const indicator6Data = createIndicator6Data(HistoricalData2, props.selectedCountries)
  const indicator9Data = createIndicator9Data(HistoricalData2, props.selectedCountries)
  //console.log("indicatorData1: ", indicator1Data)
  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome} 
          tab="tab-history"/>
      <Flex>
      <LineChartHistorical
        chartName={"Battery and plug-in hybrid electric vehicles share of new passenger vehicle sales (Electrification of transport)"}
        data={indicator4Data}
        selectedCountries={props.selectedCountries}
        xRange={[2013, 2014, 2015, 2016, 2017, 2018, 2019]}
      >
      </LineChartHistorical>
      <LineChartHistorical
        chartName={"Share of RE in electricity"}
        data={indicator1Data}
        selectedCountries={props.selectedCountries}
        xRange={[1990, 1995, 2000, 2005, 2010, 2015]}
      >
      </LineChartHistorical>
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
        
        
      </Flex>
    </MainArea>
  )
}
export default HistoricalCharts