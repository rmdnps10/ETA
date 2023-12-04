import React from "react";
import styled from "styled-components";
import checkIcon from "../../assets/images/checkRoom.svg";
function PrepareItem({ time }) {
  return (
    <ItemWrapper>
      <CheckIcon src={checkIcon} />
      <ItemLabel>출발 준비하기</ItemLabel>
      <ItemTime>{time}</ItemTime>
    </ItemWrapper>
  );
}

export const ItemWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const CheckIcon = styled.img`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

export const ItemLabel = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;

export const ItemTime = styled.div`
  color: #32283e;
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-left: auto;
  line-height: 28px;
`;
export default PrepareItem;
