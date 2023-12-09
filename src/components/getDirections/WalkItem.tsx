import React from "react";
import { CheckIcon, ItemLabel, ItemTime, ItemWrapper } from "./PrepareItem";
import walkIcon from "../../assets/images/walk.svg";
import styled from "styled-components";
import dayjs from "dayjs";
function WalkItem({ item, startTime, accumulateTime }) {
  return (
    <ItemWrapper>
      <CheckIcon src={walkIcon} />
      <WalkingContent>
        <WalingGuide>
            <span>{item?.start?.name}에서 {item?.end?.name}까지 도보로 이동</span>
        </WalingGuide>
        <WalkingTime>
          {Math.floor(item?.sectionTime / 60)}분, {item?.distance}m 이동
        </WalkingTime>
      </WalkingContent>
      <ItemTime>
        {dayjs(startTime).add(accumulateTime, "minute").format("a") === "pm"
          ? "오후 "
          : "오전 "}{" "}
        {dayjs(startTime).add(accumulateTime, "minute").format("h:mm")}
      </ItemTime>
    </ItemWrapper>
  );
}
const WalkingContent = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
`;
const WalingGuide = styled.span`
  color: #000;
  font-size: 16px;
  font-style: normal;,
  font-weight: 700;
  line-height: 28px; /* 175% */
  span {
    font-weight: 700;
  }
`;
const WalkingTime = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`;

export default WalkItem;
