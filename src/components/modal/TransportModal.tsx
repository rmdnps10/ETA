import React, { useEffect, useState } from "react";
import styled from "styled-components";
import subwayIcon from "../../assets/images/subway.svg";
import radioCheckIcon from "../../assets/images/radiocheck.svg";
import { ModalProps } from "./CalendarModal";
import { useRecoilState } from "recoil";
import { fav_transportation } from "state/atom";
function TransportModal({ isDisplay, setIsDisplay }: ModalProps) {
  const cancelHandler = () => {
    setIsDisplay(false);
  };
  const checkHandler = () => {
    setTransport(copyTransport);
    localStorage.setItem("fav_transportation", copyTransport);
    setIsDisplay(false);
  };
  const [transport, setTransport] = useRecoilState(fav_transportation);
  const [copyTransport, setCopyTransport] = useState<string>("");
  const onChange = (e: React.ChangeEvent) => {
    setCopyTransport(e.target.defaultValue);
  };
  useEffect(() => {
    setTransport(localStorage.getItem("fav_transportation"));
  });
  return (
    <TransportModalBox style={{ display: `${isDisplay ? "block" : "none"}` }}>
      <TransportModalContainer>
        <Icon src={subwayIcon} />
        <Label>선호 대중교통</Label>
        <StyledLabel htmlFor="transport">
          <Input name="transport" value="도보" onChange={onChange} />
          도보
        </StyledLabel>
        <StyledLabel htmlFor="transport">
          <Input name="transport" value="지하철" onChange={onChange} />
          지하철
        </StyledLabel>
        <StyledLabel htmlFor="transport">
          <Input name="transport" value="버스" onChange={onChange} />
          버스
        </StyledLabel>

        <ButtonWrapper>
          <Button onClick={checkHandler}>확인하기</Button>
          <Button onClick={cancelHandler}>취소하기</Button>
        </ButtonWrapper>
      </TransportModalContainer>
    </TransportModalBox>
  );
}

export const TransportModalBox = styled.div`
  position: absolute;
  width: 100%;
`;

export const TransportModalContainer = styled.div`
  margin: 0 auto;
  align-items: center;
  width: 500px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  background: #deebf2;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
`;
export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Label = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StyledLabel = styled.label`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 86%;
  display: flex;
  align-items: center;
`;

const Input = styled.input.attrs({ type: "radio" })`
  margin-right: 10px;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 2px solid #49454f;
  &:checked {
    background: no-repeat center/130% url(${radioCheckIcon});
    border: none;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

export const Button = styled.div`
  color: #095d7f;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default TransportModal;
