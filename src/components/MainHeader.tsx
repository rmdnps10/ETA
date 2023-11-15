import React from "react";
import styled from "styled-components";
import mainIcon from "../assets/images/ETAIcon.svg";
function MainHeader() {
  return (
    <StyledHeader>
      <CurrentDate>November 14, 2023</CurrentDate>
      <MainIcon src={mainIcon} />
    </StyledHeader>
  );
}

const StyledHeader = styled.nav`
  display: flex;
  height: 80px;
  align-items: center;
  width: 100%;
`;
const CurrentDate = styled.div`
  color: #32283e;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 66.667% */
`;
const MainIcon = styled.img`
  margin-left: auto;
`;
export default MainHeader;
