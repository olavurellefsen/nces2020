import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Octicon from "react-octicon";
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
  padding-left: 15px;
  margin-bottom: 10px;
  margin-right: 15px;
  ${'' /* border-width: 1px;
  border-color: blue;
  border-style: solid; */}
  ${'' /* background-color: #eff0f9; */}
  background-color: #385988;
  color: white;
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
  z-index: 20;
`;
AlertContainer.displayName = "AlertContainer";
const AlertBody = styled.div`
  font-size: 1em;
  margin: 0px;
  align-self: center;
  max-width: 1090px;
  
`;
AlertBody.displayName = "AlertBody";
const AlertTitle = styled.div`
  font-size: 1.7em;
  font-weight: 600;
  ${'' /* color: #454547; */}
  color: white;
  max-width: 1090px
`;
const AlertBodyParagraph = styled.div`
  ${'' /* color: #6F7173; */}
  color: white;
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
    "welcome1": <div>Welcome to the Nordic Clean Energy Scenarios results viewer</div>,
	"welcome2": <p>On this webpage you can explore the full modelling results from the Nordic Clean Energy Scenarios project, funded by Nordic Energy Research.</p>,
	"welcome3": <p>This web tool allows you to compare the results from three different scenarios developed by the project, view the effects on the energy system when applying additional assumptions to the model, and delve deeper into the full downloadable data provided in the statistics database and model results. For further instructions on how to use the web tool and get the most out of the presented results please see, <a href="./about" style={{color: "white"}}>How to use the results viewer tool</a>. To learn more about the project and access the full report please see <a href="./how-to-use" style={{color: "white"}}>About Nordic Clean Energy Scenarios.</a></p>,
	"welcome4": <p>All NCES scenarios reach carbon neutrality by 2050, but technology choice, fuel consumption, and cost will adapt to the options available to change assumptions on the technological readiness of CCS technologies and limitations on bioenergy availability. </p>,
	"welcome5": <p>The results presented here are highly dependent on assumptions for technology developments and their potential availability, efficiency, and cost to just mention a few factors influencing future pathway developments. The many combinations of scenarios represented in this tool demonstrates the inherent uncertainty of using scenario modelling to predict the future Nordic energy system. What these results tell us is rather which solutions are competing, what synergies exists between low carbon energy technologies, and what factors their development is contingent on.</p>,
  },
  "tab2": {
    "welcome1": <div>Upstream Sectors</div>,
    "welcome2": <p>The upstream sector includes oil and gas production, fossil refineries, biorefineries and PtX plants.</p>,
    "welcome3": <p>The total biomass used in the Nordic countries is shown along with import of biomass and biofuels. Feedstock and produced fuel from both fossil-based refineries and renewable based refineries are also shown.</p>,
    "welcome4": <p>To see the difference the biomass sensitivity has upon a given scenario, choose the same scenario twice in the left column of the tool and then activate the bioenergy sensitivity by clocking the leaf icon on one of the scenarios. Now you will be able to compare the two versions of the same scenario to see the impact of restricted import of bioenergy and input to the RE-refineries.</p>,
  },
  "tab3": {
    "welcome1": <div>Power and District Heat Production</div>,
    "welcome2": <p>Here you can see the fuel use for power and district heat production, power plant capacities, and the electricity and district heating production divided on fuels.</p>,
    "welcome3": <p>The marginal electricity price and district heating price is the weighted average price of the time slices in the model over a year. These prices are endogenously calculated by the model, and it is the price which the model uses to “trade” power and heat between sectors.</p>,
    "welcome4": <p>A suggestion is to select the CNN and NPH scenario and compare electricity demand and the difference in needed power capacity.</p>,
  },
  "tab4": {
	  "welcome1": <div>Heavy Industry</div>,
	  "welcome2": <p>Here you can explore energy consumption and resulting CO<sub>2</sub>-emissions from heavy industry.</p>,
	  "welcome3": <p>In heavy industry the NCES scenarios include: Pulp and paper, Mining, Iron and steel, Aluminium, and Cement.</p>,
	  "welcome4": <p>A suggestion is to select the CNN and NPH scenario and you will see the assumed increase in activity in NPH – if you choose to compare with CNB instead you can see the impact of the assumed decrease in activity. You could also select CNN twice and activate the CCS sensitivity by clicking the barrel icon to see the effects of increased cost of CO<sub>2</sub> storage on CO<sub>2</sub> emissions.</p>,
  },
  "tab5": {
	  "welcome1": <div>Other Sectors</div>,
	  "welcome2": <p>Here you can investigate energy consumption and CO<sub>2</sub>-emissions from Other sectors.</p>,
	  "welcome3": <p>In Other sectors the NCES scenarios include: Manufacturing industries, Service sector, Agriculture, and Fishery.</p>,
	  "welcome4": <p>A suggestion is to select CNN twice and then activate the CCS sensitivity to see the effects of increased cost of CO<sub>2</sub> storage and compare CO<sub>2</sub> emissions and fuel use in agriculture and fishery.</p>,
  },
  "tab6": {
	  "welcome1": <div>Residential Sector</div>,
	  "welcome2": <p>Here you can investigate the potential development in heat demand, electricity demand, and fuel use for the residential sector.</p>,
	  "welcome3": <p>The results are split in room heat and electricity for appliances. The solutions for the residential sector are very robust. The variation in assumptions is therefore limited leading to all scenarios developing very similarly.</p>,
    "welcome4": <p>We therefore suggest comparing the different Nordic countries heating solutions rather than comparing different scenarios with each other. Select one country at the time on the map in the left column, the countries shown in dark blue are the ones shown in the graphs, to look through country level results.</p>,
  },
  "tab7": {
	  "welcome1": <div>Transport Sector </div>,
	  "welcome2": <p>Here you can explore the energy consumption, transport service level, and CO<sub>2</sub> emissions from passenger and freight transport.</p>,
	  "welcome3": <p>The model includes international shipping and aviation which also can be shown on country level. For cars and trucks the stock are shown divided on vehicle types.</p>,
	  "welcome4": <p>The transport sector assumptions are very robust, which leads to only minor differences between each scenario. However, the CNB scenario differs as demand for transport are not assumed to increase in the future. Therefore, try to select CNN and CNB to compare the impact of a break in the trend of increasing demand for passenger transport and freight transport volumes.</p>,
  },
  "tab8": {
	  "welcome1": <div>Key Performance Indicators</div>,
	  "welcome2": <p>Here we have highlighted indicators to illustrate how far along the Nordic energy system has come towards becoming carbon neutral as well as showing differences in the structure of the energy system across the Nordic countries.</p>,
	  "welcome3": <p>The indicators show development in renewable energy shares, electrification of end-use energy consumption, and energy intensity of industries.</p>,
	  "welcome4": <p>Try to select the same scenario twice and add the CCS sensitivity, to see the effects of increases price of CO2 storage, or add the biomass sensitivity, to see the effects of limited import of biomass, and see how it would influence the performance indicators.</p>,
  },
  "tabHistory": {
    "welcome1": <div>Welcome to Nordic Energy Statistics Database Visualisations</div>,
    "welcome2": <p>The database aims for harmonising energy sector and related data across all the five Nordic countries. It will serve as a reference for research work as well as for the general public to see energy related data and selected progress indicators. </p>,
    "welcome3": <p>The database will be published and maintained by Nordic Energy Research. Original sources of the data are mentioned in the metadata part for each data item. </p>,
    "welcome4": <p>Sources: Eurostat, IEA, national statistics</p>
  },
  "tabRawHistory": {
    "welcome1": <div>Welcome to Nordic Energy Statistics Database Raw Historical Data</div>
  }
}
function Welcome(props) {
  return (
    <AlertContainer  isOpen={props.isOpen}>
    {props.isOpen && <AlertTitle>{welcomeText[props.tab].welcome1}</AlertTitle>}
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
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab3" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab4" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome5}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab5" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab6" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab7" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome5}</AlertBodyParagraph>
      </AlertBody>}
      {props.isOpen && props.tab === "tab8" && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome5}</AlertBodyParagraph>
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
