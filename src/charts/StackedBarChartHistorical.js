import React from 'react'
//import PropTypes from 'prop-types'
import styled from 'styled-components'
//import { useTranslation } from 'react-i18next'
import {
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryGroup,
  VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
} from 'victory'

import {createAccumulatedHistoricalData} from './Tools'
import {colors} from './chartColors'
//import periods from './../data/historicalyears'

const ChartTitle = styled.div`
  margin-left: 70px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
const StackedBarChartHistorical = ({
  chartName = "nces_eleproduction",
  stackedBar = [],
  YPercentage = false,
  Y2Percentage = false,
  divideValues = 1,
  label="PJ",
  label2="c",
  selectedCountries = [],
  combinedChart = false,
  maxY2 = 100,
}) => {
  const dataScenario1 = createAccumulatedHistoricalData(stackedBar, chartName, selectedCountries)
  

  const accumulatedData = dataScenario1[0]
  const totalYearValuesScenario1 = dataScenario1[1]
  const legends = dataScenario1[2]
  let gutter, rowGutter
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    gutter = 0
    rowGutter = 0
  } else {
    gutter = -40
    rowGutter = -5
  }

  let maxY = -Infinity
  Object.keys(totalYearValuesScenario1).forEach(year => {
    //if(chartName==="Cement fuel consumption (PJ)")
      //console.log("maxY: ", maxY)
      //console.log("totalYearValuesScenario1[year]: ", totalYearValuesScenario1[year])
    maxY = Math.round(Math.max(maxY, totalYearValuesScenario1[year]))
  })
  //maxY = 600000
  //console.log("maxY: ", maxY)
  return (
    <div>
    <ChartTitle>{chartName}</ChartTitle>
      <VictoryChart
        domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}
        // domain={{ y: yDomain }} //removed to fix issue with axis labels not being updated
      >
        {/* <ChartHeader x={90} y={24} text={chartName} /> */}
        <VictoryAxis key={0} tickValues={[1990, 1995, 2000, 2005, 2010, 2015]} tickFormat={[1990, 1995, 2000, 2005, 2010, 2015]} />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dx={120} />}
          key={2}
          offsetX={80}
          tickFormat={tick =>
            `${
              YPercentage === false
                ? ((tick * maxY) / divideValues).toFixed(0)
                : (tick * 100) / divideValues + '%'
            }`
          }
          tickValues={[0, 0.25, 0.5, 0.75]}
          label={label}
        />
        {combinedChart === true && (
          <VictoryAxis
            dependentAxis
            key={3}
            offsetX={330}
            label={label2}
            style={{
              axis: { stroke: 'gray' },
              axisLabel: { fill: 'gray', padding: -50 },
              ticks: { padding: -25 },
              tickLabels: { fill: 'gray', textAnchor: 'start' },
            }}
            tickFormat={tick =>
              `${
                Y2Percentage === false
                  ? tick * maxY2
                  : tick * maxY2 * 100 + '%'
              }`
            }
            tickValues={[0, 0.25, 0.5, 0.75, 1.0]}
          />
        )}
        <VictoryLegend
          x={90}
          y={5}
          orientation="horizontal"
          gutter={gutter}
          rowGutter={rowGutter}
          symbolSpacer={4}
          itemsPerRow={3}
          style={{
            title: { fontSize: 14, leftPadding: -10 },
          }}
          colorScale={colors}
          data={Array.from(legends).map((legend, i) => ({
              name: legend
                .concat('        ')
                .substr(0, 16),
              fill: colors[i],
            }))}
          labelComponent={<VictoryLabel style={{ fontSize: '9px' }} />}
        />
        <VictoryGroup offset={10} style={{ data: { width: 10 } }}>
          <VictoryStack>
            {Object.keys(accumulatedData).map((chartGroupName, i) => (
                <VictoryBar
                  key={chartGroupName}
                  data={accumulatedData[chartGroupName].map(
                    chartGroupValue => {
                      return({
                      ...chartGroupValue,
                      label:
                       chartGroupValue.year + ' - ' +
                        chartGroupName +
                        ': ' +
                        (YPercentage
                          ? (
                              (chartGroupValue.total * 100) /
                              divideValues
                            ).toFixed(0) + '%'
                          : (
                              chartGroupValue.total / divideValues
                            ).toFixed(0)),
                    })}
                  )}
                  x="year"
                  y={datum => datum['total'] / (maxY === 0 ? 100 : maxY)}
                  labelComponent={<VictoryTooltip />}
                  style={{
                    data: { fill: colors[i] },
                  }}
                />
              ))}
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </div>
  )
}

/* const ChartHeader = styled(VictoryLabel)`
  text-anchor: start;
  fill: #000000;
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
` */

export default StackedBarChartHistorical