import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
// 라우팅은 여기에
function useNotifications(title: string, options: NotificationOptions) {
    if (!("Notification" in window)) {
        return;
    }
    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(title, options);
                } else {
                    return;
                }
            });
        } else {
            new Notification(title, options);
        }
    };
    return fireNotif;

}

export default useNotifications;
