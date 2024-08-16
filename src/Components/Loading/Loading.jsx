import "./loading.css";

import { logoBande } from "./../../assets/images";

export default function Loading() {
  <div className="flex h-full justify-center items-center flex-col gap-5">
    <img className="un" src={logoBande} alt="" />
    <img className="2" src={logoBande} alt="" />
    <img className="trois" src={logoBande} alt="" />
  </div>;
}
