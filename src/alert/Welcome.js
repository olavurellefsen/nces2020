import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Octicon from "react-octicon";
import { useTranslation } from "react-i18next";

const AlertContainer = styled.div`
  position: ${props => props.isOpen ? 'relative' : 'absolute'};
  right: ${props => props.isOpen ? null : '35px'};
  padding: 10px;
  margin-bottom: 30px;
  ${'' /* border-width: 1px;
  border-color: blue;
  border-style: solid; */}
  background-color: mintcream;
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
`;
AlertContainer.displayName = "AlertContainer";
const AlertBody = styled.div`
  font-size: 1em;
  margin: 0px;
  align-self: center;
  ${'' /* flex: 1; */}
`;
AlertBody.displayName = "AlertBody";
const AlertTitle = styled.div`
  font-size: 1.3em;
`;
const AlertBodyParagraph = styled.p``;
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
  }
`;
CloseWindowIcon.displayName = "CloseWindowIcon";

function Welcome(props) {
  const { t } = useTranslation();
  return (
    <AlertContainer  isOpen={props.isOpen}>
    {props.isOpen && <AlertTitle>{t("welcome-text." + props.tab + ".welcome-1")}</AlertTitle>}
      {props.isOpen && <AlertBody>
        <AlertBodyParagraph>{t("welcome-text." + props.tab + ".welcome-2")}</AlertBodyParagraph>
        <AlertBodyParagraph>{t("welcome-text." + props.tab + ".welcome-3")}</AlertBodyParagraph>
        <AlertBodyParagraph>{t("welcome-text." + props.tab + ".welcome-4")}</AlertBodyParagraph>
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
