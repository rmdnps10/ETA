import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components";

function SkeletonDetail() {
  return (
    <SkeletonItem>
      <Skeleton width="50px" />
      <Skeleton width="250px" />
      <Skeleton width="50px" height={"28px"} />
    </SkeletonItem>
  );
}

const SkeletonItem = styled.div`
  display: flex;
  gap: 20px;
`;

export default SkeletonDetail;
