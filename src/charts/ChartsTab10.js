import React from 'react'
import Welcome from '../alert/Welcome'
import { MainArea, Flex } from './Charts.style'
import StackedBarChartHistorical from './StackedBarChartHistorical'
import HistoricalData1 from "./../data/stackedBarTab81" //nces_eleproduction
import HistoricalData2 from "./../data/stackedBarTab82" //nces_ghgemission
//import HistoricalData3 from "./../data/stackedBarTab83" //nces_vehiclenumber
//import HistoricalData4 from "./../data/stackedBarTab84" //nces_building_area
import HistoricalData5 from "./../data/stackedBarTab85" //nces_enercons_res
import HistoricalData6 from "./../data/stackedBarTab86" //nces_enercons_ser
import HistoricalData7 from "./../data/stackedBarTab87" //nces_enercons_ind
//import HistoricalData8 from "./../data/stackedBarTab88" //nces_dh_gen
import {createAccumulatedHistoricalData1} from "./Tools"
import {createAccumulatedRawHistoricalData2} from "./Tools"
import {createAccumulatedRawHistoricalData3} from "./Tools"
import {createAccumulatedRawHistoricalData4} from "./Tools"
import {createAccumulatedRawHistoricalData5} from "./Tools"

const RawHistoricalCharts = props => {  
  const HistoricalTableData1 = createAccumulatedHistoricalData1(HistoricalData1, props.selectedCountries)
  const HistoricalTableData2 = createAccumulatedRawHistoricalData2(HistoricalData2, props.selectedCountries)
  const HistoricalTableData3 = createAccumulatedRawHistoricalData3(HistoricalData7, props.selectedCountries)
  const HistoricalTableData4 = createAccumulatedRawHistoricalData4(HistoricalData6, props.selectedCountries)
  const HistoricalTableData5 = createAccumulatedRawHistoricalData5(HistoricalData5, props.selectedCountries)
  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome} 
          tab="tabRawHistory"/>
      <Flex>
      <StackedBarChartHistorical
          chartName="Electricity production"
          stackedBar={HistoricalTableData1}
          selectedCountries={props.selectedCountries}
          label="GWh"
      ></StackedBarChartHistorical>
      <StackedBarChartHistorical
          chartName="CO<sub>2</sub> emissions"
          stackedBar={HistoricalTableData2}
          selectedCountries={props.selectedCountries}
          label="kt CO2"
      ></StackedBarChartHistorical>
      <StackedBarChartHistorical
          chartName="Final energy consumption in industry"
          stackedBar={HistoricalTableData3}
          selectedCountries={props.selectedCountries}
      ></StackedBarChartHistorical> 
      <StackedBarChartHistorical
          chartName="Final energy consumption in services sector"
          stackedBar={HistoricalTableData4}
          selectedCountries={props.selectedCountries}
      ></StackedBarChartHistorical> 
      <StackedBarChartHistorical
          chartName="Final energy consumption in residential sector "
          stackedBar={HistoricalTableData5}
          selectedCountries={props.selectedCountries}
      ></StackedBarChartHistorical>  
      </Flex>
      
    </MainArea>
  )
}
export default RawHistoricalCharts