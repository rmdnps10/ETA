import React from "react";
import { CheckIcon, ItemLabel, ItemTime, ItemWrapper } from "./PrepareItem";
import flagIcon from "../../assets/images/flag.svg";
function DestinationItem({ destination, time }) {
  return (
    <ItemWrapper>
      <CheckIcon src={flagIcon} />
      <ItemLabel>{destination}</ItemLabel>
      <ItemTime>{time}</ItemTime>
    </ItemWrapper>
  );
}

export default DestinationItem;
