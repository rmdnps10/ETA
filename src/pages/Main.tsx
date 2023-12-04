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

    const triggerNotif = useNotification("Hello, React hooks!", {
        body: "Nice React!",
    });

    return (
        <>
            <button
                onClick={triggerNotif} />
            <MainHeader/>
            <PlanCardList/>
        </>
    );
}
export default Main;
