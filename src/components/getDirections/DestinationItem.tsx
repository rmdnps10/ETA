import React from "react";
import dayjs from "dayjs";
import { CheckIcon, ItemLabel, ItemTime, ItemWrapper } from "./PrepareItem";
import flagIcon from "../../assets/images/flag.svg";
function DestinationItem({ destination, startTime, accumulateTime }) {
  console.log(startTime);
  console.log(accumulateTime);
  return (
    <ItemWrapper>
      <CheckIcon src={flagIcon} />
      <ItemLabel>{destination}</ItemLabel>
      <ItemTime>
        {dayjs(startTime).add(accumulateTime, "minute").format("a") === "pm"
          ? "오후 "
          : "오전 "}{" "}
        {dayjs(startTime).add(accumulateTime, "minute").format("hh:mm")}
      </ItemTime>
    </ItemWrapper>
  );
}

export default DestinationItem;
