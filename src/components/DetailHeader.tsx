import React from "react";
import styled from "styled-components";
import backArrowIcon from "../assets/images/backArrow.svg";
import mainIcon from "../assets/images/ETAIcon.svg";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
function DetailHeader({ summary }) {
  const navigate = useNavigate();
  return (
    <DetailHeaderWrapper>
      <BackArrowIcon
        src={backArrowIcon}
        onClick={() => {
          navigate("/");
        }}
      />
      <PlanInform>
        <Plan>{dayjs().format("MMMM DD, YYYY")}</Plan>
        <Title>{summary ? summary : ""}</Title>
      </PlanInform>
      <MainIcon src={mainIcon} />
    </DetailHeaderWrapper>
  );
}

const DetailHeaderWrapper = styled.div`
  display: flex;
  gap: 32px;
  height: 80px;
  align-items: center;
  width: 100%;
`;

const BackArrowIcon = styled.img`
  cursor: pointer;
`;

const PlanInform = styled.div`
  display: flex;
  flex-direction: column;
`;

const Plan = styled.div`
  font-feature-settings: "clig" off, "liga" off;
  font-family: SF Pro Display;
  font-size: 16px;
  font-weight: 400;
`;
const Title = styled.div`
  font-family: SF Pro Display;
  font-size: 24px;
  font-weight: 700;
`;

const MainIcon = styled.img`
  margin-left: auto;
`;

export default DetailHeader;
