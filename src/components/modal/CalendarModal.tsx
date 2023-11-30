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
import styled from "styled-components";

export interface ModalProps {
  isDisplay: boolean;
  setIsDisplay: any;
}
function CalendarModal({ isDisplay, setIsDisplay }: ModalProps) {
  const cancelHandler = () => {
    setIsDisplay(false);
  };
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

        <CalendarItem>
          <Circle />
          <CalendarName>21 UIUX</CalendarName>
          <CheckLabel htmlFor="check1">
            <InputCheck id="check1" type="checkbox" />
          </CheckLabel>
        </CalendarItem>
        <CalendarItem>
          <Circle />
          <CalendarName>21 UIUX</CalendarName>
          <CheckLabel htmlFor="check1">
            <InputCheck id="check1" type="checkbox" />
          </CheckLabel>
        </CalendarItem>
        <CalendarItem>
          <Circle />
          <CalendarName>21 UIUX</CalendarName>
          <CheckLabel htmlFor="check1">
            <InputCheck id="check1" type="checkbox" />
          </CheckLabel>
        </CalendarItem>
        <ButtonWrapper>
          <Button onClick={checkHandler}>확인하기</Button>
          <Button onClick={cancelHandler}>취소하기</Button>
        </ButtonWrapper>
      </TransportModalContainer>
    </TransportModalBox>
  );
}

const CalendarItem = styled.div`
  width: 80%;
  display: flex;
  gap: 16px;
  align-items: center;
`;
const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #137333;
`;

const CheckLabel = styled.label`
  margin-left: auto;
`;
const InputCheck = styled.input`
  appearance: none;
  position: relative;
  display: flex;
  width: 52px;
  height: 32px;
  padding: 2px 4px;
  align-items: center;
  border-radius: 100px;
  background-color: #00608a;

  &::before {
    content: "";
    position: absolute;
    left: 5px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: gray;
    transition: left 250ms linear;
  }
  &:checked {
    background-color: #00608a;
  }

  &:checked::before {
    content: "";
    position: absolute;
    left: 24px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: white;
  }
`;
const CalendarName = styled.div``;

export default CalendarModal;
