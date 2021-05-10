import React from 'react'
import styled from 'styled-components'
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"
import { colorNER } from "./chartColors"
import historicalYears from "./../data/historicalyears"
import {
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryGroup,
  VictoryTheme,
  VictoryAxis,
  VictoryLine
} from 'victory'
import { CSVLink } from 'react-csv'

const ChartContainer = styled.div`
  width: 550px;
  height: 650px;
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
  margin-right: 10px;
`

const LineChartDoubleYAxisHistorical = ({
  chartName = "chart name",
  data = [],
  YPercentage = false,
  Y2Percentage = false,
  divideValues = 1,
  label="PJ",
  label2="c",
  selectedCountries = [],
  combinedChart = false,
  maxY2 = 100,
  xRange = historicalYears
}) => {
  //const accumulatedData = stackedBar[0]
  //const totalYearValuesScenario1 = stackedBar[1]
  //const legends = stackedBar[2]
  //const colors2 = stackedBar[3]
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

let selectedDataRegions = [] 
mapRegionToDataRegions.forEach((mapRegion) => {
  if(selectedCountries.includes(mapRegion.path_id)) {
  mapRegion.historical_data_regions.forEach((dataRegion) => {
    selectedDataRegions.push(dataRegion)
  })
}
})
const legendColors = () => {
  let ret = colorNER.slice(0, 3)
  Object.keys(data).forEach((key, i) => {
    ret[key] = colorNER[i] 
  })
  return ret
}
const getCSVData = (lineData) => {
  let ret = []
  Object.entries(lineData).forEach((indicatorGroup) => {
    indicatorGroup[1].forEach((item)=>{
      ret.push({indicatorGroup: indicatorGroup[0], year: item.x, value: item.y})
    })
  })
  return ret
}
const renderLines = (lineData) => {
  let ret = []
  for (let line in lineData) {
    ret.push(<VictoryLine 
      key={"lini2"} 
      data={lineData[line]}
      style={{
        data: { stroke: legendColors()[line] },
      }}>
    </VictoryLine>)
  }
  return ret
}
const legends = Object.keys(data)

return (
  <>
  <ChartContainer>
  <ChartHeader>
      <ChartTitle>{chartName}</ChartTitle>
      <CSVLink 
        data={getCSVData(data)}
        filename={chartName + " " + selectedCountries + ".csv"}
      >
        Download as CSV</CSVLink>
    </ChartHeader>
  <div>
    {selectedCountries.length !== 0 && <VictoryChart domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        style={{parent: { height: "550px" }}}
        theme={VictoryTheme.material}>
        <VictoryAxis 
          key={'lineAxis'} tickValues={xRange} />
          <VictoryAxis
            dependentAxis
            axisLabelComponent={<VictoryLabel dx={10} dy={-50}/>}
            key={2}
            offsetX={80}
            label={label}
          />
          <VictoryLegend
        x={90}
        y={5}
        orientation="horizontal"
        gutter={gutter}
        rowGutter={rowGutter}
        symbolSpacer={4}
        itemsPerRow={4}
        style={{
          title: { fontSize: 14, leftPadding: -10 },
        }}
        data={Array.from(legends).map((legend, i) => ({
            name: legend
              .concat('        ')
              .substr(0, 16),
            symbol: {fill: legendColors()[i]},
          }))}
        labelComponent={<VictoryLabel style={{ fontSize: '12px' }} />}
      />
          <VictoryGroup>
            {renderLines(data)}
          </VictoryGroup>
    </VictoryChart>}
    </div>
  </ChartContainer>
  </>
)
}
export default LineChartDoubleYAxisHistorical