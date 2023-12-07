import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
function BusItem({ item, startTime, accumulateTime }) {
  return (
    <TransportItemWrapper>
      <TransportIndex>
        <TransportCircle color={item?.routeColor}>
          {item?.route.match(/\d+/g)}
        </TransportCircle>
        <TransportLine color={item?.routeColor} />
        <TransportCircle color={item?.routeColor} />
      </TransportIndex>
      <TransportContent>
        <Start>
          <span>{item?.start?.name}</span> <br />
          {Math.floor(item?.sectionTime / 60)}분,{" "}
          {item?.passStopList?.stationList?.length}개 역 이동
        </Start>
        <End>{item?.end?.name}</End>
      </TransportContent>
      <TransportTime>
        {" "}
        {dayjs(startTime).add(accumulateTime, "minute").format("a") === "pm"
          ? "오후 "
          : "오전 "}{" "}
        {dayjs(startTime).add(accumulateTime, "minute").format("h:mm")}
      </TransportTime>
    </TransportItemWrapper>
  );
}
const TransportItemWrapper = styled.div`
  display: flex;
  width: 90%;
  gap: 20px;
`;

const TransportIndex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TransportLine = styled.div`
  height: 105px;
  width: 2px;
  background: ${(props) => "#" + props?.color};
`;
const TransportCircle = styled.div`
  width: 24px;
  height: 24px;
  background: ${(props) => "#" + props?.color};
  display: flex;
  justify-content: center;
  font-size: 10px;
  align-items: center;
  border-radius: 100%;
  color: #fff;
`;
const TransportContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const Start = styled.div`
  color: #000;
  flex-grow: 1;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 175% */
  span {
    font-weight: 700;
  }
`;

const End = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 28px; /* 175% */
  font-style: normal;
  font-weight: 700;
`;

const TransportTime = styled.div`
  margin-top: 5px;
  font-weight: 700;
  font-size: 16px;
  margin-left: auto;
`;

export default BusItem;
