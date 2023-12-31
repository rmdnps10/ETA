import React, {useState} from "react";
import styled from "styled-components";
import busIcon from "../assets/images/busIcon.svg";
import checkRoom from "../assets/images/checkRoom.svg";
import line from "../assets/images/line.svg";
import dayjs from "dayjs";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {InputCheck} from "./modal/CalendarModalItem";

interface PlanCardProps {
    color: string;
}

function PlanCard({item}: PlanCardProps) {
    const navigate = useNavigate();
    const [isTurnOn, setIsTurnOn] = useState(item.is_enabled);
    const toggleIsEnabled = async () => {
        await axios
            .post(`//${process.env.REACT_APP_DB_URL}/update`, {
                event_id: item?.event_id,
                calendar_id: item?.calendar_id,
                is_enabled: !isTurnOn,
                address: item?.address,
                lat: item?.lat,
                lng: item?.lng,
                routes: item?.routes,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const onClickItem = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (e.target.tagName === "INPUT") {
            setIsTurnOn(!isTurnOn);
            toggleIsEnabled();
            return;
        }
        navigate(
            `/detail?calendar_id=${item.calendar_id}&event_id=${item.event_id}`
        );
    };
    const timeToString = (minute: number) => {
        let arr = [];
        if (minute / 60 >= 1) arr.push(Math.floor(minute / 60) + "시간");
        if (minute % 60 !== 0) arr.push(minute % 60 + "분");
        return arr.join(" ");
    };
    const parsedData = JSON.parse(item.routes).metaData.plan.itineraries;
    // 대중교통시간 (분)

    const transportTime = Math.floor(parsedData[0].totalTime / 60);
    // 준비시간 (분)
    const preparedTime = Number(localStorage.getItem("ready_time"));
    // 대중교통시간 + 준비시간 (분))
    const totalTime = transportTime + preparedTime;

    return (
        <PlanCardWrapper onClick={onClickItem}>
            <ColorSection color={item.color}/>
            <ContentContainer>
                <TitleSection>
                    <Title>{item?.title}</Title>
                    <InputCustomCheck type="checkbox" checked={isTurnOn}/>
                </TitleSection>
                <DestinateSection>
                    <DestinateTime>
                        {`${dayjs(item?.startDate).format("a") === "am" ? "오전" : "오후"}`}
                        <span>{" " + dayjs(item?.startDate).format("h:mm")}</span>
                    </DestinateTime>
                    <DestinatePlace>{item.eventLocation}</DestinatePlace>
                </DestinateSection>

                <TimeSpendSection>
                    <Transport>
                        <RideTransport>
                            <TransportImage src={busIcon}/>
                            <SpendTime>{timeToString(transportTime)}</SpendTime>
                        </RideTransport>
                        <Line src={line}/>
                        <RideTransport>
                            <TransportImage src={checkRoom}/>
                            <SpendTime>{timeToString(preparedTime)}</SpendTime>
                        </RideTransport>
                    </Transport>
                    <TimeBefore>
                        {timeToString(totalTime)} 전 (
                        {dayjs(item?.startDate)
                            .subtract(totalTime, "minute")
                            .format("a") === "am"
                            ? "오전 "
                            : "오후 "}
                        {dayjs(item?.startDate)
                            .subtract(totalTime, "minute")
                            .format("h:mm")}
                        )
                    </TimeBefore>
                </TimeSpendSection>
            </ContentContainer>
        </PlanCardWrapper>
    );
}

export const PlanCardWrapper = styled.div`
  width: 48%;
  height: 308px;
  border-radius: 16px;
  background-color: #f9f2ff;
  box-shadow: 0px 0.5px 15px 0px rgba(0, 0, 0, 0.15);
`;
export const ColorSection = styled.div`
  background-color: ${(props: any) => props.color};
  border-radius: 16px 16px 0px 0px;
  height: 20px;
`;

export const ContentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`;

const InputCustomCheck = styled(InputCheck)`
  margin-left: auto;

  &:checked {
    background-color: #9147af;
  }
`;

const Title = styled.div`
  color: #32283e;
  font-size: 24px;
  width: 80%;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;
const ToggleButton = styled.img`
  margin-left: auto;
`;
const DestinatePlace = styled.div`
  font-size: 14px;
`;
const DestinateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const DestinateTime = styled.div`
  span {
    color: #32283e;
    font-size: 36px;
    font-weight: 700;
    line-height: 24px;
  }

  color: #32283e;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
`;

const TimeSpendSection = styled.div`
  margin-top: 29px;
  display: flex;
`;
const Transport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const RideTransport = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;
const TransportImage = styled.img``;
const Line = styled.img`
  width: 1px;
  height: 24px;
  margin-left: 12px;
`;
const SpendTime = styled.div`
  color: #55505d;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;
const TimeBefore = styled.div`
  margin-left: auto;
  align-self: flex-end;
  color: #32283e;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
`;

export default PlanCard;
