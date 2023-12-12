import React, { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import PlanCardList from "../components/PlanCardList";
import {instance} from "../api/axios";
import {gapi} from "gapi-script";
import sample_routes from "../test/sample_routes_req.json";
import axios from "axios";

function insert(calendar_id: String, event_id: String, is_enabled: boolean, address: String, lat: number, lng: number, routes: String) {
    axios
        .post(`//${process.env.REACT_APP_DB_URL}/insert`, {
            event_id: event_id,
            calendar_id: calendar_id,
            is_enabled: is_enabled,
            address: address,
            lat: lat,
            lng: lng,
            routes: routes,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
}

async function select(calendar_id: String, event_id: String) {
    return axios
        .get(
            `//${process.env.REACT_APP_DB_URL}/list?calendar_id=${calendar_id}&event_id=${event_id}`,
            {}
        )
        .then((res) => {
            return res;
        });
}

function makeNotifications(title: string, options: NotificationOptions, link: string) {
    if (!("Notification" in window)) {
        return;
    }
    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    let notification = new Notification(title, options);
                    notification.onclick = function(event) {
                        event.preventDefault(); // prevent the browser from focusing the Notification's tab
                        window.open(link, '_blank');
                    }
                    return notification;
                } else {
                    return;
                }
            });
        } else {
            new Notification(title, options)
                .onclick = function(event) {
                event.preventDefault(); // prevent the browser from focusing the Notification's tab
                window.open(link, '_blank');
            }
        }
    };
    return fireNotif;
}

