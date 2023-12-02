import { atom } from "recoil";

export const home_address = atom({
  key: "home_address",
  default: localStorage.getItem("home_address"),
});
export const home_address_lat = atom({
  key: "home_address_lat",
  default: localStorage.getItem("home_address_lat")
});
export const home_address_lng = atom({
  key: "home_address_lng",
  default: localStorage.getItem("home_address_lng")
});
export const fav_transportation = atom({
  key: "fav_transportation",
  default: localStorage.getItem("fav_transportation")
});
export const ready_time = atom({
  key: "ready_time",
  default: localStorage.getItem("ready_time")
});
