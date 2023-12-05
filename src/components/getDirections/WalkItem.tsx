import React from "react";
import { CheckIcon, ItemLabel, ItemTime, ItemWrapper } from "./PrepareItem";
import walkIcon from "../../assets/images/walk.svg";
import styled from "styled-components";
import dayjs from "dayjs";
function WalkItem({ item, startTime, accumulateTime }) {
  console.log(item);
  return (
    <ItemWrapper>
      <CheckIcon src={walkIcon} />
      <WalkingContent>
        <WalingGuide>
          {item?.start?.name}에서 {item?.end?.name}까지 도보로 이동
        </WalingGuide>
        <WalkingTime>
          {Math.floor(item?.sectionTime / 60)}분, {item?.distance}m 이동
        </WalkingTime>
      </WalkingContent>
      <ItemTime>
        {dayjs(startTime).add(accumulateTime, "minute").format("a") === "pm"
          ? "오후 "
          : "오전 "}{" "}
        {dayjs(startTime).add(accumulateTime, "minute").format("hh:mm")}
      </ItemTime>
    </ItemWrapper>
  );
}
const WalkingContent = styled.div`
  display: flex;
  width: 60%;
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
