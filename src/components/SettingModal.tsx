import React from "react";
import styled from "styled-components";
import settingIcon from "../assets/images/settings.svg";
import logoutIcon from "../assets/images/logout.svg";
import { useNavigate } from "react-router-dom";
interface SettingModalProps {
  isDisplay: boolean;
}
function SettingModal({ isDisplay }: SettingModalProps) {
  const navigate = useNavigate();
  const goSettings = () => {
    navigate("/settings");
  };
  return (
    <SettingModalBox style={{ display: `${isDisplay ? "block" : "none"}` }}>
      <ModalItem onClick={goSettings}>
        <Icon src={settingIcon} />
        <Label>설정</Label>
      </ModalItem>
      <ModalItem>
        <Icon src={logoutIcon} />
        <Label>로그아웃</Label>
      </ModalItem>
    </SettingModalBox>
  );
}

const SettingModalBox = styled.div`
  width: 122px;
  height: 114px;
  position: absolute;
  top: 70px;
  right: 0px;
  background-color: #f7e4ff;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: #f7e4ff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
`;
const ModalItem = styled.div`
  align-self: flex-end;
  padding: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
`;

const Icon = styled.img``;

const Label = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export default SettingModal;
