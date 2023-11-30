import React from "react";
import mainIcon from "../assets/images/ETAIcon.svg";
import backArrowIcon from "../assets/images/backArrow.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SettingHeader() {
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/main");
  };
  return (
    <SettingHeaderWrapper>
      <BackArrowIcon src={backArrowIcon} onClick={goMain} />
      <H1>설정</H1>
      <MainIcon src={mainIcon} />
    </SettingHeaderWrapper>
  );
}

const SettingHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 80px;
`;
const BackArrowIcon = styled.img`
  cursor: pointer;
`;
const H1 = styled.h1`
  color: #32283e;
  font-feature-settings: "clig" off, "liga" off;
  font-family: SF Pro Display;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 66.667% */
`;
const MainIcon = styled.img`
  margin-left: auto;
`;
export default SettingHeader;
