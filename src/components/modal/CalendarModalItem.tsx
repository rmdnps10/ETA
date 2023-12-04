import React, { useEffect, useState } from "react";
import styled from "styled-components";
export interface CalendarModalItem {
  color: string;
  id: string;
  title: string;
}
export type NullableCalendarModalItem = CalendarModalItem | undefined;

function CalendarModalItem({
  calendarItem,
}: {
  calendarItem: NullableCalendarModalItem;
}) {
  const [state, setState] = useState<boolean>(true);
  const id = calendarItem?.id;
  const toggleState = () => {
    setState(!state);
  };
  useEffect(() => {
    setState(JSON.parse(localStorage.getItem(id)));
  }, [id]);
  useEffect(() => {
    localStorage.setItem(id, state);
  }, [state, id]);
  return (
    <CalendarItem>
      <Circle color={calendarItem?.color} />
      <CalendarName>{calendarItem?.title}</CalendarName>
      <CheckLabel htmlFor={calendarItem?.id}>
        <InputCheck
          id={calendarItem?.id}
          type="checkbox"
          checked={state}
          onClick={toggleState}
        />
      </CheckLabel>
    </CalendarItem>
  );
}

const CalendarItem = styled.div`
  width: 80%;
  display: flex;
  gap: 16px;
  align-items: center;
`;
const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const CheckLabel = styled.label`
  margin-left: auto;
`;
export const InputCheck = styled.input`
  appearance: none;
  cursor: pointer;
  position: relative;
  display: flex;
  width: 52px;
  height: 32px;
  padding: 2px 4px;
  align-items: center;
  border-radius: 100px;
  background-color: white;

  &::before {
    content: "";
    position: absolute;
    left: 5px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #dadada;
    transition: left 250ms linear;
  }
  &:checked {
    background-color: #00608a;
  }

  &:checked::before {
    content: "";
    position: absolute;
    left: 24px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: white;
  }
`;
const CalendarName = styled.div``;

export default CalendarModalItem;
