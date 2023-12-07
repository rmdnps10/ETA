import React, { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import PlanCardList from "../components/PlanCardList";
import {instance} from "../api/axios";
import {gapi} from "gapi-script";
import useNotification from "../utils/useNotifications.tsx";


function Main() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await instance.get("/posts");
            console.log(res.data[2].title);
        };
        fetchData();
    }, []);

    const triggerNotif = useNotification("운영체제 ", {
        body: "1시간 24분 전\n서강대학교 김대건관, 대한민국 서울특별시 마포구 신수동 1-6까지 경로 확인 후 출발하세요.",
    });

    if (triggerNotif) {
        triggerNotif();
    }

    return (
        <>
            <MainHeader/>
            <PlanCardList/>
        </>
    );
}
export default Main;
