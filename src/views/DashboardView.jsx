import Navbar from "../components/Navbar";
import AllItems from "../components/AllItems";
import TimePressedItems from "../components/TimePressedItems";
import { useEffect, useState } from "react";
import ItemPopup from "../components/ItemPopup";

function DashboardView() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [deviceList, setDeviceList] = useState(
    JSON.parse(localStorage.getItem("devices")) ?? []
  );
  const [personalList, setPersonalList] = useState(
    JSON.parse(localStorage.getItem("personalList")) ?? []
  );

  const [roomList, setRoomList] = useState(
    JSON.parse(localStorage.getItem("roomList")) ?? []
  );
  const [timePressedDevices, setTimePressedDevices] = useState([]);

  useEffect(() => {
    // setDeviceList(JSON.parse(localStorage.getItem("devices")) ?? []);
    setTimePressedDevices(
      deviceList &&
        deviceList.filter((item) => {
          let dateDiff = new Date(
            new Date() - new Date(item.lastCareDate)
          ).getMonth();

          if (
            dateDiff == 0 ||
            dateDiff >= item.carePeriod ||
            item.carePeriod - dateDiff <= 2
          ) {
            return item;
          }
        })
    );
    console.log("updated");
  }, [showPopup]);

  const onClickItem = (e) => {
    e.stopPropagation();
    let id = e.target.closest(".item__card--container").dataset.id;
    let item = deviceList.filter((i) => i.id == id)[0];
    console.log(roomList);
    setCurrentItem(item);
    setShowPopup(true);
  };
  const onClosePopup = () => {
    setShowPopup(false);
  };
  const onChangeDeviceList = (newList) => {
    let list = [...newList];
    setDeviceList([...list]);
  };
  return (
    <>
      <Navbar />
      <div className="app__overview--container view__container">
        {showPopup ? (
          <>
            <ItemPopup
              item={currentItem ?? {}}
              personalList={personalList}
              roomList={roomList}
              onClosePopup={onClosePopup}
              deviceList={deviceList}
              setDeviceList={onChangeDeviceList}
            />
          </>
        ) : (
          ""
        )}
        <TimePressedItems
          onClickItem={onClickItem}
          personalList={personalList}
          roomList={roomList}
          deviceList={timePressedDevices}
          limit={3}
        />
        <AllItems
          onClickItem={onClickItem}
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
