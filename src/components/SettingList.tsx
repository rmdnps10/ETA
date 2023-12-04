import React, {useEffect, useState} from "react";
import styled from "styled-components";
import homeIcon from "../assets/images/home.svg";
import subwayIcon from "../assets/images/subway.svg";
import checkRoomIcon from "../assets/images/checkRoom.svg";
import calendarIcon from "../assets/images/calendar.svg";
import TransportModal from "./modal/TransportModal";
import CheckModal from "./modal/CheckModal";
import CalendarModal from "./modal/CalendarModal";
import HomeModal from "./modal/HomeModal";
import {NullableCalendarModalItem} from "./modal/CalendarModalItem";
import {useRecoilValue} from "recoil";
import {fav_transportation, ready_time, home_address, home_address_lat, home_address_lng} from "state/atom";

interface SettingListProps {
    calendarList: NullableCalendarModalItem[];
}

const SettingList = ({calendarList}: SettingListProps) => {
    const [showHome, setShowHome] = useState(false);
    const [showTransport, setShowTransport] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const handleItemClick = (modalSetter: (value: boolean) => void) => {
        modalSetter(true);
    };
    const homeAddress = useRecoilValue(home_address);
    const preferTransport = useRecoilValue(fav_transportation);
    const prepareTime = useRecoilValue(ready_time);

    console.log(homeAddress, useRecoilValue(home_address_lat), useRecoilValue(home_address_lng), preferTransport, prepareTime);

    return (
        <SettingListWrapper>
            <SettingItem onClick={() => handleItemClick(setShowHome)}>
                <Icon src={homeIcon}/>
                <SettingDescription>
                    <SettingName>집 주소</SettingName>
                    <SettingSelection>{homeAddress}</SettingSelection>
                </SettingDescription>
            </SettingItem>
            <SettingItem onClick={() => handleItemClick(setShowCheck)}>
                <Icon src={checkRoomIcon}/>
                <SettingDescription>
                    <SettingName>외출 준비 시간</SettingName>
                    <SettingSelection>{prepareTime}분</SettingSelection>
                </SettingDescription>
            </SettingItem>
            <SettingItem
                onClick={() => {
                    handleItemClick(setShowCalendar);
                }}
            >
                <Icon src={calendarIcon}/>
                <SettingDescription>
                    <SettingName>캘린더 알람 달력 출처</SettingName>
                    <SettingSelection>달력 선택..</SettingSelection>
                </SettingDescription>
            </SettingItem>
            <HomeModal isDisplay={showHome} setIsDisplay={setShowHome}/>
            <CheckModal isDisplay={showCheck} setIsDisplay={setShowCheck}/>
            <CalendarModal
                isDisplay={showCalendar}
                setIsDisplay={setShowCalendar}
                calendarList={calendarList}
            />
        </SettingListWrapper>
    );
};

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
  cursor: pointer;
`;

export default SettingList;
