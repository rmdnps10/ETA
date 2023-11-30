import React from "react";
import {
  Button,
  ButtonWrapper,
  Icon,
  Label,
  TransportModalBox,
  TransportModalContainer,
} from "./TransportModal";
import homeIcon from "../../assets/images/home.svg";
import { ModalProps } from "./CalendarModal";
function HomeModal({ isDisplay, setIsDisplay }: ModalProps) {
  const cancelHandler = () => {
    setIsDisplay(false);
  };
  const checkHandler = () => {
    setIsDisplay(false);
  };
  return (
    <TransportModalBox style={{ display: `${isDisplay ? "flex" : "none"}` }}>
      <TransportModalContainer>
        <Icon src={homeIcon} />
        <Label>집 주소 설정</Label>
        <ButtonWrapper>
          <Button onClick={checkHandler}>확인하기</Button>
          <Button onClick={cancelHandler}>취소하기</Button>
        </ButtonWrapper>
      </TransportModalContainer>
    </TransportModalBox>
  );
}

export default HomeModal;
