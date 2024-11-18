import { useState } from "react";
import AddRoomForm from "../components/AddRoomForm";
import ItemList from "../components/ItemList";
import Navbar from "../components/Navbar";

function AddRoomView() {
  const [itemList, setitemList] = useState(
    JSON.parse(localStorage.getItem("roomList"))
  );
  return (
    <>
      <Navbar />
      <div className="add__room--container view__container">
        <AddRoomForm />
        {/* <ItemList itemList={itemList} /> */}
      </div>
    </>
  );
}

export default AddRoomView;
