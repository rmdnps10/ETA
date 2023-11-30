import React from "react";
import styled from "styled-components";
import homeIcon from "../assets/images/home.svg";
import subwayIcon from "../assets/images/subway.svg";
import checkRoomIcon from "../assets/images/checkRoom.svg";
import calendarIcon from "../assets/images/calendar.svg";
function SettingList() {
  return (
    <SettingListWrapper>
      <SettingItem>
        <Icon src={homeIcon} />
        <SettingDescription>
          <SettingName>집 주소</SettingName>
          <SettingSelection>
            서울특별시 마포구 신수동 1-1 서강대학교 하비에르관
          </SettingSelection>
        </SettingDescription>
      </SettingItem>
      <SettingItem>
        <Icon src={subwayIcon} />
        <SettingDescription>
          <SettingName>선호 대중교통</SettingName>
          <SettingSelection>지하철</SettingSelection>
        </SettingDescription>
      </SettingItem>{" "}
      <SettingItem>
        <Icon src={checkRoomIcon} />
        <SettingDescription>
          <SettingName>외출 준비 시간</SettingName>
          <SettingSelection>50분</SettingSelection>
        </SettingDescription>
      </SettingItem>{" "}
      <SettingItem>
        <Icon src={calendarIcon} />
        <SettingDescription>
          <SettingName>캘린더 알람 달력 출처</SettingName>
          <SettingSelection>달력 선택..</SettingSelection>
        </SettingDescription>
      </SettingItem>
    </SettingListWrapper>
  );
}

const SettingListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.img``;

const SettingDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SettingName = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SettingSelection = styled.div`
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SettingItem = styled.div`
  padding: 24px;
  display: flex;
  gap: 24px;
`;

export default SettingList;
