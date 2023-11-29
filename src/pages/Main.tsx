import React, { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import PlanCardList from "../components/PlanCardList";
import { instance } from "../api/axios";
function Main() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/posts");
      console.log(res.data[2].title);
    };
    fetchData();

    fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList")
        .then((response) => {
          console.log(`send response ${response}`)
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });

  }, []);
  return (
    <>
      <MainHeader />
      <PlanCardList />
    </>
  );
}

export default Main;
