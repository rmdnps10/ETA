import React from "react";
import { CheckIcon, ItemLabel, ItemTime, ItemWrapper } from "./PrepareItem";
import walkIcon from "../../assets/images/walk.svg";
import styled from "styled-components";
function WalkItem() {
  return (
    <ItemWrapper>
      <CheckIcon src={walkIcon} />
      <WalkingContent>
        <WalingGuide>6번 출구 이동 후 목적지까지 도보로 이동</WalingGuide>
        <WalkingTime>13분, 816m 이동</WalkingTime>
      </WalkingContent>
      <ItemTime>오전 10:17</ItemTime>
    </ItemWrapper>
  );
}
const WalkingContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const WalingGuide = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 175% */
`;
const WalkingTime = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`;

export default WalkItem;
