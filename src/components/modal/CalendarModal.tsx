import React from "react";
import {
  Button,
  ButtonWrapper,
  Icon,
  Label,
  TransportModalBox,
  TransportModalContainer,
} from "./TransportModal";
import calendarIcon from "../../assets/images/calendar.svg";
import CalendarModalItem, {
  NullableCalendarModalItem,
} from "./CalendarModalItem";

export interface ModalProps {
  isDisplay: boolean;
  setIsDisplay: any;
}
export interface CalendarModalProps {
  isDisplay: boolean;
  setIsDisplay: any;
  calendarList: NullableCalendarModalItem[];
}
function CalendarModal({
  isDisplay,
  setIsDisplay,
  calendarList,
}: CalendarModalProps) {
  const checkHandler = () => {
    setIsDisplay(false);
  };

  return (
    <TransportModalBox>
      <TransportModalContainer
        style={{ display: `${isDisplay ? "flex" : "none"}` }}
      >
        <Icon src={calendarIcon} />
        <Label>달력 선택</Label>

        {calendarList.map((item: NullableCalendarModalItem) => (
          <CalendarModalItem key={item?.id} calendarItem={item} />
        ))}

        <ButtonWrapper>
          <Button onClick={checkHandler}>설정하기</Button>
        </ButtonWrapper>
      </TransportModalContainer>
    </TransportModalBox>
  );
}

export default CalendarModal;
