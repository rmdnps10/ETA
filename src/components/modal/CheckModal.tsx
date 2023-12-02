import React, { useEffect, useState } from "react";
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
import { useRecoilState } from "recoil";
import { ready_time } from "state/atom";
function CheckModal({ isDisplay, setIsDisplay }: ModalProps) {
  const checkHandler = () => {
    setPrepareTime(text);
    localStorage.setItem("ready_time", text);
    setIsDisplay(false);
  };
  const cancelHandler = () => {
    setIsDisplay(false);
  };
  const [text, setText] = useState<string>("");
  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const [prepareTime, setPrepareTime] = useRecoilState(ready_time);
  useEffect(() => {
    setPrepareTime(JSON.parse(localStorage.getItem("ready_time")));
    setText(JSON.parse(localStorage.getItem("ready_time")));
  }, []);
  return (
    <TransportModalBox style={{ display: `${isDisplay ? "block" : "none"}` }}>
      <TransportModalContainer>
        <Icon src={checkIcon} />
        <Label>외출 준비 시간 설정</Label>
        <InputContainer>
          <FirstInput value={text} onChange={onTextChange} />
          <DivideIndex>분</DivideIndex>
        </InputContainer>
        <ButtonWrapper>
          <Button onClick={checkHandler}>확인</Button>
          <Button onClick={cancelHandler}>취소</Button>
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

export default CheckModal;
