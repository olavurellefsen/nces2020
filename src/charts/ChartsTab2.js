import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {createBreakpoint} from 'styled-components-breakpoint';
import Welcome from '../alert/Welcome'
import StackedBarChart from './StackedBarChart'
import StackedBarDiffChart from './StackedBarDiffChart'
import LineChart from './LineChart'
import { MainArea, Flex } from './Charts.style'
import stackedBar from '../data/stackedBarTab2'
//import line from '../data/line'
import indicators from '../data/indicatorsTab2'
import scenarioCombinations from "../data/scenarioCombinations"


const Charts = props => {
  const selectedScenario = props.scenarioSelection.scenarioSelection
  const selectedScenario2 = props.scenarioSelection.scenarioSelection2
  const selectedCountries = props.selectedCountries

  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome}  />
        <ScenarioDescriptionsContainer isWelcomeOpen={props.scenarioSelection.showWelcome}>
          <Scenario1Description>
            {scenarioCombinations.scenarioCombinations.scenarioOptions.find(
              (option)=>option.name === selectedScenario)?.desc
            }
          </Scenario1Description>
          {selectedScenario2 && <Scenario2Description>{
            scenarioCombinations.scenarioCombinations.scenarioOptions.find(
              (option)=>option.name === selectedScenario2
            )?.desc
          }</Scenario2Description>}
        </ScenarioDescriptionsContainer> 
      {(props.scenarioSelection.showDifference === false ||
        (props.scenarioSelection.showDifference === true &&
          selectedScenario2 === '')) && (
        <Flex>
          {
            indicators.map((i, index) => 
            {
              if (false) 
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
  background-color: #ef403b;
  max-width: 45%;
  margin-right: 10px;
  padding: 15px 25px;
  color: white;
  border-radius: 4px;
`
const Scenario2Description = styled.div`
  flex: 1;
  background-color: #385988;
  padding: 15px 25px;
  color: white;
  border-radius: 4px;
`


export default Charts
