import { atom } from "recoil";

export const 집주소 = atom({
  key: "집주소",
  default: "서울특별시 마포구 신수동 1-1 하비에르관",
});
export const 선호대중교통 = atom({ key: "선호대중교통", default: "지하철" });
export const 외출준비시간 = atom({ key: "외출준비시간", default: 50 });
