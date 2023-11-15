import React from "react";
import styled from "styled-components";
import PlanCard from "./PlanCard";

function PlanCardList() {
  return (
    <PlanCardListSection>
      <PlanCard color="pink" />
      <PlanCard color="purple" />
    </PlanCardListSection>
  );
}

const PlanCardListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

export default PlanCardList;
