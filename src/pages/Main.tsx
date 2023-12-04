import React, { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import PlanCardList from "../components/PlanCardList";
import { instance } from "../api/axios";
import { gapi } from "gapi-script";

function Main() {
  return (
    <>
      <MainHeader />
      <PlanCardList />
    </>
  );
}
export default Main;
