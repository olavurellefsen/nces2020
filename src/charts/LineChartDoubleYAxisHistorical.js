import React from 'react'
import styled from 'styled-components'
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"
import { colors } from "./chartColors"
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
  let ret = colors.slice(0, 3)
  Object.keys(data).forEach((key, i) => {
    ret[key] = colors[i] 
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
  <ChartTitle>{chartName}</ChartTitle>
  <div>
    <VictoryChart domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
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
    </VictoryChart>
    </div>
  </ChartContainer>
  </>
)
}
export default LineChartDoubleYAxisHistorical