import Navbar from "../components/Navbar";
import AllItems from "../components/AllItems";
import TimePressedItems from "../components/TimePressedItems";
import { useRef, useState } from "react";

function DashboardView() {
  const [deviceList, setDeviceList] = useState(
    JSON.parse(localStorage.getItem("devices")) ?? []
  );
  const [personalList, setPersonalList] = useState(
    JSON.parse(localStorage.getItem("personalList")) ?? []
  );

  const [roomList, setRoomList] = useState(
    JSON.parse(localStorage.getItem("roomList")) ?? []
  );
  const [timePressedDevices, setTimePressedDevices] = useState(
    deviceList &&
      deviceList.filter((item) => {
        let dateDiff = new Date(
          new Date() - new Date(item.lastCareDate)
        ).getMonth();

        if (dateDiff >= item.carePeriod || item.carePeriod - dateDiff <= 2) {
          return item;
        }
      })
  );
  return (
    <>
      <Navbar />
      <div className="app__overview--container view__container">
        <TimePressedItems
          personalList={personalList}
          roomList={roomList}
          deviceList={timePressedDevices}
          limit={3}
        />
        <AllItems
          personalList={personalList}
          roomList={roomList}
          deviceList={deviceList}
          limit={3}
        />
      </div>
    </>
  );
}

export default DashboardView;
