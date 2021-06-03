import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Octicon from "react-octicon";
import { useTranslation } from "react-i18next";
import {createBreakpoint} from 'styled-components-breakpoint';

export const breakpoint = createBreakpoint({
  xs: 0,
  sm: 550,
  md: 1394,
  lg: 1953,
  xl: 2512,
});

const AlertContainer = styled.div`
  position: ${props => props.isOpen ? 'relative' : 'absolute'};
  right: ${props => props.isOpen ? null : '35px'};
  padding: 10px;
  margin-bottom: 10px;
  ${'' /* border-width: 1px;
  border-color: blue;
  border-style: solid; */}
  background-color: #eff0f9;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  flex-direction: column;
  min-height: 20px;
  width: ${props => props.isOpen ? null : '20px'};
  box-shadow: 0 0 0.5333333333rem rgb(26 26 26 / 12%);
  border-radius: .35em;
  ${breakpoint('sm')`
    max-width: 530px;
  `}
  ${breakpoint('md')`
    max-width: 1090px;
  `}
  ${breakpoint('lg')`
    max-width: 1650px;
  `}
  ${breakpoint('xl')`
    max-width: 2210px;
  `}
  z-index: 20;
`;
AlertContainer.displayName = "AlertContainer";
const AlertBody = styled.div`
  font-size: 1em;
  margin: 0px;
  align-self: center;
  ${'' /* flex: 1; */}
  max-width: 1090px;
`;
AlertBody.displayName = "AlertBody";
const AlertTitle = styled.div`
  font-size: 1.3em;
  color: #454547;
  max-width: 1090px;
`;
const AlertBodyParagraph = styled.p`
  color: #6F7173;
`;
AlertBodyParagraph.displayName = "AlertBodyParagraph";
const CloseWindowIcon = styled.div`
  position: absolute;
  right: ${props => props.isOpen ? '32px' : '10px'};
  top: ${props => props.isOpen ? '30px' : '12px'};
  margin: 0px;
  border: 0;
  flex-shrink: 0;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  :hover {
    cursor: pointer;
    transform: scale(1.15)
  }
`;
CloseWindowIcon.displayName = "CloseWindowIcon";
const welcomeText = {
  "tab1": {
    "welcome1": <p>Welcome to Nordic Clean Energy Scenarios 2020 (NCES2020) scenario viewer.</p>,
    "welcome2": <p>The project is funded by Nordic Energy Research and is carried out by a Nordic team of researchers and consultants – see about NCES2020.</p>,
    "welcome3": <p>On this webpage you can compare scenarios and change assumptions. All the scenarios reach carbon neutrality before 2050, but technology choice, fuel consumption and cost will change when changing assumptions about readiness of technologies and whether the countries can import biomass and biofuels.</p>,
    "welcome4": <p>You can look at results for all countries or for individual countries by clicking them on and off on the map to the left.</p>,
    "welcome5": <p>You can compare scenarios by clicking on the two scenarios you want to compare. The scenario with the red colour is always shown to the left in the figures and the blue coloured scenarios to the right. If you want to see the absolute difference between the scenarios - activate the “Scenario Difference” slider and the blue scenarios will be subtracted from the red.</p>,
    "welcome6": <p>The model used for calculating the scenarios is called Open Nordic TIMES model (ON-TIMES) and is developed during the project.</p>,
    "welcome7": <p>As with all modelling results - be critical to what you see, do not just accept it. The many combinations of scenarios represented in this viewer indicate the uncertainty of how the future Nordic energy system will develop, but also illustrate which solutions compete and which have synergies. The modelling results are highly dependent on projections of technologies, their availability, efficiency and cost, by future fuel prices and access to resources.</p>,
    "welcome8": <p>On this first result page we show some main results like primary energy consumption, final energy consumption and total CO<sub>2</sub>-emissions.</p>,
    "welcome9": <p>Try to select the CNN scenario twice and then increase cost of storing CO<sub>2</sub> in one of the scenarios by activating the “barrel”. Try and see how effects the amount of stored CO<sub>2</sub>.</p>
  },
  "tab2": {
    "welcome1": <p>The upstream sector includes oil and gas production, fossil refineries, biorefineries and PtX plants.</p>,
    "welcome2": <p>The total used biomass in the Nordic countries is tracked and also import of biomass and biofuels. Feedstock and produced fuel from both fossil based refineries and renewable based refineries are also shown.</p>,
    "welcome3": <p>Try to choose the same scenario twice and then activate the bioenergy constraint, the “leaf”, on one of the scenarios – then you can see a big difference in imported bioenergy and input to the RE-refineries.</p>
  },
  "tab3": {
    "welcome1": <p>Power and district heat production.</p>,
    "welcome2": <p>Here you can see the fuel use for power and district heat production, power plant capacities and the electricity and district heating production divided on fuels.</p>,
    "welcome3": <p>The marginal electricity price and district heating price is the weighted average price of the time slices in the model over a year. These prices are endogenous calculated by the model and it is the prices which the model “trade” power and heat between sectors.</p>,
    "welcome4": <p>Try to select the CNN scenario and the NPH scenario and compare electricitydemand and the difference in needed power capacity.</p>
  },
  "tabHistory": {
    "welcome1": <p>Welcome to Nordic Energy Statistics Database visualisations.</p>,
    "welcome2": <p>The database aims for harmonising energy sector and related data across all the five Nordic countries. It will serve as a reference for research work as well as for the general public to see energy related data and selected progress indicators. </p>,
    "welcome3": <p>The database will be published and maintained by Nordic Energy Research. Original sources of the data are mentioned in the metadata part for each data item. </p>,
    "welcome4": <p>Sources: Eurostat, IEA, national statistics</p>
  },
  "tabRawHistory": {
    "welcome1": <p>Welcome to Nordic Energy Statistics Database Raw Historical Data</p>
  }
}
function Welcome(props) {
  const { t } = useTranslation();
  return (
    <AlertContainer  isOpen={props.isOpen}>
    {props.isOpen && <AlertTitle><p>{welcomeText[props.tab].welcome1}</p></AlertTitle>}
      {props.isOpen && props.tab === "tab1" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome5}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome6}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome7}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome8}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome9}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab2" && <AlertBody>
        <AlertBodyParagraph>{t("welcome-text." + props.tab + ".welcome-2")}</AlertBodyParagraph>
        <AlertBodyParagraph>{t("welcome-text." + props.tab + ".welcome-3")}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab3" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab-history" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab-raw-history" && <AlertBody>
      </AlertBody>}
      <CloseWindowIcon
        onClick={() => props.closeWelcome(!props.isOpen)}
      >
        {props.isOpen ? <Octicon name="x" /> : <Octicon name="chevron-left" />}
      </CloseWindowIcon>
    </AlertContainer>
  )
}
Welcome.defaultProps = {
  tab: "tab1"
}

Welcome.propTypes = {
  closeWelcome: PropTypes.func.isRequired,
  tab: PropTypes.string,
};

export default Welcome;
