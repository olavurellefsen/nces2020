import React from 'react'
import Welcome from '../alert/Welcome'
import { MainArea, Flex } from './Charts.style'
import StackedBarChartHistorical from './StackedBarChartHistorical'
import StackedBarChartHistoricalPerCountry from './StackedBarChartHistoricalPerCountry'
import LineChartDoubleYAxisHistorical from './LineChartDoubleYAxisHistorical'
import LineChartHistorical from './LineChartHistorical'
import HistoricalData1 from "./../data/stackedBarTab81" //nces_eleproduction
import HistoricalData2 from "./../data/stackedBarTab82" //nces_ghgemission
import HistoricalData3 from "./../data/stackedBarTab83" //nces_vehiclenumber
import HistoricalData4 from "./../data/stackedBarTab84" //nces_building_area
import HistoricalData5 from "./../data/stackedBarTab85" //nces_enercons_res
import HistoricalData6 from "./../data/stackedBarTab86" //nces_enercons_ser
import HistoricalData7 from "./../data/stackedBarTab87" //nces_enercons_ind
import HistoricalData8 from "./../data/stackedBarTab88" //nces_dh_gen
import {createIndicator1Data} from "./Tools"
import {createIndicator2Data} from "./Tools"
import {createIndicator3Data} from "./Tools"
import {createIndicator4Data} from "./Tools"
import {createIndicator6Data} from "./Tools"
import {createIndicator8Data} from "./Tools"
import {createIndicator9Data} from "./Tools"
import {createAccumulatedHistoricalData2} from "./Tools"
import {createAccumulatedHistoricalData3} from "./Tools"

const HistoricalCharts = props => { 
  const indicator1Data = createIndicator1Data(HistoricalData1, props.selectedCountries)
  const indicator2Data = createIndicator2Data(HistoricalData2, props.selectedCountries)
  const indicator3Data = createIndicator3Data(HistoricalData5, HistoricalData6, HistoricalData7, HistoricalData1, props.selectedCountries)
  const indicator4Data = createIndicator4Data(HistoricalData3, props.selectedCountries)
  const indicator5Data = createAccumulatedHistoricalData3(HistoricalData8, props.selectedCountries)
  const indicator6Data = createIndicator6Data(HistoricalData2, props.selectedCountries)
  const indicator7Data = createAccumulatedHistoricalData2(HistoricalData7, props.selectedCountries)
  const indicator8Data = createIndicator8Data(HistoricalData4, HistoricalData5, HistoricalData6, HistoricalData2, props.selectedCountries)
  const indicator9Data = createIndicator9Data(HistoricalData2, props.selectedCountries)
  
  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome} 
          tab="tabHistory"/>
      <Flex>
      <LineChartHistorical
        chartName={"Share of RE in Electricity"}
        data={indicator1Data}
        selectedCountries={props.selectedCountries}
        xRange={[1990, 1995, 2000, 2005, 2010, 2015]}
      />
      <StackedBarChartHistoricalPerCountry
          chartName={"CO2 Emissions from Power and District Heating"}
          stackedBar={indicator2Data}
          selectedCountries={props.selectedCountries}
          label={"Mt CO2"}
        />
      <LineChartDoubleYAxisHistorical
        chartName={"Share of Bioenergy from Gross RE Consumption"}
        data={indicator3Data}
        selectedCountries={props.selectedCountries}
        xRange={[2013, 2014, 2015, 2016, 2017, 2018]}
        label={"share"}
      />
      <LineChartHistorical
        chartName={"Battery and Plug-in Hybrid Electric Vehicles Share of New Passenger Vehicle Sales (Electrification of Transport)"}
        data={indicator4Data}
        selectedCountries={props.selectedCountries}
        xRange={[2013, 2014, 2015, 2016, 2017, 2018, 2019]}
      />
      <StackedBarChartHistorical
        chartName={"District Heat Generation (PJ) by Fuel (Electrification of Heat Supply)"}
        stackedBar={indicator5Data}
        selectedCountries={props.selectedCountries}
      />
      <StackedBarChartHistoricalPerCountry
        chartName={"CO2 Emissions from the Industrial Sector (Decarbonisation of Industry)"}
        stackedBar={indicator6Data}
        selectedCountries={props.selectedCountries}
        label={"Mt CO2"}
      />
      <StackedBarChartHistorical
        chartName={"Final Energy Consumption by Source (PJ) in Industry (Decarbonisation of Industry)"}
        stackedBar={indicator7Data}
        selectedCountries={props.selectedCountries}
      />
      <LineChartDoubleYAxisHistorical
        chartName={"Energy Intensity and CO<sub>2</sub> Emissions Intensity in the Buildings Sector (Energy Efficient and Smart Buildings) "}
        data={indicator8Data}
        selectedCountries={props.selectedCountries}
        xRange={[2013, 2014, 2015, 2016, 2017, 2018]}
        label={"energy: kWh/m2, emission: kgCO2/m2"}
      />
      <StackedBarChartHistoricalPerCountry
        chartName={"CO<sub>2</sub> Emissions from Road Transport (Green Mobility)"}
        stackedBar={indicator9Data}
        selectedCountries={props.selectedCountries}
        label={"Mt CO2"}
      />
      </Flex>
    </MainArea>
  )
}
export default HistoricalCharts