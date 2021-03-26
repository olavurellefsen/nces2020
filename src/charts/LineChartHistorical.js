import React from 'react'
import styled from 'styled-components'
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"
import { colors } from "./chartColors"
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
  width: 550px;
`

const LineChartHistorical = ({
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

  let maxY = -Infinity
  let minY = Infinity
  let base = 0
  
  /* Object.keys(totalYearValuesScenario1).forEach(year => {
    maxY = Math.round(Math.max(maxY, totalYearValuesScenario1[year]))
  })

  let t = 1
  let i = 0
  let range = [2,4,6,8,10]
  while(t < maxY) {
    t = range[i%5]*Math.pow(range[4], Math.floor(i/5))
    i++
  }
  maxY = t
  let u=1
  let j=0
  while(u > minY && j < 20) {
    u = -range[j%5]*Math.pow(range[4], Math.floor(j/5))
    j++
  }
  minY = u

  //base is used in tickFormat
  if (maxY < -minY) 
    base = -minY
  else 
    base = maxY
 */
let selectedDataRegions = [] 
mapRegionToDataRegions.forEach((mapRegion) => {
  if(selectedCountries.includes(mapRegion.path_id)) {
  mapRegion.historical_data_regions.forEach((dataRegion) => {
    selectedDataRegions.push(dataRegion)
  })
}
})
const fixedcolorCountries = [ 'Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland']
const countryColors = () => {
  let ret = colors.slice(0, 4)
  fixedcolorCountries.forEach((country, index)=>{
    ret[country] = colors[index]
  })
  return ret
}
console.log("data: ", data)
const renderLines = (lineData) => {
  let ret = []
  for (let line in lineData) {
    console.log("sdgfsfs: ", lineData[line])
    ret.push(<VictoryLine 
      key={"lini2"} 
      data={lineData[line]}
      style={{
        data: { stroke: countryColors(selectedDataRegions)[line] },
      }}>
    </VictoryLine>)
  }
  console.log("ret: ", ret)
  return ret
}

return (
  <ChartContainer>
  <ChartTitle>{chartName}</ChartTitle>
    <VictoryChart domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}>
        <VictoryAxis 
          key={'lineAxis'} tickValues={[2013, 2014, 2015, 2016, 2017, 2018, 2019]} />
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
            {renderLines(data)}
          </VictoryGroup>
    </VictoryChart>
  </ChartContainer>
)
}
export default LineChartHistorical