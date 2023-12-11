import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components";

function SkeletonDetail() {
  return (
    <SkeletonItem>
      <Skeleton width="50px" animation="wave" />
      <Skeleton width="250px" animation="wave" />
      <Skeleton width="50px" height={"28px"} animation="wave" />
    </SkeletonItem>
  );
}

const SkeletonItem = styled.div`
  display: flex;
  gap: 20px;
`;

export default SkeletonDetail;