function Main() {
    // const triggerNotif = useNotification("운영체제 ", {
    //     body: "1시간 24분 전\n서강대학교 김대건관, 대한민국 서울특별시 마포구 신수동 1-6까지 경로 확인 후 출발하세요.",
    //     icon: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDA3IB%2FbtsBCkVq3VA%2F21iqoYsKi4KRkqDFzmGEE1%2Fimg.png"
    // });

    document.title = "ETA by Team ETA";

    if (localStorage.getItem("home_address") === null) {
        const successCallback = async (position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            let geoUrl =
                "https://maps.googleapis.com/maps/api/geocode/json?" +
                "latlng=" + lat + "," + lng + "&region=ko&" +
                `key=${process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY}`;

            const cor_response = await fetch(geoUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            const cor = await cor_response.json();

            console.log(cor);
            if (cor.results.length !== 0) {
                let address = cor.results[0].formatted_address;
                localStorage.setItem("home_address", address);
                localStorage.setItem("home_address_lat", lat);
                localStorage.setItem("home_address_lng", lng);
            }
        };

        const errorCallback = (error) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    if (localStorage.getItem("ready_time") === null) {
        localStorage.setItem("ready_time", "60");
    }

    if (Notification.permission !== "granted") {
        let options =  {
            body: "이렇게 알림을 보낼게요🤓",
            icon: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDA3IB%2FbtsBCkVq3VA%2F21iqoYsKi4KRkqDFzmGEE1%2Fimg.png"
        };

        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification("알림 허용됨", options);
            } else {
                return;
            }
        });
    }

    const timeToString = (minute: number) => {
        let arr = [];
        if (minute / 60 >= 1) arr.push(Math.floor(minute / 60) + "시간");
        if (minute % 60 !== 0) arr.push(minute % 60 + "분");
        return arr.join(" ");
    };

    const date = new Date();
    date.setSeconds(date.getSeconds() + 5);
    // schedule.scheduleJob(date, async () => {
    // schedule.scheduleJob('* 5 0 * * *', async () => {

    let events = [];
    const initGAPI = async () => {
        try {
            new Promise((resolve) => gapi.load("client:auth2", resolve));

            gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID,
            });

            gapi.client.load(
                "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
            );
            const response = await gapi.client.calendar.calendarList.list({});
            const data = response.result.items;

            const updatedCalendarList =
                data?.map((calendar: any) => ({
                    id: calendar.id,
                    title: calendar.summary,
                    color: calendar.backgroundColor,
                })) || [];

            for (const calendar of updatedCalendarList) {
                if (localStorage.getItem(calendar.id) !== "false") {
                    // item false는 불러오지 않음
                    let timeMin = new Date();
                    let timeMax = new Date();

                    timeMin.setDate(timeMin.getDate());
                    timeMin.setHours(0, 0, 0, 0);
                    timeMax.setDate(timeMax.getDate());
                    timeMax.setHours(23, 59, 59, 99);

                    const color_response = await gapi.client.calendar.colors.get({});
                    const event_response = await gapi.client.calendar.events.list({
                        calendarId: calendar.id,
                        timeMax: timeMax.toISOString(),
                        timeMin: timeMin.toISOString(),
                    });

                    const cancelled_data = event_response.result.items.filter(item => item.status === "cancelled").map((event: any) =>
                        event.id.split("_") ? event.id.split("_")[0] : event.id
                    );
                    const event_data = event_response.result.items.filter(item => !cancelled_data.includes(item.id) && item.status !== "cancelled");
                    const color_data = color_response.result;
                    const event_list =
                        event_data?.map((event: any) => ({
                            is_enabled: true,
                            event_id: event.id,
                            calendar_id: calendar.id,
                            title: event.summary,
                            description: event.description,
                            startDate: event.start.dateTime,
                            startTimeZone: event.start.timeZone,
                            endDate: event.end.dateTime,
                            endTimeZone: event.end.dateTime,
                            color: event.colorId !== undefined ? color_data.event[event.colorId].background : "#049be5",
                            eventLocation: event.location,
                            lat: 0.0,
                            lng: 0.0,
                            routes: "",
                        })) || [];

                    for (const event of event_list) {
                        const data = await select(event.calendar_id, event.event_id);
                        let startTime = new Date();
                        let startTimeParse = new Date(event.startDate);
                        startTime.setHours(
                            startTimeParse.getHours(),
                            startTimeParse.getMinutes()
                        );

                        if (data.data.length === 0) {
                            // not on database
                            let geoUrl =
                                "https://maps.googleapis.com/maps/api/geocode/json?" +
                                "address=" +
                                encodeURI(event.eventLocation) +
                                "&region=ko&" +
                                `key=${process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY}`;

                            const cor_response = await fetch(geoUrl, {
                                method: "GET",
                                headers: {
                                    Accept: "application/json",
                                },
                            });

                            const cor = await cor_response.json();

                            if (cor.results.length !== 0) {
                                let coordinate = cor.results[0].geometry.location;
                                event.lat = coordinate.lat;
                                event.lng = coordinate.lng;
                            }

                            /** 아래 내용은 API 제한 때문에 주석처리하고 임의로 raw 데이터로 대신함. 실제 테스트 시 대신 켜세요
                             let routes_response = await axios.post("https://apis.openapi.sk.com/transit/routes", {
                             "startX": localStorage.getItem("home_address_lng"),
                             "startY": localStorage.getItem("home_address_lat"),
                             "endX": event.lng,
                             "endY": event.lat,
                             "count": 1,
                             "lang": 0,
                             "format": "json",
                             }, {
                             headers: {
                             Accept: "application/json",
                             appKey: process.env.REACT_APP_TMAP_API_KEY,
                             'content-type': "application/json"
                             }
                             });

                             let routes_result = JSON.stringify(routes_response.data.metaData);
                             */

                            let routes_result = JSON.stringify(sample_routes);
                            event.routes = routes_result;
                            insert(
                                event.calendar_id,
                                event.event_id,
                                event.is_enabled,
                                event.eventLocation,
                                event.lat,
                                event.lng,
                                event.routes
                            );
                        } else {
                            event.lat = data.data[0].lat;
                            event.lng = data.data[0].lng;
                            event.routes = data.data[0].routes;
                            event.is_enabled = data.data[0].is_enabled;
                        }
                    }

                    events = events.concat(event_list);
                }
            }
            events.sort((v1, v2) => {
                let today = new Date();
                let date1 = new Date(v1.startDate);
                let date2 = new Date(v2.startDate);

                date1.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                date2.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());

                return date1 - date2;
            });


        } catch (err) {
            console.error("App.tsx Error loading GAPI or fetching calendar list", err);
        }
    };

    initGAPI()
        .then((res) => {
            let i = 0;
            for (const event of events) {
                console.log(event);
                const date = new Date();
                const startDate = new Date(event.startDate);
                date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
                console.log(date);
                // schedule.scheduleJob(date, () => {
                //     const parsedData = JSON.parse(event.routes).metaData.plan.itineraries;
                //     const transportTime = Math.round(parsedData[0].totalTime / 60);
                //     const preparedTime = Number(localStorage.getItem("ready_time"));
                //     const totalTime = transportTime + preparedTime;
                //
                //     if (event.is_enabled) {
                //         let notification = makeNotifications(event.title, {
                //             body: `${timeToString(totalTime)} 전 ${event.eventLocation}`,
                //             icon: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDA3IB%2FbtsBCkVq3VA%2F21iqoYsKi4KRkqDFzmGEE1%2Fimg.png"
                //         }, `http://localhost:3000/detail?calendar_id=${event.calendar_id}&event_id=${event.event_id}`);
                //
                //         if (notification) {
                //             notification();
                //         }
                //     }
                // });
                i++;
                const parsedData = JSON.parse(event.routes).metaData.plan.itineraries;
                const transportTime = Math.round(parsedData[0].totalTime / 60);
                const preparedTime = Number(localStorage.getItem("ready_time"));
                const totalTime = transportTime + preparedTime;

                if (event.is_enabled) {
                    let notification = makeNotifications(event.title, {
                        body: `${timeToString(totalTime)} 전 ${event.eventLocation}`,
                        icon: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDA3IB%2FbtsBCkVq3VA%2F21iqoYsKi4KRkqDFzmGEE1%2Fimg.png"
                    }, `http://localhost:3000/detail?calendar_id=${event.calendar_id}&event_id=${event.event_id}`);

                    if (notification) {
                        notification();
                    }
                }
            }
        })
        .catch((err) => {
            console.log(`error occured: ${err}`);
        });
    // });

    return (
        <>
            <MainHeader/>
            <PlanCardList/>
        </>
    );
}
export default Main;
