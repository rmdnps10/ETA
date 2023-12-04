import React from "react";
import styled from "styled-components";

function SubwayItem() {
  return (
    <TransportItemWrapper>
      <TransportIndex>
        <TransportCircle>2</TransportCircle>
        <TransportLine />
        <TransportCircle />
      </TransportIndex>
      <TransportContent>
        <Start>
          <span>잠실역 2호선</span> <br />
          2호선 외선순환방면 <br />
          36분, 19개 역 이동
        </Start>
        <End>신촌역 2호선</End>
      </TransportContent>
      <TransportTime>오전 9:11</TransportTime>
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
  background: #3db449;
`;
const TransportCircle = styled.div`
  width: 24px;
  height: 24px;
  background: #3db449;
  display: flex;
  justify-content: center;
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
export default SubwayItem;
