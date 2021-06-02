import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {createBreakpoint} from 'styled-components-breakpoint';
import Welcome from '../alert/Welcome'
import StackedBarChart from './StackedBarChart'
import StackedBarDiffChart from './StackedBarDiffChart'
import { MainArea, Flex } from './Charts.style'
import stackedBar from '../data/stackedBarTab1'
import LineChart from './LineChart'
//import line from '../data/line'
import indicators from '../data/indicatorsTab1'
import scenarioCombinations from "../data/scenarioCombinations"

const Charts = props => {
  const selectedScenario = props.scenarioSelection.scenarioSelection
  const selectedScenario2 = props.scenarioSelection.scenarioSelection2
  const selectedCountries = props.selectedCountries
  
  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome} 
          tab="tab1"
        />
        <ScenarioDescriptionsContainer isWelcomeOpen={props.scenarioSelection.showWelcome}>
          <Scenario1Description>
            {selectedScenario2 && <div>LEFT COLUMN OR FULL LINE IN CHART</div>}
            {scenarioCombinations.scenarioCombinations.scenarioOptions.find(
              (option)=>option.name.toLowerCase() === selectedScenario.toLowerCase())?.desc.toUpperCase()
            }
          </Scenario1Description>
          {selectedScenario2 && <Scenario2Description>
            <div>RIGHT COLUMN OR DASHED LINE IN CHART</div> 
          {
            scenarioCombinations.scenarioCombinations.scenarioOptions.find(
              (option)=>option.name.toLowerCase() === selectedScenario2.toLowerCase()
            )?.desc.toUpperCase()
          }</Scenario2Description>}
        </ScenarioDescriptionsContainer> 
      {(props.scenarioSelection.showDifference === false ||
        (props.scenarioSelection.showDifference === true &&
          selectedScenario2 === '')) && (
        <Flex>
          {
           
            indicators.map((i, index) => 
            {
              if (i === "Marginal prices - CO2" ) 
                return(<LineChart 
                  key={i+' '+index}
                  chartName={i}
                  chartTitle={i}
                  selectedScenario={selectedScenario}
                  selectedScenario2={selectedScenario2}
                  selectedCountries={selectedCountries}
                  label=" "
                  minY={0}
                  maxY={15}
                  lineData={stackedBar}
                />)
              else
              return (
                <StackedBarChart
                  key={i+' '+index}
                  chartName={i}
                  chartTitle={i}
                  selectedScenario={selectedScenario}
                  selectedScenario2={selectedScenario2}
                  selectedCountries={selectedCountries}
                  combinedChart={false}
                  label=" "
                  minY={0}
                  maxY={1500}
                  stackedBar={stackedBar}
                  //line={line}
                />)}
            )
          }
        </Flex>
      )}
      {props.scenarioSelection.showDifference === true &&
        selectedScenario2 !== '' && (
        <Flex>
          {
            indicators.map(i => 
              <StackedBarDiffChart
                chartName={i}
                chartTitle={i}
                selectedScenario={selectedScenario}
                selectedScenario2={selectedScenario2}
                selectedCountries={selectedCountries}
                combinedChart={false}
                label=" "
                minY={-1}
                maxY={1}
                stackedBar={stackedBar}
                //line={line}
              />
            )
          }
          </Flex>
        )}
    </MainArea>
  )
}

Charts.propTypes = {
  scenarioSelection: PropTypes.object.isRequired,
  closeWelcome: PropTypes.func.isRequired,
  selectedCountries: PropTypes.array.isRequired,
}

export const breakpoint = createBreakpoint({
  xs: 0,
  sm: 550,
  md: 1394,
  lg: 1953,
  xl: 2512,
});

const ScenarioDescriptionsContainer = styled(Flex)`
  flex: 1;
  justify-content: space-between;
  margin-bottom: 10px;
  ${'' /* max-width: ${props => props.isWelcomeOpen ? "100%" : "90%"}; */}
  ${breakpoint('sm')`
    max-width: 550px;
  `}
  ${breakpoint('md')`
    max-width: 1110px;
  `}
  ${breakpoint('lg')`
    max-width: 1670px;
  `}
  ${breakpoint('xl')`
    max-width: 2230px;
  `}
`
const Scenario1Description = styled.div`
  flex: 1;
  background-color: #385988;
  max-width: 45%;
  margin-right: 10px;
  padding: 15px 25px;
  color: white;
  border-radius: 4px;
`
const Scenario2Description = styled.div`
  flex: 1;
  background-color: #bcbde2;
  padding: 15px 25px;
  color: white;
  border-radius: 4px;
`

export default Charts
