import React, { useState } from "react";
import styled from "styled-components";
import switchIcon from "../assets/images/switchIcon.svg";
import swtichFalseIcon from "../assets/images/switchIconFalse.svg";
import busIcon from "../assets/images/busIcon.svg";
import checkRoom from "../assets/images/checkRoom.svg";
import line from "../assets/images/line.svg";
import { useNavigate } from "react-router-dom";
interface PlanCardProps {
  color: string;
}
function PlanCard({ color }: PlanCardProps) {
  const navigate = useNavigate();
  const [isTurnOn, setIsTurnOn] = useState(false);
  const onClickItem = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (e.target.tagName == "IMG") {
      setIsTurnOn(!isTurnOn);
      return;
    }
    navigate("/detail");
  };
  return (
    <PlanCardWrapper onClick={onClickItem}>
      <ColorSection color={color} />
      <ContentContainer>
        <TitleSection>
          <Title>대학수학</Title>

          
          {isTurnOn ? (
            <ToggleButton src={switchIcon} />
          ) : (
            <ToggleButton
              src={swtichFalseIcon}
              style={{ paddingRight: "8px" }}
            />
          )}
        </TitleSection>
        <DestinateSection>
          <DestinateTime>
            오전 <span>10:30</span>
          </DestinateTime>
          <DestinatePlace>
            서강대학교 김대건관, 대한민국 서울특별시 마포구 신수동 1-6
          </DestinatePlace>
        </DestinateSection>

        <TimeSpendSection>
          <Transport>
            <RideTransport>
              <TransportImage src={busIcon} />
              <SpendTime>49분</SpendTime>
            </RideTransport>
            <Line src={line} />
            <RideTransport>
              <TransportImage src={checkRoom} />
              <SpendTime>39분</SpendTime>
            </RideTransport>
          </Transport>
          <TimeBefore>1시간 19분 전 (오전 9:11)</TimeBefore>
        </TimeSpendSection>
      </ContentContainer>
    </PlanCardWrapper>
  );
}

const PlanCardWrapper = styled.div`
  width: 48%;
  height: 308px;
  border-radius: 16px;
  background-color: #f9f2ff;
  box-shadow: 0px 0.5px 15px 0px rgba(0, 0, 0, 0.15);
`;
const ColorSection = styled.div`
  background-color: ${(props: any) => props.theme.colors[props.color]};
  border-radius: 16px 16px 0px 0px;
  height: 20px;
`;

const ContentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`;

const Title = styled.div`
  color: #32283e;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;
const ToggleButton = styled.img`
  margin-left: auto;
`;
const DestinatePlace = styled.div`
  font-size: 14px;
`;
const DestinateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const DestinateTime = styled.div`
  span {
    color: #32283e;
    font-size: 36px;
    font-weight: 700;
    line-height: 24px;
  }
  color: #32283e;
  font-family: SF Pro Display;
  font-size: 24px;
  font-weight: 700;
`;

const TimeSpendSection = styled.div`
  margin-top: 29px;
  display: flex;
`;
const Transport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const RideTransport = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;
const TransportImage = styled.img``;
const Line = styled.img`
  width: 1px;
  height: 24px;
  margin-left: 12px;
`;
const SpendTime = styled.div`
  color: #55505d;
  font-feature-settings: "clig" off, "liga" off;
  font-family: SF Pro Display;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;
const TimeBefore = styled.div`
  margin-left: auto;
  align-self: flex-end;
  color: #32283e;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
`;

export default PlanCard;
