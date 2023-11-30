import React, {useEffect} from "react";
import MainHeader from "../components/MainHeader";
import PlanCardList from "../components/PlanCardList";
import {instance} from "../api/axios";
import {gapi} from "gapi-script";

function Main() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await instance.get("/posts");
            console.log(res.data[2].title);
        };
        fetchData();


    }, []);
    return (
        <>
            <MainHeader/>
            <PlanCardList/>
        </>
    );
}

export default Main;
