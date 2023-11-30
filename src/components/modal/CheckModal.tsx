import React from "react";
import {
  Button,
  ButtonWrapper,
  Icon,
  Label,
  TransportModalBox,
  TransportModalContainer,
} from "./TransportModal";
import checkIcon from "../../assets/images/checkRoom.svg";
import styled from "styled-components";
import { ModalProps } from "./CalendarModal";
function CheckModal({ isDisplay, setIsDisplay } : ModalProps) {
  const checkHandler = () => {
    setIsDisplay(false);
  };
  const cancelHandler = () => {
    setIsDisplay(false);
  };
  return (
    <TransportModalBox style={{ display: `${isDisplay ? "block" : "none"}` }}>
      <TransportModalContainer>
        <Icon src={checkIcon} />
        <Label>외출 준비 시간 설정</Label>
        <InputContainer>
          <FirstInput />
          <DivideIndex>분</DivideIndex>
        </InputContainer>
        <ButtonWrapper>
          <Button onClick={checkHandler}>확인하기</Button>
          <Button onClick={cancelHandler}>취소하기</Button>
        </ButtonWrapper>
      </TransportModalContainer>
    </TransportModalBox>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FirstInput = styled.input.attrs({ type: "text", maxLength: 2 })`
  border-radius: 8px;
  background: #d3e4ee;
  display: flex;
  width: 96px;
  height: 80px;
  flex-direction: column;
  justify-content: center;
  color: #001c2a;
  text-align: center;
  font-size: 57px;
  font-style: normal;
  font-weight: 400;
  line-height: 64px; /* 112.281% */
`;

const DivideIndex = styled.div`
  font-size: 50px;
`;

const SecondInput = styled(FirstInput)``;

export default CheckModal;
