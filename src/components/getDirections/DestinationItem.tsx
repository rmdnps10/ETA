import React from "react";
import dayjs from "dayjs";
import { CheckIcon, ItemLabel, ItemTime, ItemWrapper } from "./PrepareItem";
import flagIcon from "../../assets/images/flag.svg";
import { Skeleton } from "@mui/material";
function DestinationItem({ destination, startTime, accumulateTime }) {
  return (
    <ItemWrapper>
      <CheckIcon src={flagIcon} />
      <ItemLabel>{destination}</ItemLabel>
      <ItemTime>
        {dayjs(startTime).add(accumulateTime, "minute").format("a") === "pm"
          ? "오후 "
          : "오전 "}{" "}
        {dayjs(startTime).add(accumulateTime, "minute").format("h:mm")}
      </ItemTime>
    </ItemWrapper>
  );
}

export default DestinationItem;
