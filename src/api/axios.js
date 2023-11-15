import axios from "axios";
// axios 인스턴스 생성
export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
