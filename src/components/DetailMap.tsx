import React from "react";
import styled from "styled-components";
import map from "../assets/images/map.png";
function DetailMap() {
  return <DetailMapImage src={map}></DetailMapImage>;
}

const DetailMapImage = styled.img`
  width: 100%;
`;
export default DetailMap;
