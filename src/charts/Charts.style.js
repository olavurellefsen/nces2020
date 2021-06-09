import styled from "styled-components";
import {createBreakpoint} from 'styled-components-breakpoint';

export const breakpoint = createBreakpoint({
  xs: 0,
  sm: 550,
  md: 1394,
  lg: 1953,
  xl: 2512,
});

export const MainArea = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Flex = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: ${props => (props.direction === "column" ? "column" : "row")};
`;

export const Scenario1Description = styled.div`
  flex: 1;
  box-sizing: border-box;
  background-color: #385988;
  margin-right: 10px;
  padding: 15px 25px;
  color: white;
  border-radius: 4px;
  ${breakpoint('sm')`
    max-width: 225px;
  `}
  ${breakpoint('md')`
    max-width: 550px;
  `}
  ${breakpoint('lg')`
    max-width: 830px;
  `}
  ${breakpoint('xl')`
    max-width: 1110px;
  `}
`
export const Scenario2Description = styled.div`
  flex: 1;
  box-sizing: border-box;
  background-color: #bcbde2;
  padding: 15px 25px;
  color: white;
  border-radius: 4px;
`