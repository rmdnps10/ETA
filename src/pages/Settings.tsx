import React, { useEffect } from "react";
import { instance } from "../api/axios";
import { gapi } from "gapi-script";
import SettingHeader from "components/SettingHeader";
import SettingList from "components/SettingList";

function Settings() {
  useEffect(() => {}, []);

  return (
    <>
      <SettingHeader />
      <SettingList />
    </>
  );
}

export default Settings;
